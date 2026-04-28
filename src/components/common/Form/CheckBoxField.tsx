import FieldInfo from "@/components/common/Form/FieldInfo";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { useFieldContext } from "./useAppForm";

type Props = {
	label: string;
};

const CheckBoxField = ({ label }: Props) => {
	const field = useFieldContext<boolean>();

	const handleChange = (checked: boolean | "indeterminate") => {
		field.handleChange(checked === true);
	};

	return (
		<Field orientation="horizontal">
			<div className="flex items-center gap-2">
				<Checkbox
					id={field.name}
					checked={field.state.value}
					onCheckedChange={handleChange}
				/>
				<FieldLabel htmlFor={field.name} className="cursor-pointer">
					{label}
				</FieldLabel>
			</div>
			<FieldInfo />
		</Field>
	);
};

export default CheckBoxField;
