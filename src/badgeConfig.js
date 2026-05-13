// ============================================================
//  CONFIGURATION DU BADGE — VERSION MODERNE & PREMIUM
// ============================================================

const badgeConfig = {
  // ─────────────────────────────────────────────
  // Informations principales
  // ─────────────────────────────────────────────
  groupeName: "TRIBU LÉVI",

  headerLine1: "JEUNESSE DES ASSEMBLÉES DE DIEU DE CÔTE D’IVOIRE",
  headerLine2: "JEUNESSE DES ASSEMBLÉES DE DIEU D’ABOBO — Temple PENIEL",

  tagline: "Présente",

  bureauLabel: "Membre de la Tribu",

  // ─────────────────────────────────────────────
  // Taille du badge
  // ─────────────────────────────────────────────
  badgeWidth: 620,
  badgeHeight: 740,

  // ─────────────────────────────────────────────
  // Palette de couleurs
  // ─────────────────────────────────────────────
  colors: {

    // Fond principal
    gradientStart: "#0ea5e9", // bleu ciel vif
    gradientMid: "#38bdf8", // bleu clair
    gradientEnd: "#e0f2fe", // bleu très pâle

    // Textes principaux
    nom: "#ffffff",
    prenom: "#cbd5e1",

    // Titre principal
    bureauTitle: "#facc15", // jaune doré

    // Badge membre
    membreBadge: "#2563eb",
    membreText: "#ffffff",

    // Badge responsable
    respoBadge: "#facc15",
    respoText: "#111827",

    // Cercle photo
    ring: "#facc15",

    // Événement
    evenement: "#ffffff",
    questionMark: "#facc15",

    // Texte secondaire
    roleText: "#e2e8f0",
    dateText: "#94a3b8",

    // Filigrane
    watermark: "rgba(255,255,255,0.05)",
    photoGlow: "rgba(250, 204, 21, 0.45)",
    glassOverlay: "rgba(255, 255, 255, 0.05)",
  },

  // ─────────────────────────────────────────────
  // Arc décoratif moderne
  // ─────────────────────────────────────────────
  arcColors: [
    "#2563eb",
    "#7c3aed",
    "#ec4899",
    "#f59e0b"
  ],
  logoSize: 55,      // Taille (largeur/hauteur) des logos
  logoMargin: 35,    // Espace par rapport aux bords gauche et droit
  logoY: 28,

  // ─────────────────────────────────────────────
  // Tailles des polices
  // ─────────────────────────────────────────────
  fontSizes: {

    // En-tête
    header: 11,

    // Nom du groupe
    groupeName: 34,

    // "Présente"
    tagline: 17,

    // "Membre de la Tribu"
    bureau: 28,

    // Nom utilisateur
    nom: 38,

    // Prénom
    prenom: 22,

    // Poste
    role: 18,

    // Date
    date: 14,

    // Texte événement
    evenement: 32,

    // Position verticale (aligné avec le header)
  },

  // À ajouter dans badgeConfig
  logos: {
    left: "./assets/Levi_logo.jpeg",
    right: "./assets/Levi_logo.jpeg",
  },
};

export default badgeConfig;