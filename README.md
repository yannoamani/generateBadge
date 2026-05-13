# 🏛️ Tribu Lévi — Générateur de Badge v2.0

Application React + Tailwind CSS permettant à chaque membre de la **Tribu Lévi** de générer et télécharger son badge personnalisé pour la journée **Qui Me Connaît ?**

**Nouveauté v2.0** : Sauvegarde en temps réel avec **Supabase** + Tableau de bord des inscrits !

---

## 🚀 Démarrage rapide

```bash
npm install   # installer les dépendances (inclut @supabase/supabase-js)
npm start     # lancer sur http://localhost:3000
```

---

## 🗄️ Configuration Supabase (OBLIGATOIRE pour sauvegarder les inscrits)

### Étape 1 — Créer un projet Supabase

1. Allez sur **https://supabase.com** et créez un compte gratuit
2. Cliquez sur **"New Project"**
3. Donnez un nom (ex: `tribu-levi`) et choisissez une région proche
4. Attendez que le projet se crée (~2 minutes)

### Étape 2 — Créer la table inscriptions

Dans Supabase, allez dans **SQL Editor** et exécutez ce code SQL :

```sql
create table inscriptions (
  id         bigint generated always as identity primary key,
  prenom     text not null,
  nom        text not null,
  ddn        date,
  role       text,
  photo_src  text,
  badge_url  text,
  created_at timestamptz default now()
);

alter table inscriptions enable row level security;

create policy "Lecture publique"
  on inscriptions for select using (true);

create policy "Ecriture publique"
  on inscriptions for insert with check (true);

alter publication supabase_realtime add table inscriptions;
```

### Étape 3 — Récupérer les clés API

Dans Supabase, allez dans **Settings > API** :
- Copiez l'**URL du projet** (ex: https://abcxyz.supabase.co)
- Copiez la clé **anon / public**

### Étape 4 — Configurer l'app

Ouvrez **src/supabaseClient.js** et remplacez les deux valeurs :

```js
const SUPABASE_URL  = 'https://VOTRE_URL.supabase.co';
const SUPABASE_ANON = 'VOTRE_CLE_ANON_PUBLIC';
```

---

## 🗂️ Structure du projet

```
src/
├── supabaseClient.js           ← CONFIGURER ICI : URL et clé Supabase
├── badgeConfig.js              ← MODIFIER ICI : textes, couleurs, tailles
├── drawBadge.js                ← Logique de dessin du badge (Canvas)
├── App.jsx                     ← Composant principal avec navigation
└── components/
    ├── LeviLogo.jsx            ← Logo Menorah de la Tribu Lévi
    ├── AdminPanel.jsx          ← Tableau de bord inscrits (temps réel)
    ├── BadgeForm.jsx           ← Formulaire + bouton Enregistrer
    ├── BadgePreview.jsx        ← Aperçu du badge généré
    ├── PhotoUpload.jsx         ← Zone upload photo (drag and drop)
    └── FormField.jsx           ← Champ de formulaire réutilisable
```

---

## ✨ Fonctionnalités v2.0

- Sauvegarde Supabase : chaque inscrit est sauvegardé dans la base de données
- Temps réel : la liste des inscrits se met à jour automatiquement
- Tableau de bord : voir tous les inscrits avec photo, nom, rôle, date
- Recherche : filtrer les inscrits par nom, prénom ou rôle
- Export CSV : télécharger la liste complète en Excel/CSV
- Logo Lévi (Menorah) présent sur toutes les pages

---

## 🚀 Déploiement

### Netlify (recommandé - gratuit)
```bash
npm run build
# Glissez le dossier build/ sur app.netlify.com
```

---

*Tribu Lévi · Jeunesse des Assemblées de Dieu d'Abobo, Temple de Péniel · Qui Me Connaît ?*
