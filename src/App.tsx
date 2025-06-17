import React, { useState, useMemo } from "react";
import { Loader2, Ship as ShipIcon } from "lucide-react";
import type { Filters } from "./types";
import { useVirtualization } from "./hooks/virtualization";
import { ShipCard } from "./components/ship-card";
import { Header } from "./components/header";
import { useShipsData } from "./hooks/api";
import { ErrorMessage } from "./components/error-message";
import { LoadingMessage } from "./components/loading-message";

const App: React.FC = () => {
	const { ships, loading, error } = useShipsData();
	const [filters, setFilters] = useState<Filters>({
		level: null,
		nation: "",
		type: "",
		search: "",
	});

	const filterOptions = useMemo(() => {
		const levels = [...new Set(ships.map((ship) => ship.level))].sort(
			(a, b) => a - b
		);
		const nations = [...new Set(ships.map((ship) => ship.nation.name))];
		const types = [...new Set(ships.map((ship) => ship.type.name))];

		return {
			levels: levels.map((level) => ({
				value: level,
				label: `Уровень ${level}`,
			})),
			nations: nations.map((nation) => {
				const nationData = ships.find((s) => s.nation.name === nation)?.nation;
				return { value: nation, label: nationData?.title || nation };
			}),
			types: types.map((type) => {
				const typeData = ships.find((s) => s.type.name === type)?.type;
				return { value: type, label: typeData?.title || type };
			}),
		};
	}, [ships]);

	const filteredShips = useMemo(() => {
		return ships.filter((ship) => {
			if (filters.level !== null && ship.level !== filters.level) return false;
			if (filters.nation && ship.nation.name !== filters.nation) return false;
			if (filters.type && ship.type.name !== filters.type) return false;
			if (
				filters.search &&
				!ship.title.toLowerCase().includes(filters.search.toLowerCase())
			)
				return false;
			return true;
		});
	}, [ships, filters]);

	const { visibleItems, loadMoreRef, hasMore } = useVirtualization(
		filteredShips,
		20
	);

	if (loading) {
		return <LoadingMessage />;
	}

	if (error) {
		return <ErrorMessage error={error} />;
	}

	return (
		<div className="min-h-screen bg-gray-900 text-white">
			<Header
				filters={filters}
				setFilters={setFilters}
				filterOptions={filterOptions}
			/>

			<main className="container mx-auto px-4 py-8">
				<div className="flex justify-between items-center mb-6">
					<p className="text-gray-400">
						Найдено кораблей:{" "}
						<span className="text-white font-bold">{filteredShips.length}</span>
						{visibleItems.length < filteredShips.length && (
							<span className="text-sm ml-2">
								(показано: {visibleItems.length})
							</span>
						)}
					</p>
				</div>

				{filteredShips.length === 0 ? (
					<div className="text-center py-16">
						<ShipIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
						<p className="text-gray-400">Корабли не найдены</p>
						<p className="text-sm text-gray-500 mt-2">
							Попробуйте изменить параметры фильтрации
						</p>
					</div>
				) : (
					<>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{visibleItems.map((ship, index) => (
								<ShipCard key={`${ship.title}-${index}`} ship={ship} />
							))}
						</div>

						{hasMore && (
							<div
								ref={loadMoreRef}
								className="flex justify-center items-center py-8"
							>
								<Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
								<span className="ml-2 text-gray-400">Загрузка кораблей...</span>
							</div>
						)}
					</>
				)}
			</main>
		</div>
	);
};

export default App;
