import PhotoUpload from './PhotoUpload';
import FormField from './FormField';
import LeviLogo from './LeviLogo';

export default function BadgeForm({
  fields, setFields, onGenerate, badgeUrl, onDownload,
  onSave, saving, saved, saveError
}) {

  const set = (key) => (val) =>
    setFields((f) => ({ ...f, [key]: val }));

  // 🛡️ VALIDATION FORMULAIRE
  const isFormValid =
    fields.prenom?.trim() &&
    fields.nom?.trim() &&
    fields.ddn &&
    fields.sexe &&
    fields.photoSrc;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-7 border border-indigo-50">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-green-100">
        <LeviLogo size={36} />
        <h2 className="text-yellow-900 font-bold text-lg">
           Vos informations
        </h2>
      </div>

      {/* PHOTO */}
      <div className="mb-5">
        <PhotoUpload
          onPhoto={(img, src) =>
            setFields((f) => ({ ...f, photoImg: img, photoSrc: src }))
          }
        />
      </div>

      {/* CHAMPS */}
      <FormField label="Prénom"
        value={fields.prenom}
        onChange={set('prenom')}
        placeholder="Ex: Franck Emmanuel"
      />

      <FormField label="Nom de famille"
        value={fields.nom}
        onChange={set('nom')}
        placeholder="Ex: KONAN"
      />
      <FormField label="Sexe"
        value={fields.sexe}
        onChange={set('sexe')}
        placeholder="Feminin ou Masculin"
       
        options={['Feminin', 'Masculin']}
      />

      <FormField label="Date de naissance"
        type="date"
        value={fields.ddn}
        onChange={set('ddn')}
      />

      <FormField label="Rôle / Titre"
        value={fields.role}
        onChange={set('role')}
        placeholder="Ex: Président de la Tribu LÉVI"
        optional
      />
      

      {/* MESSAGE SI INCOMPLET */}
      {!isFormValid && (
        <p className="text-xs text-red-500 mt-3 text-center">
          ⚠️ Remplissez tous les champs obligatoires pour continuer
        </p>
      )}

      {/* BOUTON GÉNÉRER */}
      <button
        onClick={onGenerate}
        disabled={!isFormValid}
        className={`w-full mt-3 py-3.5 rounded-xl font-bold text-base tracking-wide transition-all shadow-md active:scale-95
          ${isFormValid
            ? 'bg-gradient-to-r from-indigo-800 to-indigo-600 hover:from-indigo-700 hover:to-indigo-500 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
      >
        🎨 Générer mon Badge
      </button>

      {/* APRÈS GÉNÉRATION */}
      {badgeUrl && (
        <div className="mt-4 space-y-3">

          {/* DOWNLOAD */}
          <button
            onClick={onDownload}
            className="w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-semibold transition-all shadow-md active:scale-95"
          >
            ⬇️ Télécharger mon Badge (PNG)
          </button>

          {/* SAVE */}
          {!saved ? (
            <button
              onClick={onSave}
              disabled={saving}
              className={`w-full py-3 rounded-xl font-semibold transition-all shadow-md active:scale-95
                ${saving
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-yellow-700 hover:bg-yellow-600 text-white'
                }`}
            >
              {saving ? '⏳ Enregistrement…' : '✅ Enregistrer mon inscription'}
            </button>
          ) : (
            <div className="w-full py-3 bg-green-50 border border-green-300 text-green-700 rounded-xl text-center font-semibold text-sm">
              🎉 Inscription enregistrée avec succès !
            </div>
          )}

          {/* ERREUR SAUVEGARDE */}
          {saveError && (
            <div className="py-2 px-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs">
               {saveError}
            </div>
          )}

        </div>
      )}
    </div>
  );
}