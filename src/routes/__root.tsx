import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Link,
	Outlet,
} from "@tanstack/react-router";
import { NuqsAdapter } from "nuqs/adapters/tanstack-router";
import { Toaster } from "sonner";

const RootComponent = () => {
	return (
		<>
			<HeadContent />
			<NuqsAdapter>
				<Outlet />
			</NuqsAdapter>
			<Toaster />
		</>
	);
};

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: RootComponent,
	head: () => ({
		meta: [
			{
				name: "description",
				content: "AURA Admin Dashboard - Manage your administration tasks",
			},
			{
				title: "AURA Admin Dashboard",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1.0",
			},
			{
				property: "og:title",
				content: "AURA Admin Dashboard",
			},
			{
				property: "og:description",
				content: "AURA Admin Dashboard - Manage your administration tasks",
			},
			{
				property: "og:type",
				content: "website",
			},
		],
		links: [
			{
				rel: "icon",
				href: "/aura.png",
			},
		],
	}),
	notFoundComponent: () => {
		return (
			<div>
				<p>This is the notFoundComponent configured on root route</p>
				<Link to="/">Start Over</Link>
			</div>
		);
	},
});
