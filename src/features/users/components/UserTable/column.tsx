import type { ColumnDef } from "@tanstack/react-table";
import { EntityActionCell } from "@/components/common/EntityActionCell";

type StringUser = { id: string; [key: string]: unknown };

type ColumnsProps = {
	onView: (row: StringUser) => void;
	onEdit: (row: StringUser) => void;
	onDelete: (row: StringUser) => void;
};

export const getColumns = ({
	onView,
	onEdit,
	onDelete,
}: ColumnsProps): ColumnDef<StringUser>[] => [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "username",
		header: "Username",
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: ({ row }) => (
			<div className="w-40 line-clamp-1 text-ellipsis">{String(row.original.email)}</div>
		),
	},
	{
		accessorKey: "phone",
		header: "Phone",
		cell: ({ row }) => (
			<div className="w-28 line-clamp-1 text-ellipsis">{String(row.original.phone)}</div>
		),
	},
	{
		id: "company",
		header: "Company",
		accessorFn: (row) => {
			const company = row.company as Record<string, unknown> | undefined;
			return company?.name ? String(company.name) : "";
		},
		cell: ({ row }) => {
			const company = row.original.company as Record<string, unknown> | undefined;
			return (
				<div className="w-32 line-clamp-1 text-ellipsis">
					{company?.name ? String(company.name) : ""}
				</div>
			);
		},
	},
	{
		accessorKey: "website",
		header: "Website",
		cell: ({ row }) => (
			<div className="w-28 line-clamp-1 text-ellipsis">{String(row.original.website)}</div>
		),
	},
	{
		id: "actions",
		header: "",
		enableSorting: false,
		cell: ({ row }) => (
			<EntityActionCell
				data={row.original}
				onView={onView}
				onEdit={onEdit}
				onDelete={onDelete}
			/>
		),
	},
];
