import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Veuillez ajouter un nom de produit'],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, 'Veuillez ajouter un prix'],
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);