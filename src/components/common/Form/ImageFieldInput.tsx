import { CloudUpload, Trash } from "lucide-react";
import type { RefObject } from "react";
import { toast } from "sonner";
import FieldInfo from "@/components/common/Form/FieldInfo";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MAX_FILE_SIZE } from "@/lib/validations";
import { useFieldContext } from "./useAppForm";

type Props = {
	imageSrc: string | undefined;
	label: string;
	ref: RefObject<HTMLInputElement | null>;
};

const ImageFieldInput = ({ imageSrc, label, ref }: Props) => {
	const field = useFieldContext();
	return (
		<Field>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>

			{imageSrc ? (
				<div className="relative overflow-hidden rounded-xl border border-border/70 bg-muted/20">
					<img
						src={imageSrc}
						width={656}
						height={151}
						alt={label}
						className="h-44 w-full object-cover object-start"
					/>
					<div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent px-3 py-2">
						<p className="text-xs font-medium text-white">Current {label}</p>
					</div>
					<Button
						aria-label={`Remove ${label}`}
						onClick={() => field.handleChange(null)}
						type="button"
						size="icon"
						variant="secondary"
						className="absolute right-3 top-3"
					>
						<Trash />
					</Button>
				</div>
			) : (
				<>
					<button
						type="button"
						onClick={() => ref.current?.click()}
						aria-label={`Upload ${label}`}
						className="group flex h-44 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/70 bg-muted/20 px-4 text-center transition-colors hover:border-primary/50 hover:bg-primary/5"
					>
						<CloudUpload className="size-9 text-muted-foreground transition-transform group-hover:scale-105 group-hover:text-primary" />
						<p className="text-sm font-medium text-foreground">
							Upload {label}
						</p>
						<p className="text-xs text-muted-foreground">
							PNG, JPG, WEBP up to 500KB
						</p>
					</button>
					<Input
						ref={ref}
						id={field.name}
						name={field.name}
						hidden
						type="file"
						accept="image/*"
						onChange={(e) => {
							const file = e.target.files?.[0];
							if (file) {
								// Check file size (max 500KB)
								if (file.size > MAX_FILE_SIZE) {
									toast.error("File too large", {
										description: `${label} must be less than 500KB`,
									});
									return;
								}
								field.handleChange(file);
							}
						}}
					/>
				</>
			)}
			<FieldInfo />
		</Field>
	);
};

export default ImageFieldInput;
