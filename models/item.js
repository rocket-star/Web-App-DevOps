const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    imageUrl: {
        type: String,
        required: true
      },
    price: {
      type: Number,
      required: true,
    },
    description: {
        type: String,
        required: true,
    },
  },
);

module.exports = mongoose.model('Item', itemSchema);
