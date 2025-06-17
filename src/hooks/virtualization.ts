import { useEffect, useRef, useState } from "react";

export const useVirtualization = (items: any[], itemsPerPage: number = 20) => {
	const [visibleItems, setVisibleItems] = useState<any[]>([]);
	const [page, setPage] = useState(1);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const loadMoreRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setVisibleItems(items.slice(0, itemsPerPage));
		setPage(1);
	}, [items, itemsPerPage]);

	useEffect(() => {
		if (observerRef.current) {
			observerRef.current.disconnect();
		}

		observerRef.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && visibleItems.length < items.length) {
					const nextPage = page + 1;
					const endIndex = nextPage * itemsPerPage;
					setVisibleItems(items.slice(0, endIndex));
					setPage(nextPage);
				}
			},
			{ threshold: 0.1 }
		);

		if (loadMoreRef.current) {
			observerRef.current.observe(loadMoreRef.current);
		}

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, [items, visibleItems.length, page, itemsPerPage]);

	return {
		visibleItems,
		loadMoreRef,
		hasMore: visibleItems.length < items.length,
	};
};
