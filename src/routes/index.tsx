import { createFileRoute, redirect } from "@tanstack/react-router";
import LoginPage from "@/features/login/pages/LoginPage";
import { authStorage } from "@/lib/auth-storage";

export const Route = createFileRoute("/")({
	beforeLoad: async () => {
		if (authStorage.isAuthenticated()) {
			throw redirect({ to: "/dashboard" });
		}
	},
	component: LoginPage,
});
