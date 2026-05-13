import LeviLogo from './LeviLogo';

export default function BadgePreview({ badgeUrl }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-7 border border-indigo-50">
      <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-green-100">
        <LeviLogo size={36} />
        <h2 className="text-yellow-900 font-bold text-lg"> Aperçu du Badge</h2>
      </div>

      {badgeUrl ? (
        <div className="flex flex-col items-center gap-4">
          <img src={badgeUrl} alt="Badge généré" className="w-full rounded-xl shadow-lg" />
          <p className="text-green-700 text-sm font-semibold">
             Badge prêt ! Cliquez sur "Télécharger" dans le formulaire.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-300">
          <LeviLogo size={72} className="opacity-20" />
          <p className="text-center text-sm text-gray-400 mt-4">
            Remplissez le formulaire et cliquez sur<br />
            <strong className="text-indigo-500">"Générer mon Badge"</strong> pour voir l'aperçu.
          </p>
        </div>
      )}
    </div>
  );
}
