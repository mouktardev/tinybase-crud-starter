import { useSetPartialValuesCallback } from "@/schema";
import { useEffect, useState } from "react";
import { LuMoon, LuSunMedium } from "react-icons/lu";
import { Button } from "./ui/Button";

export default function ThemeToggle() {
	const [isDark, setIsDark] = useState(() => {
		if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
			return localStorage.getItem("theme") === "dark" ? true : false;
		}
		if (
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			return true;
		}
		return false;
	});

	const toggleTheme = useSetPartialValuesCallback(
		() => ({
			isThemeDark: !isDark,
		}),
		[isDark],
		undefined,
		() => setIsDark(!isDark)
	);

	useEffect(() => {
		const root = document.body;
		if (isDark) {
			root.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			root.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [isDark]);

	return (
		<Button
			type="button"
			variant={"outline"}
			onClick={toggleTheme}
		>
			{isDark ? (
				<LuMoon size={23} strokeWidth={1} />
			) : (
				<LuSunMedium size={23} strokeWidth={1} />
			)}
		</Button>
	);
}
