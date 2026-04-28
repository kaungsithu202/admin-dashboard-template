import { Link, useLocation } from "@tanstack/react-router";
import {
	LogOut,
	Monitor,
	Moon,
	Sun,
	Users,
} from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/lib/auth-context";

export function AppSidebar() {
	const { user, logout } = useAuth();
	const { theme, resolvedTheme, toggleTheme } = useTheme();
	const { pathname } = useLocation();

	const ThemeIcon =
		theme === "system" ? Monitor : theme === "dark" ? Moon : Sun;

	const themeLabel =
		theme === "system"
			? `System (${resolvedTheme === "dark" ? "Dark" : "Light"})`
			: theme === "dark"
				? "Dark"
				: "Light";

	return (
		<Sidebar>
			<SidebarHeader>
				<div className="flex items-center gap-2 px-2">
					<div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-border/70 bg-card">
						<img
							src="/aura.png"
							alt="Admin Dashboard logo"
							className="h-full w-full object-contain"
						/>
					</div>
					<div className="flex flex-col gap-0.5">
						<span className="text-sm font-semibold">Admin</span>
						<span className="text-xs text-muted-foreground">
							Dashboard Template
						</span>
					</div>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									isActive={pathname.startsWith("/users")}
								>
									<Link
										to="/users"
										search={{
											page: 1,
											pageSize: 10,
										}}
									>
										<Users />
										<span>Users</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Account</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<div className="flex items-center gap-2">
										<Users />
										<span>{user?.name || "User"}</span>
									</div>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton onClick={toggleTheme}>
							<ThemeIcon />
							<span>{`Theme: ${themeLabel}`}</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<SidebarMenuButton>
									<LogOut />
									<span>Logout</span>
								</SidebarMenuButton>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Log out?</AlertDialogTitle>
									<AlertDialogDescription>
										You will be signed out and redirected to the login screen.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction onClick={logout}>
										Log out
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
