import type { TextareaHTMLAttributes } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import FieldInfo from "./FieldInfo";
import { useFieldContext } from "./useAppForm";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
}

const TextFieldArea = ({ label, ...props }: Props) => {
	const field = useFieldContext<string>();
	return (
		<Field>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<Textarea
				id={field.name}
				name={field.name}
				{...props}
				value={field.state.value}
				onChange={(e) => field.handleChange(e.target.value)}
			/>
			<FieldInfo />
		</Field>
	);
};

export default TextFieldArea;
