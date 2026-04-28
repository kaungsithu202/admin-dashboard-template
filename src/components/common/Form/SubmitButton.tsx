import { LoaderCircle } from "lucide-react";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "./useAppForm";

type SubmitButtonProps = ComponentProps<typeof Button> & {
	label?: string;
};

const SubmitButton = ({
	label = "Submit",
	type,
	disabled,
	...props
}: SubmitButtonProps) => {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
			{([canSubmit, isSubmitting]) => (
				<Button
					type={type ?? "submit"}
					disabled={!canSubmit || isSubmitting || disabled}
					{...props}
				>
					{isSubmitting ? <LoaderCircle className="animate-spin" /> : label}
				</Button>
			)}
		</form.Subscribe>
	);
};

export default SubmitButton;
