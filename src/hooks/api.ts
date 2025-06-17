import { useEffect, useState } from "react";
import type { Ship } from "../types";

const BASE_URL = "https://vortex.korabli.su/api/graphql/glossary/";

export const useShipsData = () => {
	const [ships, setShips] = useState<Ship[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchShips = async () => {
			try {
				const response = await fetch(BASE_URL, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						query: `
              query Vehicles($languageCode: String = "ru") {
                vehicles(lang: $languageCode) {
                  title
                  description 
                  icons {
                    large
                    medium
                  }
                  level
                  type {
                    name
                    title
                    icons {
                      default
                    }
                  }
                  nation {
                    name
                    title
                    color
                    icons {
                      small
                      medium
                      large
                    }
                  }
                }
              }
            `,
						variables: { languageCode: "ru" },
					}),
				});

				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}

				const data = await response.json();
				setShips(data.data.vehicles);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Unknown error occurred");
			} finally {
				setLoading(false);
			}
		};

		fetchShips();
	}, []);

	return { ships, loading, error };
};
