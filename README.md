. Architecture & Framework
React (Composants Fonctionnels) : Le projet est entièrement construit avec React en utilisant des composants fonctionnels (ex: function Login(), function Invoice()) plutôt que des classes. C'est l'approche moderne standard.
Single Page Application (SPA) : L'application charge une seule page HTML et met à jour le contenu dynamiquement sans rechargement complet, offrant une expérience utilisateur fluide.
2. Gestion d'État (State Management)
Hooks React :
useState : Utilisé partout pour gérer l'état local (ex: champs de formulaires, erreurs, chargement, listes de produits).
useEffect : Utilisé pour gérer les effets de bord, comme le chargement initial des données depuis l'API lorsque l'utilisateur se connecte (voir DataContext.jsx).
useRef : Utilisé dans Invoice.jsx pour cibler directement l'élément DOM de la facture afin de le convertir en image pour le PDF.
Context API :
DataContext : Une technique puissante pour partager des données globales (clients, produits) à travers toute l'application sans avoir à passer les propriétés (props) manuellement à chaque niveau.
AuthContext (via useAuth) : Gère l'état de connexion de l'utilisateur de manière globale.
3. Navigation & Routage
React Router (react-router-dom) :
useNavigate : Permet de rediriger l'utilisateur par programmation (ex: redirection vers le tableau de bord après une connexion réussie).
Link : Crée des liens de navigation internes qui ne rechargent pas la page.
4. Interaction Backend & Asynchronisme
Async/Await : Le code utilise la syntaxe moderne async/await pour gérer les promesses de manière lisible (appels API).
Service API Centralisé : L'import import apiCall from '../services/api' suggère l'utilisation d'une instance configurée (probablement Axios) pour gérer les requêtes HTTP, les en-têtes (tokens) et les erreurs de manière centralisée.
Chargement Parallèle (Promise.all) : Dans DataContext.jsx, Promise.all est utilisé pour charger les clients et les produits simultanément, ce qui optimise le temps de chargement initial.
5. Fonctionnalités Avancées
Génération de PDF :
html2canvas : Capture le rendu visuel de la facture (DOM HTML) et le transforme en image (Canvas).
jsPDF : Prend cette image et génère un fichier PDF téléchargeable. C'est une technique courante pour exporter des documents complexes sans avoir à les redessiner côté serveur.
Calculs Dynamiques : La facture (Invoice.jsx) et le tableau de bord (Home.jsx) effectuent des calculs en temps réel (totaux, sommes des stocks) basés sur les données du contexte.
6. Design & Styling
Inline Styles (CSS-in-JS) : Le projet utilise des objets JavaScript pour définir les styles (ex: const styles = { ... }).
Avantages : Pas de conflits de noms de classes CSS, styles encapsulés dans le composant.
Technique : Utilisation de Flexbox (display: 'flex') et Grid (display: 'grid') pour la mise en page responsive.
7. Gestion des Formulaires & Sécurité
Composants Contrôlés : Les champs de saisie (input) sont liés à l'état React (value={form.email}), ce qui permet une validation et une manipulation immédiates.
Validation Côté Client :
Vérification des champs vides (trim()).
Expressions régulières (Regex) pour valider le format des emails.
Comparaison des mots de passe (dans Register.jsx).
Feedback Utilisateur : Gestion des états de chargement (loading) pour désactiver les boutons pendant les requêtes et affichage des messages d'erreur conditionnels.
En résumé, c'est une application React moderne, bien structurée autour des Hooks et du Context API, avec une gestion propre des interactions asynchrones et des fonctionnalités métier spécifiques comme la facturation PDF.
