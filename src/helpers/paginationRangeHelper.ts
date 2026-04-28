type PaginationItem = number | "ellipsis";

export function getPaginationRange({
	currentPage,
	totalPages,
	siblingCount = 1,
}: {
	currentPage: number;
	totalPages: number;
	siblingCount?: number;
}): PaginationItem[] {
	const range: PaginationItem[] = [];

	const startPages = [1];
	const endPages = [totalPages];

	const leftSibling = Math.max(currentPage - siblingCount, 2);
	const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);

	range.push(...startPages);

	if (leftSibling > 2) {
		range.push("ellipsis");
	}

	for (let i = leftSibling; i <= rightSibling; i++) {
		range.push(i);
	}

	if (rightSibling < totalPages - 1) {
		range.push("ellipsis");
	}

	if (totalPages > 1) {
		range.push(...endPages);
	}

	return range;
}
