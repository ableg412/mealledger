// Shared types between frontend and backend.

export interface DemoRequest {
  fullName: string;
  email: string;
  organization: string;
  siteCount: number;
  message?: string;
}

export interface DemoRequestResponse {
  ok: boolean;
  id?: string;
  error?: string;
}
