import type { QueryClient } from "@tanstack/react-query";

export type OptimisticContext<T> = {
	previousQueries: [readonly unknown[], T | undefined][];
};

export type OptimisticDeleteConfig<
	T extends Record<K, { id: string }[]>,
	K extends keyof T,
> = {
	queryClient: QueryClient;
	queryKey: readonly unknown[];
	collectionKey: K;
};

export function createOptimisticDeleteByKey<
	T extends Record<K, { id: string }[]>,
	K extends keyof T,
>(config: OptimisticDeleteConfig<T, K>) {
	const { queryClient, queryKey, collectionKey } = config;

	return {
		onMutate: async (id: string) => {
			await queryClient.cancelQueries({ queryKey });

			const previousQueries = queryClient.getQueriesData<T>({ queryKey });

			queryClient.setQueriesData<T>({ queryKey }, (old) => {
				if (!old) return old;

				console.log(
					" old[collectionKey]",
					old[collectionKey],
					"old",
					old,
					"collectionKey",
					collectionKey,
				);

				return {
					...old,
					[collectionKey]: old[collectionKey].filter((item) => item.id !== id),
				};
			});

			return { previousQueries };
		},

		onError: (_err: unknown, _id: string, context?: OptimisticContext<T>) => {
			context?.previousQueries.forEach(([key, data]) => {
				queryClient.setQueryData(key, data);
			});
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey });
		},
	};
}
