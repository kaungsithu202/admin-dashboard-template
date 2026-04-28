import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type EntityActionCellProps<T> = {
	data: T;
	onView: (data: T) => void;
	onEdit: (data: T) => void;
	onDelete?: (data: T) => void;
};

export function EntityActionCell<T>({
	data,
	onView,
	onEdit,
	onDelete,
}: EntityActionCellProps<T>) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => onView(data)}>View</DropdownMenuItem>
				<DropdownMenuItem onClick={() => onEdit(data)}>Edit</DropdownMenuItem>
				{onDelete ? (
					<DropdownMenuItem
						className="text-red-600"
						onClick={() => onDelete(data)}
					>
						Delete
					</DropdownMenuItem>
				) : null}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
