export interface User {
	id: string;
	name: string;
	email: string;
	avatar_url: string | null;
	user_type: string;
	email_verified: boolean;
	created_at: string;
}

export interface LoginResponse {
	user: User;
	access_token: string;
	refresh_token: string;
	token_type: string;
	expires_in: number;
}
