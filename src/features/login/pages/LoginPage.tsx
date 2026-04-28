import { Monitor, Moon, Sun } from "lucide-react";
import LazyImage from "@/components/common/LazyImage";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/features/login/components/LoginForm";
import { useTheme } from "@/hooks/use-theme";

const LoginPage = () => {
	const { theme, resolvedTheme, toggleTheme } = useTheme();

	const ThemeIcon =
		theme === "system" ? Monitor : theme === "dark" ? Moon : Sun;

	const currentThemeLabel =
		theme === "system"
			? `System (${resolvedTheme === "dark" ? "Dark" : "Light"})`
			: theme === "dark"
				? "Dark"
				: "Light";

	const nextThemeLabel =
		theme === "dark" ? "Light" : theme === "light" ? "System" : "Dark";

	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex items-center justify-between gap-2">
					<img
						src="/aura.png"
						alt="AURA logo"
						className="h-14 w-14 rounded-xl object-contain"
					/>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						onClick={toggleTheme}
						className="rounded-full border border-border/70 bg-background/50"
						aria-label={`Switch to ${nextThemeLabel.toLowerCase()} mode`}
						title={`Theme: ${currentThemeLabel}`}
					>
						<ThemeIcon />
					</Button>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<LoginForm />
					</div>
				</div>
			</div>
			<div className="bg-muted relative hidden lg:block">
				<LazyImage
					src="/images/login/bgImage.jpg"
					placeholderSrc="/images/login/bgImageLoader.jpg"
					alt="Login Background"
					className="absolute inset-0 h-full w-full object-cover"
				/>
				<div className="absolute inset-0 bg-black/20" />
			</div>
		</div>
	);
};

export default LoginPage;
