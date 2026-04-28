import { useRouter } from "@tanstack/react-router";
import { Building2, Layers3, MapPin, Sparkles } from "lucide-react";
import { type ComponentProps, useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useAppForm } from "@/components/common/Form/useAppForm";
import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import type { User } from "../../types";
import type { UserFormValues } from "../../api/queries";

const userSchema = z.object({
	name: z.string().min(1, "Name is required"),
	username: z.string().min(1, "Username is required"),
	email: z.string().email("Invalid email address"),
	phone: z.string().min(1, "Phone is required"),
	website: z.string(),
	street: z.string().min(1, "Street is required"),
	suite: z.string(),
	city: z.string().min(1, "City is required"),
	zipcode: z.string().min(1, "Zipcode is required"),
	companyName: z.string().min(1, "Company name is required"),
	catchPhrase: z.string(),
	bs: z.string(),
});

type UserFormProps = {
	mode: "create" | "edit";
	data?: User;
	onMutate: (data: UserFormValues) => Promise<unknown>;
};

const getErrorMessage = (error: unknown): string => {
	if (
		typeof error === "object" &&
		error !== null &&
		"message" in error &&
		typeof (error as { message?: unknown }).message === "string"
	) {
		return (error as { message: string }).message;
	}
	return "An error occurred";
};

export function UserForm({
	className,
	data,
	onMutate,
	mode,
	...props
}: ComponentProps<"form"> & UserFormProps) {
	const router = useRouter();
	const onBack = () => router.history.back();

	const form = useAppForm({
		defaultValues: {
			name: "",
			username: "",
			email: "",
			phone: "",
			website: "",
			street: "",
			suite: "",
			city: "",
			zipcode: "",
			companyName: "",
			catchPhrase: "",
			bs: "",
		} as UserFormValues,
		validators: {
			onSubmit: userSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				await onMutate(value);
				toast.success(
					mode === "edit" ? "User updated successfully" : "User created successfully",
				);
				onBack();
			} catch (error: unknown) {
				toast.error(getErrorMessage(error));
			}
		},
	});

	useEffect(() => {
		if (mode === "edit" && data) {
			form.reset({
				name: data.name,
				username: data.username,
				email: data.email,
				phone: data.phone,
				website: data.website ?? "",
				street: data.address?.street ?? "",
				suite: data.address?.suite ?? "",
				city: data.address?.city ?? "",
				zipcode: data.address?.zipcode ?? "",
				companyName: data.company?.name ?? "",
				catchPhrase: data.company?.catchPhrase ?? "",
				bs: data.company?.bs ?? "",
			});
		}
	}, [mode, data, form.reset]);

	const submitLabel = mode === "edit" ? "Save Changes" : "Create User";

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className={cn("flex flex-col gap-6", className)}
			{...props}
		>
			<FieldGroup className="gap-6">
				{mode === "edit" && (
					<div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/15 p-2 text-primary">
								<Sparkles className="h-4 w-4" />
							</div>
							<div className="space-y-1">
								<p className="text-sm font-semibold">Update Mode Active</p>
								<p className="text-xs text-muted-foreground sm:text-sm">
									Only changed fields will be submitted.
								</p>
							</div>
						</div>
					</div>
				)}

				<section className="relative overflow-hidden rounded-2xl border border-border/70 bg-background/80 p-5 sm:p-6">
					<div className="pointer-events-none absolute -right-16 top-0 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />
					<div className="relative grid gap-5">
						<div className="space-y-2">
							<div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
								<Layers3 className="h-3.5 w-3.5" />
								Basic Info
							</div>
							<p className="text-sm text-muted-foreground">
								Define the user identity and contact details.
							</p>
						</div>

						<div className="grid gap-5 md:grid-cols-2">
							<form.AppField name="name">
								{(field) => (
									<field.TextField label="Name" placeholder="John Doe" />
								)}
							</form.AppField>

							<form.AppField name="username">
								{(field) => (
									<field.TextField label="Username" placeholder="johndoe" />
								)}
							</form.AppField>
						</div>

						<div className="grid gap-5 md:grid-cols-2">
							<form.AppField name="email">
								{(field) => (
									<field.TextField
										label="Email"
										type="email"
										placeholder="john@example.com"
									/>
								)}
							</form.AppField>

							<form.AppField name="phone">
								{(field) => (
									<field.TextField label="Phone" placeholder="1-770-736-8031" />
								)}
							</form.AppField>
						</div>

						<form.AppField name="website">
							{(field) => (
								<field.TextField
									label="Website"
									placeholder="https://example.com"
								/>
							)}
						</form.AppField>
					</div>
				</section>

				<section className="grid gap-5 rounded-2xl border border-border/70 bg-muted/20 p-5 sm:p-6">
					<div className="space-y-2">
						<div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
							<MapPin className="h-3.5 w-3.5" />
							Address
						</div>
						<p className="text-sm text-muted-foreground">
							User location details.
						</p>
					</div>

					<div className="grid gap-5 md:grid-cols-2">
						<form.AppField name="street">
							{(field) => (
								<field.TextField label="Street" placeholder="Kulas Light" />
							)}
						</form.AppField>

						<form.AppField name="suite">
							{(field) => (
								<field.TextField label="Suite" placeholder="Apt. 556" />
							)}
						</form.AppField>
					</div>

					<div className="grid gap-5 md:grid-cols-2">
						<form.AppField name="city">
							{(field) => (
								<field.TextField label="City" placeholder="Gwenborough" />
							)}
						</form.AppField>

						<form.AppField name="zipcode">
							{(field) => (
								<field.TextField label="Zipcode" placeholder="92998-3874" />
							)}
						</form.AppField>
					</div>
				</section>

				<section className="grid gap-5 rounded-2xl border border-border/70 bg-background/80 p-5 sm:p-6">
					<div className="space-y-2">
						<div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
							<Building2 className="h-3.5 w-3.5" />
							Company
						</div>
						<p className="text-sm text-muted-foreground">
							Company information for this user.
						</p>
					</div>

					<form.AppField name="companyName">
						{(field) => (
							<field.TextField
								label="Company Name"
								placeholder="Romaguera-Crona"
							/>
						)}
					</form.AppField>

					<form.AppField name="catchPhrase">
						{(field) => (
							<field.TextField
								label="Catch Phrase"
								placeholder="Multi-layered client-server neural-net"
							/>
						)}
					</form.AppField>

					<form.AppField name="bs">
						{(field) => (
							<field.TextField
								label="Business"
								placeholder="harness real-time e-markets"
							/>
						)}
					</form.AppField>
				</section>

				<div className="flex flex-col gap-3 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
					<p className="text-xs text-muted-foreground sm:text-sm">
						{mode === "edit"
							? "Modify the fields above and save when ready."
							: "Fill in the details above to create a new user."}
					</p>
					<form.AppForm>
						<form.SubmitButton
							className="w-full sm:w-auto"
							label={submitLabel}
						/>
					</form.AppForm>
				</div>
			</FieldGroup>
		</form>
	);
}
