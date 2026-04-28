import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useAppForm } from "@/components/common/Form/useAppForm";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/features/queries";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
	email: z.email("Invalid email address"),
	password: z.string().min(1, "Password is required"),
});

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	const { mutateAsync: login } = useLogin();
	const { login: authLogin } = useAuth();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onSubmit: loginSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				const data = await login({
					email: value.email,
					password: value.password,
				});
				toast.success("Login successful!", {
					description: `Welcome back, ${data.user.name}!`,
				});
				authLogin(data);
				navigate({ to: "/dashboard" });
			} catch (error: unknown) {
				const errorMessage =
					error instanceof Error
						? error.message
						: "Login failed. Please try again.";
				toast.error("Login failed", {
					description: errorMessage,
				});
			}
		},
	});

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
			<FieldGroup>
				<div className="flex flex-col items-center gap-1 text-center">
					<h1 className="text-2xl font-bold">Login to your account</h1>
					<p className="text-muted-foreground text-sm text-balance">
						Enter any email and password to continue (mock login)
					</p>
				</div>
				<form.AppField name="email">
					{(field) => (
						<field.TextField
							label="Email"
							type="email"
							placeholder="m@example.com"
							autoComplete="email"
							inputMode="email"
							autoCapitalize="none"
							autoCorrect="off"
							spellCheck={false}
						/>
					)}
				</form.AppField>
				<form.AppField name="password">
					{(field) => {
						return (
							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor={field.name}>Password</FieldLabel>
								</div>
								<div className="relative">
									<Input
										id={field.name}
										name={field.name}
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										type={showPassword ? "text" : "password"}
										className="pr-10"
										autoComplete="current-password"
									/>
									<button
										type="button"
										onClick={togglePasswordVisibility}
										aria-label={
											showPassword ? "Hide password" : "Show password"
										}
										aria-pressed={showPassword}
										className="text-muted-foreground hover:text-foreground absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 transition-colors"
									>
										{showPassword ? (
											<EyeOff className="h-4 w-4" />
										) : (
											<Eye className="h-4 w-4" />
										)}
									</button>
								</div>
							</Field>
						);
					}}
				</form.AppField>
				<form.AppForm>
					<form.SubmitButton label="Login" />
				</form.AppForm>
			</FieldGroup>
		</form>
	);
}
