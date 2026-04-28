export type ApiResponse<T> = {
	success: boolean;
	message: string;
	data: T;
};

export type ActionResponse = {
	success: boolean;
	code?: string;
	message: string;
};

export type PaginationData = { total: number; limit: number; offset: number };
