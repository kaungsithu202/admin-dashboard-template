import { useCallback, useEffect, useState } from "react";

const THEME_STORAGE_KEY = "aura-theme";
const DARK_THEME_COLOR = "#070d1a";
const LIGHT_THEME_COLOR = "#f5f7ff";

export type ThemeMode = "light" | "dark" | "system";

type ResolvedTheme = "light" | "dark";

const THEME_MODE_ORDER: ThemeMode[] = ["dark", "light", "system"];

const isThemeMode = (value: string | null): value is ThemeMode =>
	value === "light" || value === "dark" || value === "system";

const getSystemTheme = (): ResolvedTheme => {
	if (typeof window === "undefined") {
		return "dark";
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
};

const resolveTheme = (theme: ThemeMode): ResolvedTheme =>
	theme === "system" ? getSystemTheme() : theme;

const getNextThemeMode = (theme: ThemeMode): ThemeMode => {
	const currentIndex = THEME_MODE_ORDER.indexOf(theme);
	const nextIndex = (currentIndex + 1) % THEME_MODE_ORDER.length;

	return THEME_MODE_ORDER[nextIndex] ?? "dark";
};

const getDefaultTheme = (): ThemeMode => {
	if (typeof window === "undefined") {
		return "dark";
	}

	let storedTheme: string | null = null;

	try {
		storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
	} catch {
		return "dark";
	}

	if (isThemeMode(storedTheme)) {
		return storedTheme;
	}

	return "dark";
};

const applyTheme = (resolvedTheme: ResolvedTheme) => {
	if (typeof document === "undefined") {
		return;
	}

	const root = document.documentElement;
	root.classList.toggle("dark", resolvedTheme === "dark");
	root.style.colorScheme = resolvedTheme;

	const themeColorMeta = document.querySelector<HTMLMetaElement>(
		'meta[name="theme-color"]',
	);

	if (themeColorMeta) {
		themeColorMeta.setAttribute(
			"content",
			resolvedTheme === "dark" ? DARK_THEME_COLOR : LIGHT_THEME_COLOR,
		);
	}
};

export const useTheme = () => {
	const [theme, setTheme] = useState<ThemeMode>(() => getDefaultTheme());
	const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
		resolveTheme(getDefaultTheme()),
	);

	useEffect(() => {
		const nextResolvedTheme = resolveTheme(theme);
		setResolvedTheme(nextResolvedTheme);
		applyTheme(nextResolvedTheme);

		try {
			window.localStorage.setItem(THEME_STORAGE_KEY, theme);
		} catch {}
	}, [theme]);

	useEffect(() => {
		if (theme !== "system" || typeof window === "undefined") {
			return;
		}

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleThemeChange = (event: MediaQueryListEvent) => {
			const nextResolvedTheme: ResolvedTheme = event.matches ? "dark" : "light";
			setResolvedTheme(nextResolvedTheme);
			applyTheme(nextResolvedTheme);
		};

		if (typeof mediaQuery.addEventListener === "function") {
			mediaQuery.addEventListener("change", handleThemeChange);

			return () => {
				mediaQuery.removeEventListener("change", handleThemeChange);
			};
		}

		mediaQuery.addListener(handleThemeChange);

		return () => {
			mediaQuery.removeListener(handleThemeChange);
		};
	}, [theme]);

	const toggleTheme = useCallback(() => {
		setTheme((prevTheme) => getNextThemeMode(prevTheme));
	}, []);

	return {
		theme,
		resolvedTheme,
		isDark: resolvedTheme === "dark",
		setTheme,
		toggleTheme,
	};
};
