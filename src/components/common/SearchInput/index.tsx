import type { ChangeEvent } from "react";
import IconSearch from "@/components/animated-icons/IconSearch";
import { Input } from "@/components/ui/input";

type Props = {
	value: string | undefined;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput = ({ value, onChange }: Props) => {
	return (
		<div className="relative w-xs">
			<IconSearch
				className="absolute inset-y-0 left-2 text-gray-500"
				size={20}
			/>
			<Input
				className="pl-8  "
				placeholder="Search ..."
				value={value}
				onChange={onChange}
				type="search"
				aria-label="Search"
			/>
		</div>
	);
};

export default SearchInput;
