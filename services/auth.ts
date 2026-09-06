const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface User {
  id?: string | number;
  email: string;
  firstname?: string;
  [key: string]: unknown;
}

export interface AuthResponseData {
  token: string;
  user: User;
}

export function formatFirstname(name?: string | null): string {
  if (!name || typeof name !== "string") return "";
  return name
    .trim()
    .toLowerCase()
    .replace(/(?:^|[\s\-])\p{L}/gu, (match) => match.toUpperCase());
}

export async function registerUser(data: { email: string; password: string; firstname: string }): Promise<AuthResponseData> {
  const formattedFirstname = formatFirstname(data.firstname);
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, firstname: formattedFirstname }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || result.error || "Erreur lors de l'inscription");
  }

  const payload = result.data || result;
  const token = payload.token || result.token;
  const rawUser = payload.user || result.user || { email: data.email, firstname: formattedFirstname };
  const user = { ...rawUser, firstname: formatFirstname(rawUser.firstname || formattedFirstname) };

  if (!token) {
    throw new Error("Token d'authentification non reçu du serveur");
  }

  return { token, user };
}

export async function loginUser(data: { email: string; password: string }): Promise<AuthResponseData> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || result.error || "Identifiants invalides ou erreur de connexion");
  }

  const payload = result.data || result;
  const token = payload.token || result.token;
  const rawUser = payload.user || result.user || { email: data.email };
  const user = { ...rawUser, firstname: rawUser.firstname ? formatFirstname(rawUser.firstname) : undefined };

  if (!token) {
    throw new Error("Token d'authentification non reçu du serveur");
  }

  return { token, user };
}

export async function updateUserProfile(
  data: { email: string; firstname: string },
  token: string
): Promise<AuthResponseData> {
  const formattedFirstname = formatFirstname(data.firstname);
  const response = await fetch(`${API_URL}/api/auth/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...data, firstname: formattedFirstname }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || result.error || "Erreur lors de la mise à jour du profil");
  }

  const payload = result.data || result;
  const newToken = payload.token || result.token || token;
  const rawUser = payload.user || result.user || { email: data.email, firstname: formattedFirstname };
  const user = { ...rawUser, firstname: formatFirstname(rawUser.firstname || formattedFirstname) };

  return { token: newToken, user };
}

export async function changePassword(
  data: { oldPassword: string; newPassword: string },
  token: string
): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_URL}/api/auth/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || result.error || "Erreur lors de la modification du mot de passe");
  }

  return { success: true, message: result.message || "Mot de passe modifié avec succès." };
}