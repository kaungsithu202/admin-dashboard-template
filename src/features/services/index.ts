import { END_POINTS } from "@/constants/endpoints";
import { openHttpClient } from "@/api/clients";
import type { LoginResponse } from "../types";

interface LoginPayload {
	email: string;
	password: string;
}

export const loginService = async (
	_payload: LoginPayload,
): Promise<LoginResponse> => {
	const { data: user } = await openHttpClient.get(END_POINTS.LOGIN);
	const mappedUser = {
		id: String(user.id),
		name: user.name,
		email: user.email,
		avatar_url: null,
		user_type: "admin",
		email_verified: true,
		created_at: new Date().toISOString(),
	};
	return {
		user: mappedUser,
		access_token: "mock-access-token",
		refresh_token: "mock-refresh-token",
		token_type: "Bearer",
		expires_in: 3600,
	};
};
