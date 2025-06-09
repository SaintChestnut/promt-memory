import Prompt from '@/models/api/prompt-api';
import { connectToDatabase } from '@/utils/database';

type ParamsType = {
  id: string;
};

export const GET = async (_request: Request, { params }: { params: ParamsType }) => {
  try {
    await connectToDatabase();

    await new Promise((resolve) => setTimeout(resolve, 2000));
    const promts = await Prompt.find({
      creator: params.id
    }).populate('creator');

    return new Response(JSON.stringify(promts), {
      status: 200
    });
  } catch (error) {
    return new Response(`Failed to fetch prompts: ${error}`, {
      status: 500
    });
  }
};
