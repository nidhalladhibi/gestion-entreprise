import Facture from "../models/factureModel.js";

export const getFactures = async (req, res) => {
  try {
    const factures = await Facture.find().populate("clientId");
    res.json(factures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFacture = async (req, res) => {
  try {
    const facture = await Facture.create(req.body);
    await facture.populate("clientId");
    res.status(201).json(facture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFacture = async (req, res) => {
  try {
    const facture = await Facture.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("clientId");
    if (!facture) {
      return res.status(404).json({ message: "Facture non trouvée" });
    }
    res.json(facture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFacture = async (req, res) => {
  try {
    const facture = await Facture.findByIdAndDelete(req.params.id);
    if (!facture) {
      return res.status(404).json({ message: "Facture non trouvée" });
    }
    res.json({ message: "Facture supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






