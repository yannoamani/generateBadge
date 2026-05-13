import { useState } from 'react';
import AdminPanel from './AdminPanel';
import LeviLogo from './LeviLogo';


// ⚠️  Modifiez le mot de passe ici si nécessaire
const ADMIN_PASSWORD = 'Peniel';

export default function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState(false);
  const [show,     setShow]     = useState(false);
  const [redirigate,     setRedirigate]     = useState(false);

  const handleSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      setError(false);
      setRedirigate(true);
      onSuccess();
    } else {
      setError(true);
      setPassword('');
      setShow(false);
    }
  };

  return (
    
     redirigate ? <AdminPanel /> : (
         <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-yellow-900 to-yellow-800 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">

        {/* Logo / titre */}
        <div className="text-center mb-8">
          <div className="justify-center align-center flex"><LeviLogo size={60} /></div>
          <h1
            className="text-2xl tracking-widest text-yellow-900 font-bold mb-1"
            style={{ fontFamily: 'Bangers, cursive' }}
          >
            ESPACE ADMIN
          </h1>
          <p className="text-gray-500 text-sm">Tribu Lévi — Accès réservé</p>
        </div>

        {/* Champ mot de passe */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Mot de passe
          </label>
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Entrez le mot de passe"
              className={`w-full px-4 py-3 pr-12 border rounded-xl text-sm focus:outline-none transition-all
                ${error
                  ? 'border-red-400 bg-red-50 focus:border-red-500'
                  : 'border-gray-200 focus:border-yellow-900 focus:bg-yellow-900'}`}
            />
            <button
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg"
            >
              {show ? '🙈' : '👁️'}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              ❌ Mot de passe incorrect. Réessayez.
            </p>
          )}
        </div>

        {/* Bouton connexion */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-yellow-800 to-yellow-600
            hover:from-yellow-700 hover:to-yellow-500 text-white rounded-xl
            font-bold text-base tracking-wide transition-all shadow-md hover:shadow-lg active:scale-95"
        >
           Accéder au tableau de bord
        </button>

        <p className="text-center text-xs text-gray-400 mt-6">
          Accès interdit aux non-administrateurs.
        </p>
      </div>
    </div>
  ));
}
