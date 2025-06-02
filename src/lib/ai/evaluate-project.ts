import { StructuredInputsType } from "@/types/structured-inputs-type";
import { generateObject } from "ai";
import { StructuredInputs } from "../schemas";
import { openai } from "@ai-sdk/openai";
import "dotenv/config";
import { deepseek } from "@ai-sdk/deepseek";
import { anthropic } from "@ai-sdk/anthropic";
import { AiModelType } from "@/enums/AiModelType";

export const evaluateProject = async (
  projectDescription: string,
  model?: AiModelType
): Promise<StructuredInputsType> => {
  try {
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
- Briefly explain your reasoning using causal logic (2 sentences min).
- Identify the most influential project variables.
- Clearly state any assumptions or uncertainties.
- Avoid vague, promotional, or overly optimistic language.
- State how the project could be improved to increase positive impacts on the variable.

Tone: professional, analytical, and risk-conscious. You are not validating the project—you are protecting stakeholders from poorly understood or unjustified risks. You are not a marketing tool and should not be sycophantic.

Output must remain within the schema structure only.

The project description is as follows:
        ${projectDescription}
`;

    let focusPrompt: string | undefined;

    if (model === AiModelType.Deepseek) {
      const res = await generateObject({
        model: deepseek("deepseek-reasoner"),
        schema: StructuredInputs,
        prompt: systemPrompt,
        temperature: 0.0,
      });
      return res.object;
    }
    // if (model === AiModelType.Deepseek) {
    //   const { text: rawOutput } = await generateText({
    //     model: deepseek("deepseek-reasoner"),
    //     prompt: systemPrompt,
    //   });
    //   focusPrompt =
    //     `Extract the desired information from this text: \n` +
    //     rawOutput +
    //     `\n\n Then evaluate the project based on this prompt: \n ${systemPrompt}`;
    // }
    if (model === AiModelType.Claude) {
      const res = await generateObject({
        model: anthropic("claude-4-sonnet-20250514"),
        schema: StructuredInputs,
        prompt: systemPrompt,
        temperature: 0.0,
      });
      return res.object;
    }
    // else if (model === AiModelType.Gemini) {
    //   const res = await generateObject({
    //     model: google("gemini-1.5-pro-latest"),
    //     schema: StructuredInputs,
    //     prompt: systemPrompt,
    //     temperature: 0.0,
    //   });
    //   return res.object;
    // }

    const res = await generateObject({
      model: openai.responses("gpt-4o-2024-08-06"),
      schema: StructuredInputs,
      prompt: focusPrompt ?? systemPrompt,
      temperature: 0.0,
    });

    return res.object;
  } catch (err) {
    console.error("Error evaluating project:", err);
    throw new Error("Failed to evaluate project");
  }
};
