import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import {
	createUserService,
	deleteUserService,
	getAllUsersService,
	getUserByIdService,
	updateUserService,
	type UserFormValues,
} from "./service";

export type { UserFormValues } from "./service";

export const useGetAllUsers = () =>
	useQuery({
		queryKey: ["users"],
		queryFn: () => getAllUsersService(),
		placeholderData: keepPreviousData,
	});

export const useGetUserById = (id: string) =>
	useQuery({
		queryKey: ["user", id],
		queryFn: () => getUserByIdService(id),
		enabled: !!id,
	});

export const useCreateUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: UserFormValues) => createUserService(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};

export const useUpdateUser = (id: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: UserFormValues) => updateUserService(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			queryClient.invalidateQueries({ queryKey: ["user", id] });
		},
	});
};

export const useDeleteUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteUserService(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};
