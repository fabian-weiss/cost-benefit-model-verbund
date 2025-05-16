// import OpenAI from "openai";
// import { zodToJsonSchema } from "zod-to-json-schema";

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// const systemPrompt: string = `
// You are an assistant that translates project descriptions into structured cost-benefit assessments.
// Respond ONLY with a valid JSON object matching this structure:

// {
//   "societal": {
//     "customerSatisfaction": { "value": number, "impact": enum, "comment": string },
//     ...
//   },
//   "environmental": {
//     "wasteProduction": { ... },
//     ...
//   },
//   "rio": {
//     "privacy": { ... },
//     ...
//   }
// }

// - Do not nest environmental or RIO factors inside societal
// - All 3 categories (societal, environmental, rio) must be top-level keys
// - Do not invent your own structure
// - Use exact casing for 'impact': "Very Negative", "Negative", "Neutral", "Positive", "Very Positive"
// - All values must be numbers between -2 and 2 the value maps to the impact
// - Always return all fields (no omissions)
// `;

// export async function generateStructuredInputs(description: string) {
//   const parameters = zodToJsonSchema(structuredInputSchema, "StructuredInputs");

//   const response = await openai.chat.completions.create({
//     model: "gpt-4-turbo",
//     messages: [
//       {
//         role: "system",
//         content: systemPrompt,
//       },
//       {
//         role: "user",
//         content: `Project description:\n${description}`,
//       },
//     ],
//     tools: [
//       {
//         type: "function",
//         function: {
//           name: "generate_inputs",
//           description:
//             "Generate default environmental, societal, and RIO inputs",
//           parameters,
//         },
//       },
//     ],
//     tool_choice: { type: "function", function: { name: "generate_inputs" } },
//   });

//   const toolCall = response.choices[0]?.message.tool_calls?.[0];
//   if (!toolCall) throw new Error("No tool call in OpenAI response");

//   const args = JSON.parse(toolCall.function.arguments);
//   const parsed = structuredInputSchema.safeParse(args);

//   if (!parsed.success) {
//     console.error(parsed.error.format());
//     throw new Error("Validation failed for structured input");
//   }

//   return parsed.data;
// }
