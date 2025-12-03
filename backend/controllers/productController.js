import Product from '../models/productModel.js';

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

// @desc    Créer un produit
// @route   POST /api/products
// @access  Privé
export const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = new Product({
      name,
      description,
      price,
      user: req.user.id,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: "Données invalides" });
  }
};

// @desc    Supprimer un produit
// @route   DELETE /api/products/:id
// @access  Privé
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    res.json({ message: 'Produit supprimé' });
  } else {
    res.status(404).json({ message: 'Produit non trouvé' });
  }
};