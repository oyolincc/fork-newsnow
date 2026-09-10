export type GitHubUser = { id: number; login: string; avatar_url: string; email: string | null }
export type GitHubToken = { access_token?: string; error?: string }
