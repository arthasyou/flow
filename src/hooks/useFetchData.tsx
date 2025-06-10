import { useState, useEffect, useCallback, type ReactNode } from "react";

interface UseApiOptions {
	manual?: boolean; // 是否手动触发
}

export function useFetchData<TParams = undefined, TResult = undefined>(
	apiFn: ((params: TParams) => Promise<TResult>) | (() => Promise<TResult>),
	options: UseApiOptions = {},
) {
	const { manual = false } = options;

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<TResult | null>(null);
	const [error, setError] = useState<Error | null>(null);

	const run = useCallback(
		async (params?: TParams) => {
			setLoading(true);
			setError(null);
			try {
				// 判断 apiFn.length === 0 来决定是否传参调用
				const result =
					apiFn.length === 0
						? await (apiFn as () => Promise<TResult>)()
						: await (
								apiFn as (params: TParams | undefined) => Promise<TResult>
							)(params);
				setData(result);
				return result;
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			} catch (err: any) {
				setError(err instanceof Error ? err : new Error(String(err)));
				return Promise.reject(
					err instanceof Error ? err : new Error(String(err)),
				);
			} finally {
				setLoading(false);
			}
		},
		[apiFn],
	);

	useEffect(() => {
		if (!manual) {
			run();
		}
	}, [manual, run]);

	const Render = ({
		children,
	}: {
		children: (data: TResult | null) => ReactNode;
	}) => {
		// TODO: 需要写loading和error的组件
		if (loading) return <>Loading...</>;
		if (error) return <>Error: {error.message}</>;
		return <>{children(data)}</>;
	};

	return {
		Render,
		run, // 触发请求
	};
}
