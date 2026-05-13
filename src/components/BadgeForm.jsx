import { useEffect } from 'react';
import PhotoUpload from './PhotoUpload';
import FormField from './FormField';
import LeviLogo from './LeviLogo';

export default function BadgeForm({
  fields, setFields, onGenerate, badgeUrl, onDownload,
  onSave, saving, saved, saveError, setSaved, setSaveError, setBadgeUrl
}) {

  // 1. Gestion de la disparition automatique des messages (3 secondes)
  useEffect(() => {
    if (saved || saveError) {
      const timer = setTimeout(() => {
        if (setSaved) setSaved(false);
        if (setSaveError) setSaveError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [saved, saveError, setSaved, setSaveError]);

  // 2. Action combinée : Générer + Sauvegarder
  const handleGenerateAndSave = async () => {
    onGenerate();
    await onSave();
  };

  // 3. Action de téléchargement + Nettoyage
  const handleDownloadAndReset = () => {
    onDownload();
    
    // On laisse un petit délai pour que le téléchargement se lance avant de vider
    setTimeout(() => {
      setFields({
        prenom: '',
        nom: '',
        sexe: '',
        role: '',
        photoImg: null,
        photoSrc: null
      });
      if (setBadgeUrl) setBadgeUrl(null);
    }, 500);
  };

  const set = (key) => (val) =>
    setFields((f) => ({ ...f, [key]: val }));

  const isFormValid =
    fields.prenom?.trim() &&
    fields.nom?.trim() &&
    fields.sexe &&
    fields.role?.trim() &&
    fields.photoSrc;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-7 border border-indigo-50">
      
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-green-100">
        <LeviLogo size={36} />
        <h2 className="text-yellow-900 font-bold text-lg">Vos informations</h2>
      </div>

      {/* PHOTO */}
      <div className="mb-5">
        <PhotoUpload
          onPhoto={(img, src) =>
            setFields((f) => ({ ...f, photoImg: img, photoSrc: src }))
          }
          // On passe une clé pour forcer le reset du composant PhotoUpload si nécessaire
          key={fields.photoSrc ? 'has-photo' : 'no-photo'} 
        />
      </div>

      {/* FORMULAIRE */}
      <div className="space-y-4">
        <FormField label="Prénom" value={fields.prenom} onChange={set('prenom')} placeholder="Ex: Franck Emmanuel" />
        <FormField label="Nom de famille" value={fields.nom} onChange={set('nom')} placeholder="Ex: KONAN" />
        <FormField label="Genre" value={fields.sexe} onChange={set('sexe')} options={['Feminin', 'Masculin']} placeholder="Sélectionner" />
        <FormField label="Profession" value={fields.role} onChange={set('role')} placeholder="Ex: Etudiant" />
      </div>

      {/* FEEDBACKS TEMPORAIRES */}
      <div className="h-8 mt-2"> {/* Hauteur fixe pour éviter les sauts de mise en page */}
        {!isFormValid && !badgeUrl && (
          <p className="text-xs text-red-500 text-center animate-pulse">
            ⚠️ Remplissez tous les champs obligatoires
          </p>
        )}
        {saved && (
          <div className="py-1 bg-green-50 border border-green-200 text-green-700 rounded-lg text-center text-xs font-bold animate-bounce">
            ✅ Inscription enregistrée !
          </div>
        )}
        {saveError && (
          <div className="py-1 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center text-xs">
            ❌ Erreur: {saveError}
          </div>
        )}
      </div>

      {/* ACTIONS */}
      <div className="space-y-3">
        <button
          onClick={handleGenerateAndSave}
          disabled={!isFormValid || saving}
          className={`w-full py-3.5 rounded-xl font-bold text-base transition-all shadow-md active:scale-95
            ${isFormValid && !saving
              ? 'bg-gradient-to-r from-indigo-800 to-indigo-600 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          {saving ? '⏳ Enregistrement...' : '🎨 Générer & Enregistrer'}
        </button>

        {badgeUrl && (
          <button
            onClick={handleDownloadAndReset}
            className="w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-semibold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 animate-in fade-in zoom-in duration-300"
          >
            ⬇️ Télécharger (PNG) & Nouveau
          </button>
        )}
      </div>
    </div>
  );
}