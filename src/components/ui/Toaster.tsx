import { useValue } from "@/schema";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
	const isDark = useValue("isThemeDark");
	return <Sonner theme={isDark ? "dark" : "light"} {...props} />;
};

export { Toaster };
