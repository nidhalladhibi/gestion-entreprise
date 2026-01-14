import mongoose from "mongoose";

const factureSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    numero: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    },
    montantHT: {
      type: Number,
      required: true,
    },
    montantTTC: {
      type: Number,
      required: true,
    },
    tva: {
      type: Number,
      default: 20,
    },
    statut: {
      type: String,
      enum: ["brouillon", "envoyée", "payée", "annulée"],
      default: "brouillon",
    },
    produits: [
      {
        nom: String,
        quantite: Number,
        prixUnitaire: Number,
        total: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Facture = mongoose.model("Facture", factureSchema);

export default Facture;







