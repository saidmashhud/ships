import { Loader2 } from "lucide-react";

export const LoadingMessage = () => {
	return (
		<div className="min-h-screen bg-gray-900 flex items-center justify-center">
			<div className="text-center">
				<Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
				<p className="text-gray-400">Загрузка кораблей...</p>
			</div>
		</div>
	);
};
