import { createContext, useContext, useEffect, useState } from "react";
import { authStorage, type StoredUser } from "./auth-storage";
import type { LoginResponse } from "@/features/types";

interface AuthContextType {
	user: StoredUser | null;
	isAuthenticated: boolean;
	login: (data: LoginResponse) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<StoredUser | null>(() =>
		authStorage.getUser(),
	);

	const login = (data: LoginResponse) => {
		authStorage.setTokens(data.access_token, data.refresh_token);
		authStorage.setUser(data.user);
		setUser(data.user);
	};

	const logout = () => {
		authStorage.clear();
		setUser(null);
		// Use window.location for logout to ensure a full reset
		window.location.href = "/";
	};

	useEffect(() => {
		// Sync user state with storage on mount
		const storedUser = authStorage.getUser();
		if (storedUser) {
			setUser(storedUser);
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: authStorage.isAuthenticated(),
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}

