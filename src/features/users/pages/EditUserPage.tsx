import { useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import DataLoading from "@/components/common/DataLoading";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useGetUserById, useUpdateUser, type UserFormValues } from "@/features/users/api/queries";
import { UserForm } from "@/features/users/components/UserForm";
import { Route } from "@/routes/_authenticated/users/$id/edit/index";

function EditUserPage() {
	const { id } = Route.useParams();
	const router = useRouter();

	const { data: userDetail, isPending } = useGetUserById(id);
	const { mutateAsync: updateUser } = useUpdateUser(id);

	if (isPending) {
		return <DataLoading />;
	}

	return (
		<div className="container py-8">
			<div className="relative overflow-hidden rounded-2xl border border-border/70 bg-linear-to-br from-background via-muted/30 to-background p-5 sm:p-7">
				<div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
				<div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-primary/5 blur-3xl" />

				<div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
					<div className="flex items-start gap-3 sm:gap-4">
						<Button
							type="button"
							variant="outline"
							size="icon"
							className="shrink-0"
							onClick={() => router.history.back()}
						>
							<ChevronLeft className="h-5 w-5" />
						</Button>
						<div className="space-y-2">
							<p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
								Edit User
							</p>
							<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
								{userDetail?.name || "Update User"}
							</h1>
							<p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
								Update user details and save when ready.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6">
				<Card className="border-border/70 shadow-sm">
					<CardHeader>
						<CardTitle className="text-2xl tracking-tight">
							Update User Information
						</CardTitle>
						<CardDescription>
							Edit the fields you want to change.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<UserForm
							mode="edit"
							data={userDetail}
							onMutate={(values: UserFormValues) => updateUser(values)}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export default EditUserPage;
