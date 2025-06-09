import Prompt from '@/models/api/prompt-api';
import { connectToDatabase } from '@/utils/database';

type ParamsType = {
  id: string;
};

export const GET = async (_request: Request, { params }: { params: ParamsType }) => {
  try {
    await connectToDatabase();

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const promt = await Prompt.findById(params.id);
    if (!promt) {
      return new Response('Prompt not found', {
        status: 404
      });
    }

    return new Response(JSON.stringify(promt), {
      status: 200
    });
  } catch (error) {
    return new Response(`Failed to fetch prompt: ${error}`, {
      status: 500
    });
  }
};

export const POST = async (request: Request, { params }: { params: ParamsType }) => {
  const { promptText, tag } = await request.json();
  try {
    await connectToDatabase();

    const promt = await Prompt.findById(params.id);
    if (!promt) {
      return new Response('Prompt not found', {
        status: 404
      });
    }

    promt.promptText = promptText;
    promt.tag = tag;

    console.log('Updating prompt:', promt, promptText, tag);

    await promt.save();

    return new Response(JSON.stringify(promt), {
      status: 200
    });
  } catch (error) {
    return new Response(`Failed to update prompt: ${error}`, {
      status: 500
    });
  }
};

export const DELETE = async (_request: Request, { params }: { params: ParamsType }) => {
  try {
    await connectToDatabase();

    const promt = await Prompt.findByIdAndDelete(params.id);

    return new Response(JSON.stringify(promt), {
      status: 200
    });
  } catch (error) {
    return new Response(`Failed to delete prompt: ${error}`, {
      status: 500
    });
  }
};
