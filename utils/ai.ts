import { OpenAI } from '@langchain/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { PromptTemplate } from '@langchain/core/prompts'
import z from 'zod'
import { Analysis } from '@prisma/client'

const analysisSchema = z.object({
  mood: z
    .string()
    .describe('The mood of the person who wrote the journal entry.'),
  summary: z.string().describe('A quick summary of the entire journal entry.'),
  subject: z.string().describe('the subject of the journal entry.'),
  negative: z
    .boolean()
    .describe('Is this entry negative? Does it contain negative emotions?'),
  color: z
    .string()
    .describe(
      'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'
    ),
})

const parser = StructuredOutputParser.fromZodSchema(analysisSchema)

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()
  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })
  const input = await prompt.format({
    entry: content,
  })
  return input
}

type AnalysisWithoutAutoFields = Omit<
  Analysis,
  'id' | 'createdAt' | 'updatedAt' | 'entryId'
>

// conditional typing depending whether there is an error

export const analyse = async (content: string) => {
  const prompt = await getPrompt(content)
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-4o-mini' })
  const result = await model.invoke(prompt)

  try {
    return (await parser.parse(result)) as AnalysisWithoutAutoFields
  } catch (e) {
    console.log(e)
  }
}
