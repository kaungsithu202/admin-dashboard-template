import { toast } from "sonner";
import DataLoading from "@/components/common/DataLoading";
import { DataTable } from "@/components/common/DataTable";
import { useDeleteUser, useGetAllUsers } from "@/features/users/api/queries";
import { getColumns } from "@/features/users/components/UserTable/column";
import { useEntityTableActions } from "@/hooks/useEntityTableActions";
import type { PaginationData } from "@/types";

type StringUser = { id: string; [key: string]: unknown };

function UsersPage() {
	const { data, isPending } = useGetAllUsers();
	const { mutateAsync: deleteUser } = useDeleteUser();

	const users: StringUser[] = (data ?? []).map((u) => ({
		...u,
		id: String(u.id),
	}));

	const tableActions = useEntityTableActions<StringUser>({
		baseUrl: "/users",
		onDelete: async (user) => {
			try {
				await deleteUser(user.id);
				toast.success("User deleted successfully");
			} catch (err: unknown) {
				const message =
					err instanceof Error ? err.message : "Something went wrong!";
				toast.error(message);
			}
		},
	});

	if (isPending) {
		return <DataLoading />;
	}

	const columns = getColumns(tableActions);

	const paginationData: PaginationData = {
		total: users.length,
		limit: 10,
		offset: 0,
	};

	return (
		<div className="my-10 flex items-center justify-center">
			<DataTable<StringUser, unknown>
				data={users}
				paginationData={paginationData}
				columns={columns}
				isPending={false}
				createLink="/users/create"
			/>
		</div>
	);
}

export default UsersPage;
