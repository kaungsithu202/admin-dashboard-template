import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import FieldInfo from "@/components/common/Form/FieldInfo";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useFieldContext } from "./useAppForm";

type ComboboxFieldProps = {
	label: string;
	description?: string;
	options: { label: string; value: string }[];
	placeholder?: string;
	searchPlaceholder?: string;
	emptyText?: string;
	multiple?: boolean;
};

export default function ComboboxField({
	label,
	description,
	options,
	placeholder = "Select an option",
	searchPlaceholder = "Search...",
	emptyText = "No option found.",
	multiple = false,
}: ComboboxFieldProps) {
	const [open, setOpen] = useState(false);
	const field = useFieldContext<string | string[]>();
	const value = field.state.value;
	const selectedValue = typeof value === "string" ? value : "";
	const selectedValues = Array.isArray(value) ? value : [];
	const selectedOption = options.find(
		(option) => option.value === selectedValue,
	);
	const selectedOptions = options.filter((option) =>
		selectedValues.includes(option.value),
	);
	const selectedValuesText = selectedOptions
		.map((option) => option.label)
		.join(", ");
	const triggerLabel = multiple
		? selectedOptions.length > 0
			? selectedOptions.length === 1
				? selectedOptions[0].label
				: `${selectedOptions.length} selected`
			: placeholder
		: selectedOption
			? selectedOption.label
			: placeholder;

	return (
		<Field className="w-full">
			<FieldLabel>
				{label}
				{multiple ? (
					<span className="text-xs font-normal text-muted-foreground">
						(Multi-select)
					</span>
				) : null}
			</FieldLabel>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-full justify-between"
					>
						<span className="truncate">{triggerLabel}</span>
						<ChevronsUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
					<Command>
						<CommandInput placeholder={searchPlaceholder} />
						<CommandList>
							<CommandEmpty>{emptyText}</CommandEmpty>
							<CommandGroup>
								{options.map((option) => (
									<CommandItem
										key={option.value}
										value={`${option.label} ${option.value}`}
										onSelect={() => {
											if (multiple) {
												const nextValues = selectedValues.includes(option.value)
													? selectedValues.filter(
															(value) => value !== option.value,
														)
													: [...selectedValues, option.value];

												field.handleChange(nextValues);
												return;
											}

											field.handleChange(
												option.value === selectedValue ? "" : option.value,
											);
											setOpen(false);
										}}
									>
										{option.label}
										<CheckIcon
											className={cn(
												"ml-auto size-4",
												multiple
													? selectedValues.includes(option.value)
														? "opacity-100"
														: "opacity-0"
													: selectedValue === option.value
														? "opacity-100"
														: "opacity-0",
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			{multiple && selectedOptions.length > 0 ? (
				<FieldDescription>{selectedValuesText}</FieldDescription>
			) : null}
			{description && <FieldDescription>{description}</FieldDescription>}
			<FieldInfo />
		</Field>
	);
}
