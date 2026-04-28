import { Link } from "@tanstack/react-router";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	type OnChangeFn,
	type PaginationState,
	useReactTable,
} from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { type ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getPaginationRange } from "@/helpers/paginationRangeHelper";
import type { PaginationData } from "@/types";
import SearchInput from "../SearchInput";

interface DataTableProps<TData extends { id: string }, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[] | undefined;
	paginationData: PaginationData | undefined;
	isPending: boolean;
	createLink: string;
}

export function DataTable<TData extends { id: string }, TValue>({
	columns,
	data,
	paginationData,
	createLink,
}: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = useState({});

	const [pageSize, setPageSize] = useQueryState(
		"pageSize",
		parseAsInteger.withDefault(10),
	);
	const [search, setSearch] = useQueryState("q", {
		defaultValue: "",
	});

	const [pageNumber, setPageNumber] = useQueryState(
		"page",
		parseAsInteger.withDefault(1),
	);

	const pagination = {
		pageIndex: pageNumber - 1,
		pageSize,
	};

	const handlePaginationChange: OnChangeFn<PaginationState> = (updater) => {
		const next = typeof updater === "function" ? updater(pagination) : updater;

		setPageNumber(next.pageIndex + 1);
		setPageSize(next.pageSize);
	};

	const table = useReactTable({
		data: data ?? [],
		columns,
		rowCount: paginationData?.total,
		getRowId: (row) => row.id,
		onRowSelectionChange: setRowSelection,
		getCoreRowModel: getCoreRowModel(),
		enableRowSelection: true,
		state: {
			pagination,
			rowSelection,
		},
		onPaginationChange: handlePaginationChange,
		manualPagination: true,
		debugTable: true,
	});

	const totalPages = table.getPageCount();
	const currentPage = table.getState().pagination.pageIndex + 1;

	const paginationRange = getPaginationRange({
		currentPage,
		totalPages,
		siblingCount: 0,
	});

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	return (
		<div className="grid w-10/12 gap-5">
			<div className="flex items-center justify-between">
				<SearchInput value={search} onChange={handleSearch} />
				<Button asChild variant="default">
					<Link to={createLink}>
						<Plus /> Create
					</Link>
				</Button>
			</div>

			<div className="overflow-x-auto rounded-md border ">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>

				<div className="p-3 flex items-center justify-between">
					<Select
						value={table.getState().pagination.pageSize.toString()}
						onValueChange={(value) => {
							table.setPageSize(Number(value));
						}}
					>
						<SelectTrigger className="w-20">
							<SelectValue placeholder="Page Size" />
						</SelectTrigger>
						<SelectContent>
							{["10", "20", "30", "40", "50"].map((pageSize) => (
								<SelectItem key={pageSize} value={pageSize}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									onClick={(e) => {
										e.preventDefault();
										table.previousPage();
									}}
									className={
										!table.getCanPreviousPage()
											? "pointer-events-none opacity-50"
											: ""
									}
									href="#"
								/>
							</PaginationItem>

							{paginationRange.map((item, index) => {
								if (item === "ellipsis") {
									return (
										<PaginationItem
											key={`ellipsis-${
												// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
												index
											}`}
										>
											<PaginationEllipsis />
										</PaginationItem>
									);
								}

								return (
									<PaginationItem key={item}>
										<PaginationLink
											href="#"
											isActive={item === currentPage}
											onClick={(e) => {
												e.preventDefault();
												table.setPageIndex(item - 1);
											}}
										>
											{item}
										</PaginationLink>
									</PaginationItem>
								);
							})}

							<PaginationItem>
								<PaginationNext
									onClick={(e) => {
										e.preventDefault();
										table.nextPage();
									}}
									className={
										!table.getCanNextPage()
											? "pointer-events-none opacity-50"
											: ""
									}
									href="#"
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</div>
	);
}
