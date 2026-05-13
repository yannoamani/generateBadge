import { useState, useRef, useCallback } from 'react';
import BadgeForm    from './components/BadgeForm';
import BadgePreview from './components/BadgePreview';
// import AdminPanel   from './components/AdminPanel';
import AdminLogin   from './components/AdminLogin';
import { drawBadge } from './drawBadge';
import { supabase }  from './supabaseClient';
import LeviLogo      from './components/LeviLogo';

const initialFields = {
  prenom:   '',
  nom:      '',
  ddn:      '',
  role:     '',
  photoImg: null,
  photoSrc: null,
  sexe:     '',
};

export default function App() {
  const [fields,    setFields]    = useState(initialFields);
  const [badgeUrl,  setBadgeUrl]  = useState(null);
  const [view,      setView]      = useState('form');
  const [saved,     setSaved]     = useState(false);
  const [saving,    setSaving]    = useState(false);
  const [saveError, setSaveError] = useState(null);
  const canvasRef = useRef();

  const handleGenerate = useCallback(() => {
    const url = drawBadge(canvasRef.current, fields);
    setBadgeUrl(url);
    setSaved(false);
    setSaveError(null);
  }, [fields]);

  const handleSaveRegistration = useCallback(async () => {
    if (!fields.prenom || !fields.nom) {
      setSaveError('Veuillez renseigner au moins le prénom et le nom.');
      return;
    }
    setSaving(true);
    setSaveError(null);
    try {
      const { error } = await supabase.from('inscriptions').insert([{
        prenom:    fields.prenom,
        nom:       fields.nom,
        ddn:       fields.ddn || null,
        role:      fields.role || null,
        sexe:      fields.sexe || null,
        photo_src: fields.photoSrc || null,
        badge_url: badgeUrl || null,
        created_at: new Date().toISOString(),
      }]);
      if (error) throw error;
      setSaved(true);
    } catch (err) {
      console.error(err);
      setSaveError("Erreur d'enregistrement. Vérifiez la config Supabase dans supabaseClient.js");
    } finally {
      setSaving(false);
    }
  }, [fields, badgeUrl]);

  const handleDownload = () => {
    if (!badgeUrl) return;
    const a = document.createElement('a');
    a.href     = badgeUrl;
    a.download = `Badge_Tribu_Levi_${fields.nom}_${fields.prenom}.png`.replace(/\s+/g, '_');
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-green-50 to-yellow-50 p-4 md:p-6">
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 bg-white rounded-2xl shadow-lg p-6 border border-indigo-100">
          <div className="flex justify-center mb-3">
            <LeviLogo size={80} />
          </div>
          <h1 className="text-4xl tracking-widest text-indigo-900 mb-1" style={{ fontFamily: 'Bangers, cursive' }}>
            TRIBU LÉVI — Générateur de Badge
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Rubrique <strong className="text-yellow-700">Qui Me Connaît ?</strong> — Assemblées de Dieu d'Abobo, Temple de Péniel
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => setView('form')}
              className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all ${view === 'form' ? 'bg-yellow-800 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-indigo-50'}`}
            >
               Générer mon Badge
            </button>
            <button
              onClick={() => setView('admin')}
              className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all ${view === 'admin' ? 'bg-yellow-800 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-indigo-50'}`}
            >
              📋 Liste des Inscrits
            </button>
          </div>
        </div>

        {view === 'form' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BadgeForm
              fields={fields}
              setFields={setFields}
              onGenerate={handleGenerate}
              badgeUrl={badgeUrl}
              onDownload={handleDownload}
              onSave={handleSaveRegistration}
              saving={saving}
              saved={saved}
              saveError={saveError}
            />
            <BadgePreview badgeUrl={badgeUrl} />
          </div>
        ) : (
          <AdminLogin onSuccess={() => console.log('Admin login successful')} />
        )}

        <div className="flex flex-col items-center mt-6 gap-2">
          <LeviLogo size={32} />
          <p className="text-center text-xs text-gray-400">
            Tribu Lévi · Jeunesse des Assemblées de Dieu d'Abobo, Temple de Péniel · <em>Qui Me Connaît ?</em>
          </p>
        </div>
      </div>
    </div>
  );
}
