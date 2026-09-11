import mongoose, { trusted } from "mongoose";


const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
 user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Must match the model name you registered in mongoose.model('User', userSchema)
    required: true
 },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Note', NoteSchema);