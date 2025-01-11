import { NextRequest, NextResponse } from 'next/server';
import { hf } from '@/utils/inference';

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();

    const image = await hf.textToImage({
      inputs: input,
      model: 'stabilityai/stable-diffusion-2',
      parameters: {
        negative_prompt: 'blurry',
      },
    });

    return new Response(image);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
