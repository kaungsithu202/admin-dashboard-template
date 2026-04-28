import { Loader } from "lucide-react";

const DataLoading = () => {
	return (
		<div className="w-full min-h-[90vh] flex items-center justify-center animate-spin">
			<Loader />
		</div>
	);
};

export default DataLoading;
