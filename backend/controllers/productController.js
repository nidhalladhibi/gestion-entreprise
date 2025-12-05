import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Récupérer tous les produits
// @route   GET /api/products
// @access  Privé
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur du serveur" });
  }
};

// @desc    Récupérer un produit par ID
// @route   GET /api/products/:id
// @access  Privé
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    if (product.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Non autorisé');
    }
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Produit non trouvé');
  }
});

// @desc    Créer un produit
// @route   POST /api/products
// @access  Privé
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const product = new Product({
      name,
      description,
      price,
      stock,
      user: req.user.id,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: "Données invalides" });
  }
};

// @desc    Mettre à jour un produit
// @route   PUT /api/products/:id
// @access  Privé
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Produit non trouvé');
  }

  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Action non autorisée');
  }

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json(updatedProduct);
});

// @desc    Supprimer un produit
// @route   DELETE /api/products/:id
// @access  Privé
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Produit non trouvé');
  }

  // Vérifier que le produit appartient bien à l'utilisateur
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Action non autorisée');
  }

  await product.deleteOne();

  res.status(200).json({ id: req.params.id, message: "Produit supprimé avec succès" });
});