import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import UsersPage from "@/features/users/pages/UsersPage";

export const Route = createFileRoute("/_authenticated/users/")({
	component: UsersPage,
	validateSearch: z.object({
		q: z.string().optional(),
		page: z.number().catch(1),
		pageSize: z.number().catch(10),
	}),
});
