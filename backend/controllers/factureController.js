import asyncHandler from 'express-async-handler';
import Facture from '../models/factureModel.js';

// @desc    Récupérer toutes les factures de l'utilisateur
// @route   GET /api/factures
// @access  Privé
export const getFactures = asyncHandler(async (req, res) => {
  const factures = await Facture.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(factures);
});

// @desc    Créer une nouvelle facture
// @route   POST /api/factures
// @access  Privé
export const createFacture = asyncHandler(async (req, res) => {
  const { client, items, total } = req.body;

  if (!client || !items || items.length === 0) {
    res.status(400);
    throw new Error('Veuillez fournir un client et au moins un article.');
  }

  const facture = new Facture({
    user: req.user.id,
    client,
    items,
    total,
  });

  const createdFacture = await facture.save();
  res.status(201).json(createdFacture);
});

// @desc    Mettre à jour une facture (placeholder)
// @route   PUT /api/factures/:id
// @access  Privé
export const updateFacture = asyncHandler(async (req, res) => {
  res.status(501).json({ message: 'La mise à jour de facture n\'est pas encore implémentée.' });
});

// @desc    Supprimer une facture (placeholder)
// @route   DELETE /api/factures/:id
// @access  Privé
export const deleteFacture = asyncHandler(async (req, res) => {
  res.status(501).json({ message: 'La suppression de facture n\'est pas encore implémentée.' });
});