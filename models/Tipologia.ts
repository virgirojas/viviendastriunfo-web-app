import mongoose, { Schema, model, models } from 'mongoose';

export interface ITipologia {
  name: string;
  squareMeters: string;
  bedrooms: string;
  price: string;
  image: string;
  description: string;
  features: string;
  category: string;
  isFeatured?: boolean;
}

const TipologiaSchema = new Schema<ITipologia>({
  name: { type: String, required: true },
  squareMeters: { type: String, required: true },
  bedrooms: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  features: { type: String, required: false },
  category: { type: String, required: true },
  isFeatured: { type: Boolean, default: false },
}, {
  timestamps: true
});

// We check models.Tipologia to prevent redefining the model on hot-reloading
const Tipologia = models.Tipologia || model<ITipologia>('Tipologia', TipologiaSchema);

export default Tipologia;
