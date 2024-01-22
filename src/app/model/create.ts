export interface Create {
    title: string;
    chapo: string;
    content: string;
    createdAt?: string; // La date sera récupérée automatiquement côté serveur
    updatedAt?: string; // La date sera mise à jour automatiquement côté serveur
    categorie: string;  // URL vers la catégorie, ajustez selon votre modèle
    user: string;       // URL vers l'utilisateur, ajustez selon votre modèle
  }