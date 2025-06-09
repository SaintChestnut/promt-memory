import Prompt from '@/models/api/prompt-api';
import { connectToDatabase } from '@/utils/database';

export const POST = async (req: Request) => {
  const { userId, promptText, tag } = await req.json();

  //     const body = await req.json();
  //   const { userId, promtText, tag } = body;
  // console.log('Received data:', body);

  try {
    await connectToDatabase();
    const newPrompt = new Prompt({
      creator: userId,
      promptText,
      tag
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.error('Error creating new prompt:', error);
    return new Response('Failed to create a new prompt', {
      status: 500
    });
  }
};
