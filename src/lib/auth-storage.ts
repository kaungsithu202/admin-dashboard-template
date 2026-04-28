const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_KEY = "user";

export interface StoredUser {
	id: string;
	name: string;
	email: string;
	avatar_url: string | null;
	user_type: string;
	email_verified: boolean;
	created_at: string;
}

export const authStorage = {
	getAccessToken: (): string | null => {
		if (typeof window === "undefined") return null;
		return localStorage.getItem(ACCESS_TOKEN_KEY);
	},

	getRefreshToken: (): string | null => {
		if (typeof window === "undefined") return null;
		return localStorage.getItem(REFRESH_TOKEN_KEY);
	},

	getUser: (): StoredUser | null => {
		if (typeof window === "undefined") return null;
		const userStr = localStorage.getItem(USER_KEY);
		if (!userStr) return null;
		try {
			return JSON.parse(userStr) as StoredUser;
		} catch {
			return null;
		}
	},

	setTokens: (accessToken: string, refreshToken: string): void => {
		if (typeof window === "undefined") return;
		localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
		localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
	},

	setUser: (user: StoredUser): void => {
		if (typeof window === "undefined") return;
		localStorage.setItem(USER_KEY, JSON.stringify(user));
	},

	clear: (): void => {
		if (typeof window === "undefined") return;
		localStorage.removeItem(ACCESS_TOKEN_KEY);
		localStorage.removeItem(REFRESH_TOKEN_KEY);
		localStorage.removeItem(USER_KEY);
	},

	isAuthenticated: (): boolean => {
		return authStorage.getAccessToken() !== null;
	},
};

