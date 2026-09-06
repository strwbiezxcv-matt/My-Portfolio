/* Thin Supabase REST client for persistence.
 *
 * Uses the existing Supabase configuration (anon key + project URL) with the
 * option to override via Vite environment variables. Only the PUBLIC anon key
 * is used here — never a service-role key, which must stay server-side.
 *
 * No authentication is used. All visitors can submit a recommendation (which is
 * stored as approved = true and displayed immediately) and read the public ones.
 * Row Level Security policies in the database prevent visitors from editing or
 * deleting existing recommendations.
 */
import { projectId, publicAnonKey } from "../../utils/supabase/info";

const SUPABASE_URL =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) || `https://${projectId}.supabase.co`;
const ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || publicAnonKey;

const REST_URL = `${SUPABASE_URL}/rest/v1`;

export type RecommendationRow = {
  id: string;
  name: string;
  from: string;
  message: string;
  created_at: string;
  approved: boolean;
};

function baseHeaders(extra: Record<string, string> = {}): Record<string, string> {
  return {
    "Content-Type": "application/json",
    apikey: ANON_KEY,
    ...extra,
  };
}

export async function fetchApprovedRecommendations(): Promise<RecommendationRow[]> {
  const url = `${REST_URL}/recommendations?select=*&approved=eq.true&order=created_at.desc`;
  const res = await fetch(url, { headers: baseHeaders() });
  if (!res.ok) throw new Error(`Could not load recommendations (${res.status})`);
  return (await res.json()) as RecommendationRow[];
}

/* Submits a recommendation publicly. Once the database confirms the insert, the
   saved row is returned so the UI can display it immediately. */
export async function insertRecommendation(input: {
  name: string;
  from: string;
  message: string;
}): Promise<RecommendationRow> {
  const url = `${REST_URL}/recommendations`;
  const res = await fetch(url, {
    method: "POST",
    headers: baseHeaders({
      Authorization: `Bearer ${ANON_KEY}`,
      Prefer: "return=representation",
    }),
    body: JSON.stringify({ ...input, approved: true }),
  });
  if (!res.ok) throw new Error(`Could not submit recommendation (${res.status})`);
  const rows = (await res.json()) as RecommendationRow[];
  const saved = rows?.[0];
  if (!saved) throw new Error("Could not submit recommendation");
  return saved;
}