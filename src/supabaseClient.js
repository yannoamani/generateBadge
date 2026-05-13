import { createClient } from '@supabase/supabase-js';

// ============================================================
//  CONFIGURATION SUPABASE
//  1. Créez un compte sur https://supabase.com (gratuit)
//  2. Créez un projet
//  3. Allez dans Settings > API
//  4. Copiez l'URL et la clé anon/public ici
// ============================================================

const SUPABASE_URL  = 'https://lxsetwahenzsvdrtfaxg.supabase.co';       // ← Remplacez ici
const SUPABASE_ANON = 'sb_publishable_nWKjGPJDEK2kW_cQ2T2Lag_vYquf4G2';               // ← Remplacez ici

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

// ============================================================
//  TABLE À CRÉER dans Supabase > SQL Editor :
//
//  create table inscriptions (
//    id         bigint generated always as identity primary key,
//    prenom     text not null,
//    nom        text not null,
//    ddn        date,
//    role       text,
//    photo_src  text,
//    badge_url  text,
//    created_at timestamptz default now()
//  );
//
//  -- Activer Row Level Security (recommandé)
//  alter table inscriptions enable row level security;
//
//  -- Permettre la lecture et l'écriture publique (pour l'app)
//  create policy "Lecture publique" on inscriptions for select using (true);
//  create policy "Ecriture publique" on inscriptions for insert with check (true);
// ============================================================
