import { Schema, model, models } from 'mongoose';

interface IPromptSchema extends Document {
  creator: Schema.Types.ObjectId;
  promptText: string;
  tag: string;
}

const PromptSchema: Schema<IPromptSchema> = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Creator is required']
  },
  promptText: {
    type: String,
    required: [true, 'Prompt text is required']
  },
  tag: {
    type: String,
    required: [true, 'Tag is required']
  }
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

// let Prompt;

// if (models?.Prompt) {
//   Prompt = models.Prompt;
// } else {
//   Prompt = model('Prompt', PromptSchema);
// }

export default Prompt;
