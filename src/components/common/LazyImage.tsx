import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { cn } from "@/lib/utils";
interface Props {
	alt: string;
	height?: number;
	src: string;
	width?: number;
	placeholderSrc?: string;
	className?: string;
}

const LazyImage = ({
	alt,
	height,
	src,
	width,
	placeholderSrc,
	className,
}: Props) => {
	return (
		<LazyLoadImage
			alt={alt}
			width={width}
			height={height}
			wrapperClassName={cn("w-full h-full", className)}
			className="h-full w-full object-cover"
			src={src}
			effect="blur"
			placeholderSrc={placeholderSrc}
		/>
	);
};

export default LazyImage;
