Gestion d’Entreprise — Dashboard App

Application web de gestion d’entreprise développée avec React permettant de gérer les clients, produits et factures avec génération PDF.

Cette application est conçue comme un dashboard moderne pour petites entreprises afin de simplifier la gestion quotidienne.

Aperçu du projet

Cette application permet de :

gérer les clients

gérer les produits

créer des factures

générer des factures PDF

suivre les données dans un tableau de bord

gérer l’authentification utilisateur

Architecture basée sur une Single Page Application (SPA) pour une expérience fluide.

Stack technique
Frontend

React (Functional Components)

React Router

Context API

Hooks React

html2canvas

jsPDF

Backend

Node.js

Express

MongoDB

JWT Authentication

Architecture de l’application
1. Framework & Architecture

Application construite avec React Functional Components

Architecture SPA

Organisation modulaire des pages dashboard

2. Gestion d’état
React Hooks

Utilisation des hooks principaux :

useState → gestion de l’état local

useEffect → chargement des données

useContext → accès aux données globales

useRef → génération PDF facture

Context API

Deux contextes principaux :

AuthContext

gestion de l’utilisateur connecté

login / logout

stockage du token

DataContext

clients

produits

fonctions CRUD

chargement global des données

3. Navigation

Utilisation de React Router :

Link → navigation interne

useNavigate → redirection après login

Dashboard routes
