export const END_POINTS = {
	LOGIN: "/users/1",
	USERS: "/users",
	GET_USER_BY_ID: (id: string) => `/users/${id}`,
	CREATE_USER: "/users",
	UPDATE_USER: (id: string) => `/users/${id}`,
	DELETE_USER: (id: string) => `/users/${id}`,
} as const;
