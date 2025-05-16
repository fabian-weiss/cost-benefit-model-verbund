/* eslint-disable @typescript-eslint/no-explicit-any */
import { StructuredInputs } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const { projectDescription } = await req.json();

    if (!projectDescription || typeof projectDescription !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid projectDescription" },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are an AI assistant for evaluating the non-monetary impacts of proposed projects using a structured cost-benefit analysis model. Your task is to generate realistic predictions for schema-defined fields such as \`healthAndSafety\`, \`pollution\`, \`communityImplications\`, \`wasteProduction\`, and \`unSustainableGoals\`.

You must not predict financial values. Your output must strictly follow the provided Zod schema.

All predicted values must use the following fixed scale:
- \`-2\`: very negative impact
- \`-1\`: moderately negative impact
- \`0\`: neutral impact or total uncertainty
- \`1\`: moderately positive impact
- \`2\`: very positive impact

A score of \`0\` must only be used when the information is genuinely neutral, unknown, or completely ambiguous. If an outcome has a concrete negative effect and only a speculative or general positive one, assign a negative score. Do not average out trade-offs—lean toward the most probable or impactful direction.

Your reasoning must be grounded in **causal chains**:
- For each field, determine how input variables affect short- and long-term outcomes.
- Account for second- and third-order effects, feedback loops, and system-level risks.
- Consider uncertainty, stakeholder pushback, regulatory volatility, and future adoption challenges.

**Adopt a defensive, risk-aware stance**:
- Project descriptions are often incomplete and biased toward positive framing.
- If a project description lacks detail about societal, environmental, or stakeholder impacts, assume risks may be intentionally omitted or overlooked. Reflect that uncertainty in your predictions.
- When cost overruns are mentioned without clear benefit justification, infer political, societal, or institutional risk—even if not explicitly stated.
- Unless a benefit is both **clear** and **causally justified**, do not assign a positive score.

Only assign \`1\` or \`2\` if:
- The causal path to a benefit is well defined,
- The benefit is measurable, and
- There are no major unacknowledged trade-offs.

Projects that describe only general goals (e.g., “grid stability”, “green transition”) without explaining **how** these will be achieved and **who is affected**, should be considered **incomplete**. Default to conservative or negative estimates unless benefits are specific and backed by context.

When evaluating mixed or uncertain impacts, prioritize near-term or well-supported negative effects over long-term or vague positive projections. A burden or harm (e.g., affordability risk, health compromise) must be reflected in the score.

In the \`comment\` field:
- Briefly explain your reasoning using causal logic.
- Identify the most influential project variables.
- Clearly state any assumptions or uncertainties.
- Avoid vague, promotional, or overly optimistic language.
- State how the project could be improved to increase positive impacts on the variable.

Tone: professional, analytical, and risk-conscious. You are not validating the project—you are protecting stakeholders from poorly understood or unjustified risks. You are not a marketing tool and should not be sycophantic.

Output must remain within the schema structure only.
`;

    const response = await openai.responses.parse({
      model: "gpt-4o-2024-08-06", // Or "gpt-3.5-turbo", but GPT-4 models are better at JSON mode
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content: projectDescription },
      ],
      text: {
        format: zodTextFormat(StructuredInputs, "cost_benefit"), // Use zodTextFormat to format the schema
      }, // Enable JSON mode
      //temperature: 0.2, // Lower temperature for more deterministic JSON output
    });

    console.log("Received response from OpenAI.");
    if (
      response.status === "incomplete" &&
      response.incomplete_details?.reason === "max_output_tokens"
    ) {
      // Handle the case where the model did not return a complete response
      throw new Error("Incomplete response");
    }

    const data = response.output_parsed;

    if (!data) {
      throw new Error("No response content");
    }

    console.log("Zod validation successful.");
    return NextResponse.json(data); // Return the validated data
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}
// export async function POST(req: NextRequest) {
//   try {
//     const { projectDescription } = await req.json();

//     if (!projectDescription || typeof projectDescription !== "string") {
//       return NextResponse.json(
//         { error: "Missing or invalid projectDescription" },
//         { status: 400 }
//       );
//     }

//     const systemPrompt = `
// You are a structured reasoning assistant.
// Return a valid JSON object that matches this cost-benefit schema exactly:

// {
//   "societal": {
//     "customerSatisfaction": { "value": -2 to 2, "impact": string, "comment": string },
//     "customerAffordability": { ... },
//     "companyCulture": { ... },
//     "communityImplications": { ... },
//     "knowledgeSharingAcrossTheSupplyChain": { ... },
//     "shareholderValue": { ... },
//     "guidingPrinciplesAlignment": { ... },
//     "publicPerception": { ... },
//     "workplaceCreation": { ... },
//     "healthAndSafety": { ... }
//   },
//   "environmental": {
//     "unSustainableGoals": { ... },
//     "wasteProduction": { ... },
//     "biodiversity": { ... },
//     "pollution": { ... },
//     "sustainableEneryIntegration": { ... },
//     "energyEfficiency": { ... },
//     "meetingEnvironmentalRegulations": { ... }
//   },
//   "rio": {
//     "privacy": { ... },
//     "marketAdvantage": { ... },
//     "longTermResilience": { ... },
//     "longTermScalability": { ... },
//     "legalRequirements": { ... },
//     "innovation": { ... },
//     "otherRisks": { ... }
//   }
// }

// Field rules:
// - value: must be one of -2, -1, 0, 1, or 2 (no decimals)
// - impact: must match the value exactly:
//   -2 = "Very Negative"
//   -1 = "Negative"
//    0 = "Neutral"
//    1 = "Positive"
//    2 = "Very Positive"
// - comment: must be a short sentence with **no commas**
// - Include all fields as shown, with no changes, no omissions, and no additions.
// - Return only a JSON object. No explanation, no markdown, no code block.
// `;

//     const response = await openai.chat.completions.create({
//       model: "gpt-4-turbo", // Or "gpt-3.5-turbo", but GPT-4 models are better at JSON mode
//       messages: [
//         { role: "system", content: systemPrompt },
//         { role: "user", content: projectDescription },
//       ],
//       response_format: { type: "json_object" }, // Enable JSON mode
//       temperature: 0.2, // Lower temperature for more deterministic JSON output
//     });

//     console.log("Received response from OpenAI.");
//     const content = response.choices[0]?.message?.content;

//     if (!content) {
//       throw new Error("OpenAI returned an empty response content.");
//     }

//     // --- Parsing and Validation ---
//     let jsonData;
//     try {
//       jsonData = JSON.parse(content);
//       console.log(
//         `Successfully parsed JSON from OpenAI which is ${JSON.stringify(
//           jsonData
//         )}.`
//       );
//     } catch (parseError) {
//       console.error("Failed to parse JSON from OpenAI:", parseError);
//       console.error("Raw OpenAI content:", content); // Log raw content for debugging
//       throw new Error(
//         `OpenAI returned invalid JSON: ${(parseError as Error).message}`
//       );
//     }

//     // Use safeParse to avoid throwing an error and get detailed validation issues
//     const validationResult = StructuredInputs.safeParse(jsonData);

//     if (!validationResult.success) {
//       console.error("Zod validation failed:", validationResult.error.errors);
//       // Log the data that failed validation
//       console.error("Data failing validation:", jsonData);
//       // Provide more specific error feedback
//       const errorDetails = validationResult.error.errors
//         .map((e) => `${e.path.join(".")} (${e.code}): ${e.message}`)
//         .join(", ");
//       throw new Error(
//         `OpenAI response failed schema validation: ${errorDetails}`
//       );
//     }

//     console.log("Zod validation successful.");
//     return NextResponse.json(validationResult.data); // Return the validated data
//   } catch (error: any) {
//     console.error(error);
//     return NextResponse.json(
//       { error: error.message ?? "Unexpected error" },
//       { status: 500 }
//     );
//   }
// }
