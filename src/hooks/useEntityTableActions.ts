import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

type UseEntityTableActionsProps<T extends { id: string }> = {
	baseUrl: string;
	onDelete?: (data: T) => void;
};

export function useEntityTableActions<T extends { id: string }>({
	baseUrl,
	onDelete: onDeleteCallback,
}: UseEntityTableActionsProps<T>) {
	const navigate = useNavigate();

	const onView = useCallback(
		(data: T) => {
			navigate({ to: `${baseUrl}/${data.id}` });
		},
		[navigate, baseUrl],
	);

	const onEdit = useCallback(
		(data: T) => {
			navigate({ to: `${baseUrl}/${data.id}/edit` }); // Assuming standard edit route
		},
		[navigate, baseUrl],
	);

	const onDelete = useCallback(
		(data: T) => {
			onDeleteCallback?.(data);
		},
		[onDeleteCallback],
	);

	return {
		onView,
		onEdit,
		onDelete,
	};
}
