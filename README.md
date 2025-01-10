# 📋 Modern Drag and Drop Kanban Board

Une application de gestion de tâches moderne et intuitive inspirée de Jira, construite avec React et TypeScript. Cette application offre une expérience utilisateur fluide avec des fonctionnalités de drag-and-drop et une interface élégante.

![Kanban Board Preview](https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=1000)

## ✨ Fonctionnalités

### 🎯 Gestion des Tâches
- **Drag-and-Drop Intuitif**: Déplacez facilement les tâches entre les colonnes
- **Colonnes Dynamiques**: 
  - À faire
  - En cours
  - Terminé
- **Mise à jour en Temps Réel**: Les changements d'état sont reflétés instantanément
- **Indicateurs de Performance**: Suivi du temps estimé et des tâches terminées

### 📊 Organisation des Tâches
- **Priorités Visuelles**:
  - 🔴 Haute
  - 🟡 Moyenne
  - 🔵 Basse
- **Tags Personnalisés**: Catégorisation flexible des tâches
- **Système de Commentaires**: Communication contextuelle sur chaque tâche
- **Assignation**: Attribution claire des responsabilités

### 💫 Interface Utilisateur
- **Design Moderne**: Interface épurée avec des animations fluides
- **Responsive**: Adaptation à tous les écrans
- **Thème Clair**: Palette de couleurs professionnelle
- **Indicateurs Visuels**: États et priorités facilement identifiables

## 🛠 Technologies Utilisées

- **Frontend**:
  - React 18
  - TypeScript
  - Tailwind CSS
  - DND Kit (drag-and-drop)
  - Lucide React (icônes)

- **Outils de Développement**:
  - Vite
  - ESLint
  - PostCSS
  - Autoprefixer

## 🏗 Architecture

### 📁 Structure des Composants

```
src/
├── components/
│   ├── Column.tsx       # Colonnes Kanban
│   ├── Header.tsx       # En-tête de l'application
│   └── TaskCard.tsx     # Carte de tâche
├── types/
│   └── index.ts         # Types TypeScript
└── utils/
    └── index.ts         # Utilitaires
```

### 🔄 Flux de Données

1. **État Global**: Géré via React useState
2. **Mise à jour des Tâches**: 
   - Drag-and-drop
   - Modification d'état
   - Mise à jour automatique des compteurs

### 🎨 Système de Design

- **Composants Réutilisables**
- **Classes Tailwind Optimisées**
- **Animations Fluides**
- **Palette de Couleurs Cohérente**

## 📊 Modèle de Données

### Task
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
  tags: string[];
  createdAt: string;
  estimatedHours?: number;
  completedAt?: string;
  comments: Comment[];
}
```

### Comment
```typescript
interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}
```

## 🚀 Installation

```bash
# Cloner le projet
git clone git@github.com:DanihStephane/Boardify.git

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## 💻 Scripts Disponibles

- `npm run dev`: Lance le serveur de développement
- `npm run build`: Compile l'application pour la production
- `npm run preview`: Prévisualise la version de production
- `npm run lint`: Vérifie le code avec ESLint

## 🔧 Configuration

### Vite
```javascript
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

### Tailwind
```javascript
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## 🎯 Fonctionnalités Détaillées

### Système de Drag-and-Drop
- Utilisation de `@dnd-kit/core` et `@dnd-kit/sortable`
- Support clavier pour l'accessibilité
- Animations fluides pendant le déplacement
- Mise à jour instantanée de l'état

### Gestion des États
- Mise à jour automatique des compteurs
- Calcul du temps total estimé
- Suivi des tâches terminées
- Horodatage des modifications

### Interface Utilisateur
- En-tête avec barre de recherche
- Notifications et paramètres
- Profil utilisateur
- Filtres et tri des tâches

## 🔜 Améliorations Futures

1. **Authentification**
   - Connexion utilisateur
   - Gestion des rôles
   - Permissions personnalisées

2. **Collaboration**
   - Temps réel avec WebSocket
   - Historique des modifications
   - Mentions d'utilisateurs

3. **Personnalisation**
   - Thèmes personnalisés
   - Colonnes configurables
   - Champs personnalisés

4. **Intégrations**
   - GitHub
   - Slack
   - Calendar

## 📝 Bonnes Pratiques

- **TypeScript**: Types stricts pour la sécurité du code
- **Components**: Architecture modulaire et réutilisable
- **Performance**: Optimisations React avec useMemo et useCallback
- **Accessibilité**: Support clavier et ARIA labels
- **Code Style**: ESLint et Prettier pour la cohérence

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📜 Licence

 `LICENSE` free: https://github.com/DanihStephane.

[![My Skills](https://skillicons.dev/icons?i=linkedin)](https://skillicons.dev) : https://www.linkedin.com/in/danihstephane/

## 🙏 Remerciements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [DND Kit](https://dndkit.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
