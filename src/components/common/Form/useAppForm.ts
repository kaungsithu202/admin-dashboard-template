import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import CheckBoxField from "./CheckBoxField";
import ComboboxField from "./ComboboxField";
import ImageFieldInput from "./ImageFieldInput";
import SelectField from "./SelectField";
import SubmitButton from "./SubmitButton";
import TagInputField from "./TagInputField";
import TextField from "./TextField";
import TextFieldArea from "./TextFieldArea";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		TextField,
		TextFieldArea,
		TagInputField,
		ImageFieldInput,
		CheckBoxField,
		SelectField,
		ComboboxField,
	},
	formComponents: { SubmitButton },
});
