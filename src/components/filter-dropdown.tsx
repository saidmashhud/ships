import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronDown, Search, X } from "lucide-react";

export const FilterDropdown: React.FC<{
	label: string;
	value: string | number | null;
	options: { value: string | number; label: string }[];
	onChange: (value: string | number | null) => void;
	icon?: React.ReactNode;
}> = ({ label, value, options, onChange, icon }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const dropdownRef = useRef<HTMLDivElement>(null);

	const filteredOptions = useMemo(() => {
		if (!searchTerm) return options;
		return options.filter((option) =>
			option.label.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [options, searchTerm]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	const selectedOption = options.find((opt) => opt.value === value);

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`flex items-center gap-2 px-4 py-2 bg-gray-800 border rounded-lg hover:bg-gray-700 transition-all duration-200 min-w-[150px] ${
					value !== null && value !== ""
						? "border-blue-500 bg-gray-700"
						: "border-gray-700"
				}`}
			>
				{icon}
				<span className="flex-1 text-left">
					{selectedOption ? selectedOption.label : label}
				</span>
				{value !== null && value !== "" && (
					<X
						className="w-4 h-4 hover:text-red-400 transition-colors"
						onClick={(e) => {
							e.stopPropagation();
							onChange(null);
							setSearchTerm("");
						}}
					/>
				)}
				<ChevronDown
					className={`w-4 h-4 transition-transform ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>

			{isOpen && (
				<div className="absolute z-10 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
					<div className="p-2 border-b border-gray-700">
						<div className="relative">
							<Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
							<input
								type="text"
								placeholder="Поиск..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-8 pr-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm focus:outline-none focus:border-blue-500"
								onClick={(e) => e.stopPropagation()}
							/>
						</div>
					</div>

					<div className="max-h-60 overflow-y-auto">
						<button
							onClick={() => {
								onChange(null);
								setIsOpen(false);
								setSearchTerm("");
							}}
							className="w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors"
						>
							{label}
						</button>
						{filteredOptions.length > 0 ? (
							filteredOptions.map((option) => (
								<button
									key={option.value}
									onClick={() => {
										onChange(option.value);
										setIsOpen(false);
										setSearchTerm("");
									}}
									className={`w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors ${
										value === option.value ? "bg-gray-700 text-blue-400" : ""
									}`}
								>
									{option.label}
								</button>
							))
						) : (
							<div className="px-4 py-2 text-gray-500 text-sm">
								Ничего не найдено
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
