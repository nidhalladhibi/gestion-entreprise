import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'; // Assurez-vous que le chemin vers votre modèle User est correct.

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // On vérifie si le token est dans les en-têtes et s'il commence par "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 1. Extraire le token de l'en-tête "Authorization"
      token = req.headers.authorization.split(' ')[1];

      // 2. Vérifier et décoder le token
      //    Cela requiert votre clé secrète JWT que vous devriez stocker dans un fichier .env
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Récupérer l'utilisateur depuis la base de données grâce à l'ID du token
      //    On exclut le mot de passe du résultat pour des raisons de sécurité.
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Non autorisé, utilisateur non trouvé');
      }

      // 4. Passer au prochain middleware ou à la route
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Non autorisé, le token a échoué');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Non autorisé, pas de token');
  }
});
