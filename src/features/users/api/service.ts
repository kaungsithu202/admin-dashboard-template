import { httpClient } from "@/api/clients";
import { END_POINTS } from "@/constants/endpoints";
import type { User } from "../types";

export type UserFormValues = {
	name: string;
	username: string;
	email: string;
	phone: string;
	website: string;
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	companyName: string;
	catchPhrase: string;
	bs: string;
};

export const getAllUsersService = async (): Promise<User[]> => {
	const { data } = await httpClient.get(END_POINTS.USERS);
	return data;
};

export const getUserByIdService = async (id: string): Promise<User> => {
	const { data } = await httpClient.get(END_POINTS.GET_USER_BY_ID(id));
	return data;
};

export const createUserService = async (
	payload: UserFormValues,
): Promise<User> => {
	const { data } = await httpClient.post(END_POINTS.CREATE_USER, {
		name: payload.name,
		username: payload.username,
		email: payload.email,
		phone: payload.phone,
		website: payload.website,
		address: {
			street: payload.street,
			suite: payload.suite,
			city: payload.city,
			zipcode: payload.zipcode,
			geo: { lat: "0", lng: "0" },
		},
		company: {
			name: payload.companyName,
			catchPhrase: payload.catchPhrase,
			bs: payload.bs,
		},
	});
	return data;
};

export const updateUserService = async (
	id: string,
	payload: UserFormValues,
): Promise<User> => {
	const { data } = await httpClient.put(END_POINTS.UPDATE_USER(id), {
		name: payload.name,
		username: payload.username,
		email: payload.email,
		phone: payload.phone,
		website: payload.website,
		address: {
			street: payload.street,
			suite: payload.suite,
			city: payload.city,
			zipcode: payload.zipcode,
			geo: { lat: "0", lng: "0" },
		},
		company: {
			name: payload.companyName,
			catchPhrase: payload.catchPhrase,
			bs: payload.bs,
		},
	});
	return data;
};

export const deleteUserService = async (id: string): Promise<void> => {
	await httpClient.delete(END_POINTS.DELETE_USER(id));
};
