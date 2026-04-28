import { Building2, Globe, Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { User } from "../../types";

type UserDetailProps = {
	data: User;
};

export function UserDetail({ data }: UserDetailProps) {
	return (
		<div className="grid gap-6">
			<Card className="overflow-hidden border-border/70 py-0 shadow-sm">
				<div className="relative isolate overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-background px-6 py-10">
					<div className="pointer-events-none absolute -right-16 top-0 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />
					<div className="relative flex flex-col gap-2">
						<p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
							User Profile
						</p>
						<h2 className="text-3xl font-semibold tracking-tight">
							{data.name}
						</h2>
						<p className="text-sm text-muted-foreground">
							@{data.username}
						</p>
					</div>
				</div>
			</Card>

			<div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
				<Card className="border-border/70 shadow-sm">
					<CardContent className="grid gap-6 pt-6">
						<div className="space-y-3">
							<p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
								Contact Information
							</p>
							<div className="grid gap-4">
								<div className="flex items-center gap-3 rounded-xl border border-border/70 bg-muted/20 p-3">
									<Mail className="h-4 w-4 text-muted-foreground" />
									<div>
										<p className="text-xs text-muted-foreground">Email</p>
										<p className="text-sm font-medium">{data.email}</p>
									</div>
								</div>
								<div className="flex items-center gap-3 rounded-xl border border-border/70 bg-muted/20 p-3">
									<Phone className="h-4 w-4 text-muted-foreground" />
									<div>
										<p className="text-xs text-muted-foreground">Phone</p>
										<p className="text-sm font-medium">{data.phone}</p>
									</div>
								</div>
								<div className="flex items-center gap-3 rounded-xl border border-border/70 bg-muted/20 p-3">
									<Globe className="h-4 w-4 text-muted-foreground" />
									<div>
										<p className="text-xs text-muted-foreground">Website</p>
										<p className="text-sm font-medium">{data.website}</p>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="grid gap-6">
					<Card className="border-border/70 shadow-sm">
						<CardContent className="grid gap-4 pt-6">
							<p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
								Address
							</p>
							<div className="grid gap-3 rounded-2xl border border-border/70 bg-muted/20 p-4">
								<div className="flex items-center gap-2">
									<MapPin className="h-4 w-4 text-muted-foreground" />
									<p className="text-sm">
										{data.address?.street}, {data.address?.suite}
									</p>
								</div>
								<p className="text-sm pl-6">
									{data.address?.city}, {data.address?.zipcode}
								</p>
							</div>
						</CardContent>
					</Card>

					<Card className="border-border/70 shadow-sm">
						<CardContent className="grid gap-4 pt-6">
							<p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
								Company
							</p>
							<div className="grid gap-3 rounded-2xl border border-border/70 bg-muted/20 p-4">
								<div className="flex items-center gap-2">
									<Building2 className="h-4 w-4 text-muted-foreground" />
									<p className="text-sm font-medium">{data.company?.name}</p>
								</div>
								<p className="text-xs text-muted-foreground pl-6 italic">
									"{data.company?.catchPhrase}"
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
