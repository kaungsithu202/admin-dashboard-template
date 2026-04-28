import { useRouter } from "@tanstack/react-router";
import { ChevronLeft, Edit } from "lucide-react";
import DataLoading from "@/components/common/DataLoading";
import { Button } from "@/components/ui/button";
import { useGetUserById } from "@/features/users/api/queries";
import { UserDetail } from "@/features/users/components/UserDetail";
import { Route } from "@/routes/_authenticated/users/$id/index";

function UserDetailPage() {
	const { id } = Route.useParams();
	const { data, isPending } = useGetUserById(id);
	const navigate = useRouter().navigate;

	if (isPending) {
		return <DataLoading />;
	}

	if (!data) {
		return (
			<div className="flex h-100 items-center justify-center">
				<p className="font-medium text-muted-foreground">User not found</p>
			</div>
		);
	}

	return (
		<div className="container py-8">
			<div className="relative mb-8 overflow-hidden rounded-2xl border border-border/70 bg-linear-to-br from-background via-muted/30 to-background p-5 sm:p-7">
				<div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
				<div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-primary/5 blur-3xl" />

				<div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
					<div className="flex items-start gap-3 sm:gap-4">
						<Button
							variant="outline"
							size="icon"
							className="shrink-0"
							onClick={() => window.history.back()}
						>
							<ChevronLeft className="h-5 w-5" />
						</Button>
						<div className="space-y-2">
							<p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
								User Details
							</p>
							<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
								{data.name}
							</h1>
							<p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
								View contact information, address, and company details.
							</p>
						</div>
					</div>

					<Button
						className="w-fit"
						onClick={() =>
							navigate({
								to: "/users/$id/edit",
								params: { id: String(data.id) },
							})
						}
					>
						<Edit className="mr-2 h-4 w-4" /> Edit User
					</Button>
				</div>
			</div>

			<UserDetail data={data} />
		</div>
	);
}

export default UserDetailPage;
