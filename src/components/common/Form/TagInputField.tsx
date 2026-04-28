import { X } from "lucide-react";
import { type KeyboardEvent, useState } from "react";
import FieldInfo from "@/components/common/Form/FieldInfo";
import { Badge } from "@/components/ui/badge";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useFieldContext } from "./useAppForm";

type TagInputFieldProps = {
	label: string;
	description?: string;
	placeholder?: string;
};

export default function TagInputField({
	label,
	description,
	placeholder = "Type and press Enter",
}: TagInputFieldProps) {
	const field = useFieldContext<string[]>();
	const [inputValue, setInputValue] = useState("");
	const tags = Array.isArray(field.state.value) ? field.state.value : [];

	const hasTag = (candidate: string): boolean =>
		tags.some((tag) => tag.toLowerCase() === candidate.toLowerCase());

	const addTag = (rawValue: string): boolean => {
		const normalizedValue = rawValue.trim();

		if (normalizedValue === "" || hasTag(normalizedValue)) {
			return false;
		}

		field.handleChange([...tags, normalizedValue]);
		return true;
	};

	const commitInputValue = () => {
		if (addTag(inputValue) || inputValue.trim() === "") {
			setInputValue("");
		}
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" || event.key === ",") {
			event.preventDefault();
			commitInputValue();
			return;
		}

		if (event.key === "Backspace" && inputValue === "" && tags.length > 0) {
			event.preventDefault();
			field.handleChange(tags.slice(0, -1));
		}
	};

	return (
		<Field>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<Input
				id={field.name}
				name={field.name}
				value={inputValue}
				onChange={(event) => setInputValue(event.target.value)}
				onKeyDown={handleKeyDown}
				onBlur={() => {
					commitInputValue();
					field.handleBlur();
				}}
				placeholder={placeholder}
			/>
			{tags.length > 0 ? (
				<div className="flex flex-wrap gap-2">
					{tags.map((tag, index) => (
						<Badge key={tag} variant="secondary" className="gap-1 py-1">
							<span className="max-w-52 truncate">{tag}</span>
							<button
								type="button"
								className={cn(
									"inline-flex size-4 items-center justify-center rounded-full",
									"text-muted-foreground hover:bg-background/70 hover:text-foreground",
									"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								)}
								onClick={() => {
									field.handleChange(
										tags.filter((_, tagIndex) => tagIndex !== index),
									);
								}}
								aria-label={`Remove ${tag}`}
							>
								<X className="size-3" />
							</button>
						</Badge>
					))}
				</div>
			) : null}
			{description && <FieldDescription>{description}</FieldDescription>}
			<FieldInfo />
		</Field>
	);
}
