import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useFieldContext } from "./useAppForm";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";

type SelectFieldProps = {
	label?: string;
	description?: string;
	options: { label: string; value: string }[];
	placeholder?: string;
};

export default function SelectField({
	label,
	description,
	options,
	placeholder = "Select an option",
}: SelectFieldProps) {
	const field = useFieldContext();

	return (
		<Field className="w-full">
			{label && <FieldLabel>{label}</FieldLabel>}
			<Select
				onValueChange={(value) => field.handleChange(value)}
				value={field.state.value as string}
			>
				<SelectTrigger className="w-full">
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{description && <FieldDescription>{description}</FieldDescription>}
		</Field>
	);
}
