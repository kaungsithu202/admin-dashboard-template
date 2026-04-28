import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard")({
	component: Dashboard,
});

function Dashboard() {
	return (
		<div className="container py-8">
			<div className="relative overflow-hidden rounded-2xl border border-border/70 bg-linear-to-br from-background via-muted/30 to-background p-5 sm:p-7">
				<div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
				<div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-primary/5 blur-3xl" />

				<div className="relative space-y-2">
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
						Dashboard
					</p>
					<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
						Admin Dashboard Template
					</h1>
					<p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
						A clean CRUD admin template powered by React, TanStack Router, TanStack Query, TanStack Form, and JSONPlaceholder API.
					</p>
				</div>
			</div>
		</div>
	);
}
