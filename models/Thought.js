const { Schema, model, Types } = require('mongoose');
const { reactionSchema } = require('./Reaction');

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
    },
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
