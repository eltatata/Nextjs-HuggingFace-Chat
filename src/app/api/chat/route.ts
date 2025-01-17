import { NextRequest } from 'next/server';
import { HuggingFaceStream, StreamingTextResponse } from 'ai';
import { experimental_buildOpenAssistantPrompt } from 'ai/prompts';
import { hf } from '@/utils/inference';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const response = hf.textGenerationStream({
    model: 'meta-llama/Meta-Llama-3-8B-Instruct',
    inputs: experimental_buildOpenAssistantPrompt(messages),
    parameters: {
      max_new_tokens: 500,
      typical_p: 0.2,
      repetition_penalty: 1,
      truncate: 1000,
      return_full_text: false,
      temperature: 0.1,
    },
  });

  const stream = HuggingFaceStream(response);

  return new StreamingTextResponse(stream);
}
