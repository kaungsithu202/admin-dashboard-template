import type { ChangeEvent, InputHTMLAttributes } from "react";
import FieldInfo from "@/components/common/Form/FieldInfo";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "./useAppForm";

type Props<T> = {
	label: string;
	description?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

function TextField<T extends string | number = string>({
	label,
	description,
	onChange,
	...inputProps
}: Props<T>) {
	const field = useFieldContext<T>();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		let value: T | string = e.target.value as any;

		if (inputProps.type === "number") {
			value =
				e.target.value === "" ? ("" as any) : (Number(e.target.value) as T);
		}

		field.handleChange(value as T);
		onChange?.(e);
	};

	return (
		<Field>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<Input
				id={field.name}
				name={field.name}
				value={field.state.value as any}
				onChange={handleChange}
				{...inputProps}
			/>
			{description && (
				<FieldDescription>{description}</FieldDescription>
			)}
			<FieldInfo />
		</Field>
	);
}

export default TextField;
