import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String, required: true }
}, { timestamps: true });

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  text: { type: String, required: function() { return !this.image; } }, // conditional validation [cite: 17]
  image: { type: String, required: function() { return !this.text; } }, // image can be a URL string [cite: 15, 17]
  likes: [{ type: String }], // Array of usernames who liked the post [cite: 23]
  comments: [CommentSchema]  // Embedded array of comments 
}, { timestamps: true });

export default mongoose.model('Post', PostSchema);