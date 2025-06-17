export interface ShipIcon {
	large?: string;
	medium?: string;
}

export interface ShipType {
	name: string;
	title: string;
	icons: {
		default?: string;
	};
}

export interface Nation {
	name: string;
	title: string;
	color: string;
	icons: {
		small?: string;
		medium?: string;
		large?: string;
	};
}

export interface Ship {
	title: string;
	description: string;
	icons: ShipIcon;
	level: number;
	type: ShipType;
	nation: Nation;
}

export interface Filters {
	level: number | null;
	nation: string;
	type: string;
	search: string;
}

export interface FilterOptions {
	levels: { value: number; label: string }[];
	nations: { value: string; label: string }[];
	types: { value: string; label: string }[];
}
