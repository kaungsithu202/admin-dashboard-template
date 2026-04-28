import { useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useCreateUser, type UserFormValues } from "@/features/users/api/queries";
import { UserForm } from "@/features/users/components/UserForm";

function CreateUserPage() {
	const { mutateAsync: createUser } = useCreateUser();
	const router = useRouter();

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
								Create User
							</p>
							<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
								Add a New User
							</h1>
							<p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
								Fill in identity, contact, address, and company details.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6">
				<Card className="border-border/70 shadow-sm">
					<CardHeader>
						<CardTitle className="text-2xl tracking-tight">
							User Information
						</CardTitle>
						<CardDescription>
							Complete the form below to create a new user entry.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<UserForm
							mode="create"
							onMutate={(values: UserFormValues) => createUser(values)}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export default CreateUserPage;
