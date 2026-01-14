import asyncHandler from 'express-async-handler';
import Client from '../models/clientModel.js';

export const getClients = async (req, res) => {
  try {
    // On s'assure de ne récupérer que les clients de l'utilisateur connecté
    const clients = await Client.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Récupérer un client par son ID
 * @route   GET /api/clients/:id
 * @access  Privé
 */
export const getClientById = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (client) {
    // Vérifier que le client appartient bien à l'utilisateur qui fait la demande
    if (client.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Non autorisé');
    }
    res.json(client);
  } else {
    res.status(404);
    throw new Error('Client non trouvé');
  }
});

export const createClient = asyncHandler(async (req, res) => {
  const { name, email, phone, address, credit } = req.body;

  if (!name || !email) {
    res.status(400);
    throw new Error('Les champs nom et email sont obligatoires.');
  }

  const client = await Client.create({
    user: req.user.id, // L'ID de l'utilisateur vient du token JWT décodé
    name,
    email,
    phone,
    address,
    credit,
  });

  res.status(201).json(client);
});

export const updateClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (!client) {
    res.status(404);
    throw new Error('Client non trouvé');
  }

  // Vérifier que le client appartient bien à l'utilisateur
  if (client.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Action non autorisée');
  }

  const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // pour retourner le document mis à jour
    runValidators: true, // pour s'assurer que les nouvelles données respectent le schéma
  });

  res.json(updatedClient);
});

export const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (!client) {
    res.status(404);
    throw new Error('Client non trouvé');
  }

  // Vérifier que le client appartient bien à l'utilisateur
  if (client.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Action non autorisée');
  }

  await client.deleteOne();

  res.status(200).json({ id: req.params.id, message: "Client supprimé avec succès" });
});

