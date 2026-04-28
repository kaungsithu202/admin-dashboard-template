import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { authStorage } from "@/lib/auth-storage";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: async ({ location }) => {
		const accessToken = authStorage.getAccessToken();
		if (!accessToken) {
			throw redirect({
				to: "/",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: () => (
		<SidebarProvider>
			<AppSidebar />
			<SidebarTrigger />
			<main className="w-full">
				<Outlet />
			</main>
		</SidebarProvider>
	),
});
