import { createFileRoute } from "@tanstack/react-router";
import CreateUserPage from "@/features/users/pages/CreateUserPage";

export const Route = createFileRoute("/_authenticated/users/create")({
	component: CreateUserPage,
});
