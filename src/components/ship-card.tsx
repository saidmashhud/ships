import { useEffect, useRef, useState } from "react";
import type { Ship } from "../types";
import { Ship as ShipIcon, Globe, Shield } from "lucide-react";

export const ShipCard: React.FC<{ ship: Ship }> = ({ ship }) => {
	const [imageError, setImageError] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const cardRef = useRef<HTMLDivElement>(null);
	const shipImage = ship.icons.large || ship.icons.medium;

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);

		if (cardRef.current) {
			observer.observe(cardRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={cardRef}
			className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-700"
		>
			<div className="aspect-video relative overflow-hidden bg-gray-900">
				{isVisible && shipImage && !imageError ? (
					<img
						src={shipImage}
						alt={ship.title}
						onError={() => setImageError(true)}
						loading="lazy"
						className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
						<ShipIcon className="w-16 h-16 text-gray-600" />
					</div>
				)}

				<div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
					<span className="text-yellow-400 font-bold">Ур. {ship.level}</span>
				</div>

				<div
					className="absolute top-2 left-2 w-8 h-8 rounded-full shadow-lg"
					style={{ backgroundColor: ship.nation.color }}
				/>
			</div>

			<div className="p-4">
				<h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
					{ship.title}
				</h3>

				<div className="flex gap-4 mb-3 text-sm">
					<div className="flex items-center gap-1">
						<Globe className="w-4 h-4 text-gray-400" />
						<span className="text-gray-300">{ship.nation.title}</span>
					</div>
					<div className="flex items-center gap-1">
						<Shield className="w-4 h-4 text-gray-400" />
						<span className="text-gray-300">{ship.type.title}</span>
					</div>
				</div>

				<p className="text-gray-400 text-sm line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
					{ship.description || "Описание отсутствует"}
				</p>
			</div>
		</div>
	);
};
