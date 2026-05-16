import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import LeviLogo from './LeviLogo';

export default function AdminPanel() {
  const [inscrits, setInscrits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [lastCount, setLastCount] = useState(null);

  // Chargement initial
  const fetchInscrits = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('inscriptions')
        .select('id, prenom, nom, ddn, role,  created_at')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setInscrits(data || []);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les données. Vérifiez la configuration Supabase dans supabaseClient.js");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInscrits();

    // Écoute en temps réel (realtime Supabase)
    const channel = supabase
      .channel('inscriptions-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'inscriptions' },
        (payload) => {
          setInscrits((prev) => [payload.new, ...prev]);
          setLastCount(Date.now());
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filtered = inscrits.filter((p) => {
    const q = search.toLowerCase();
    return (
      (p.nom || '').toLowerCase().includes(q) ||
      (p.prenom || '').toLowerCase().includes(q) ||
      (p.role || '').toLowerCase().includes(q)
    );
  });

  const formatDate = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const formatDDN = (d) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-7 border border-indigo-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-green-100">
        <div className="flex items-center gap-3">
          <LeviLogo size={36} />
          <div>
            <h2 className="text-indigo-900 font-bold text-lg"> TABLEAU DE BORD</h2>
            <p className="text-xs text-gray-400">Bienvenue ADMIN</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Indicateur live */}
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-green-600 font-semibold">LIVE</span>
          </div>
          <button
            onClick={fetchInscrits}
            className="px-3 py-1.5 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-semibold transition-all"
          >
             Actualiser
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-indigo-50 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-indigo-900">{inscrits.length}</div>
          <div className="text-xs text-indigo-500 font-semibold">Total inscrits</div>
        </div>
        <div className="bg-green-50 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-green-800">
            {inscrits.filter(i => {
              const d = new Date(i.created_at);
              const today = new Date();
              return d.toDateString() === today.toDateString();
            }).length}
          </div>
          <div className="text-xs text-green-600 font-semibold">Aujourd'hui</div>
        </div>
        <div className="bg-yellow-50 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-yellow-800">
            {inscrits.filter(i => i.role).length}
          </div>
          <div className="text-xs text-yellow-600 font-semibold">Avec un rôle</div>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Rechercher par nom, prénom ou rôle..."
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm
            focus:outline-none focus:border-indigo-500 focus:bg-indigo-50 transition-all"
        />
      </div>

      {/* Notification nouveau inscrit */}
      {lastCount && (
        <div key={lastCount} className="mb-3 py-2 px-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-semibold animate-pulse">
          🎉 Nouvel inscrit enregistré !
        </div>
      )}

      {/* Contenu */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-400">
          <div className="text-center">
            <div className="text-4xl mb-3 animate-spin">⏳</div>
            <p className="text-sm">Chargement des inscrits…</p>
          </div>
        </div>
      ) : error ? (
        <div className="py-8 px-4 bg-red-50 border border-red-200 rounded-xl text-center">
          <div className="text-3xl mb-2">⚠️</div>
          <p className="text-red-600 text-sm font-semibold mb-2">Configuration requise</p>
          <p className="text-red-500 text-xs">{error}</p>
          <div className="mt-3 p-3 bg-white rounded-lg border border-red-100 text-left text-xs text-gray-600">
            <p className="font-semibold mb-1">📋 Étapes :</p>
            <p>1. Créez un compte sur <strong>supabase.com</strong></p>
            <p>2. Créez un projet</p>
            <p>3. Ouvrez <strong>src/supabaseClient.js</strong></p>
            <p>4. Remplissez l'URL et la clé anon</p>
            <p>5. Créez la table avec le SQL fourni dans le fichier</p>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-300">
          <LeviLogo size={60} className="opacity-20" />
          <p className="text-sm text-gray-400 mt-3">
            {search ? 'Aucun résultat pour cette recherche' : 'Aucun inscrit pour le moment'}
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className="flex items-start gap-4 p-4 bg-gray-50 hover:bg-indigo-50 rounded-xl border border-gray-100 hover:border-indigo-200 transition-all"
            >
              {/* Avatar ou photo */}
              <div className="flex-shrink-0">
                {p.photo_src ? (
                  <img
                    src={p.photo_src}
                    alt={`${p.prenom} ${p.nom}`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-indigo-300 shadow"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-800 font-bold text-lg">
                    {(p.prenom || '?')[0]}{(p.nom || '?')[0]}
                  </div>
                )}
              </div>

              {/* Infos */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-indigo-900 text-base">
                    {p.prenom} {p.nom.toUpperCase()}
                  </span>
                  {p.role && (
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-md text-xs font-semibold">
                      {p.role}
                    </span>
                  )}
                </div>
                {p.ddn && (
                  <p className="text-xs text-gray-500 mt-0.5">🎂 Né(e) le : {formatDDN(p.ddn)}</p>
                )}
                {p.sexe && (
                  <p className="text-xs text-gray-500 mt-0.5">👤 Sexe : {p.sexe}</p>
                )}
                <p className="text-xs text-gray-400 mt-0.5">🕐 Inscrit le : {formatDate(p.created_at)}</p>
              </div>

              {/* Numéro */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold">
                #{inscrits.length - inscrits.findIndex(x => x.id === p.id)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Export CSV */}
      {inscrits.length > 0 && (
        <button
          onClick={() => {
            const headers = ['Prénom', 'Nom', 'Date de naissance', 'Rôle', 'Date inscription'];
            const rows = inscrits.map(p => [
              p.prenom, p.nom, p.ddn || '', p.role || '', formatDate(p.created_at)
            ]);
            const csv = [headers, ...rows].map(r => r.join(';')).join('\n');
            const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'inscrits_tribu_levi.csv';
            a.click();
          }}
          className="mt-4 w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold text-sm transition-all"
        >
          📥 Exporter la liste en CSV ({inscrits.length} inscrits)
        </button>
      )}
    </div>
  );
}