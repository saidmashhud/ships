import { Search, Globe, Shield, X } from "lucide-react";
import { FilterDropdown } from "./filter-dropdown";
import type { FilterOptions, Filters } from "../types";
import { useCallback } from "react";

interface HeaderProps {
	filters: Filters;
	setFilters: (filters: Filters) => void;
	filterOptions: FilterOptions;
}

export const Header = ({ filters, setFilters, filterOptions }: HeaderProps) => {
	const clearFilters = useCallback(() => {
		setFilters({
			level: null,
			nation: "",
			type: "",
			search: "",
		});
	}, []);

	const hasActiveFilters =
		filters.level !== null || filters.nation || filters.type || filters.search;

	return (
		<header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-20 backdrop-blur-sm bg-opacity-90">
			<div className="container mx-auto px-4 py-6">
				<div className="flex flex-wrap gap-4">
					<div className="relative flex-1 min-w-[200px]">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
						<input
							type="text"
							placeholder="Поиск по названию..."
							value={filters.search}
							onChange={(e) =>
								setFilters({ ...filters, search: e.target.value })
							}
							className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
						/>
					</div>

					<FilterDropdown
						label="Все уровни"
						value={filters.level}
						options={filterOptions.levels}
						onChange={(value) =>
							setFilters({ ...filters, level: value as number | null })
						}
						icon={<span className="text-yellow-400">★</span>}
					/>

					<FilterDropdown
						label="Все нации"
						value={filters.nation}
						options={filterOptions.nations}
						onChange={(value) =>
							setFilters({ ...filters, nation: value as string })
						}
						icon={<Globe className="w-4 h-4" />}
					/>

					<FilterDropdown
						label="Все классы"
						value={filters.type}
						options={filterOptions.types}
						onChange={(value) =>
							setFilters({ ...filters, type: value as string })
						}
						icon={<Shield className="w-4 h-4" />}
					/>

					{hasActiveFilters && (
						<button
							onClick={clearFilters}
							className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2"
						>
							<X className="w-4 h-4" />
							Сбросить
						</button>
					)}
				</div>
			</div>
		</header>
	);
};
