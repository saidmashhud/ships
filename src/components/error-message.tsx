import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
	error: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
	return (
		<div className="min-h-screen bg-gray-900 flex items-center justify-center">
			<div className="text-center">
				<AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
				<p className="text-gray-400">Ошибка загрузки: {error}</p>
				<p className="text-sm text-gray-500 mt-2">
					Убедитесь, что приложение запущено на localhost для обхода CORS
				</p>
			</div>
		</div>
	);
};
