import { useFieldContext } from "./useAppForm";

function FieldInfo() {
	const field = useFieldContext();
	return (
		<>
			{!field.state.meta.isValid && (
				<em className="text-red-500" role="alert">
					{field.state.meta.errors?.[0]?.message ??
						field.state.meta.errors?.[0]}
				</em>
			)}
		</>
	);
}

export default FieldInfo;
