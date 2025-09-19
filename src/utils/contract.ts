import { ContractData } from '@/types/contract';

export const setNestedValue = <T extends ContractData>(obj: T, path: string, value: unknown): T => {
	const keys = path.split('.');
	const result = { ...obj };
	let current: Record<string, unknown> = result as Record<string, unknown>;

	for (let i = 0; i < keys.length - 1; i++) {
		const key = keys[i];
		current[key] = { ...(current[key] as Record<string, unknown>) };
		current = current[key] as Record<string, unknown>;
	}

	const lastKey = keys[keys.length - 1];
	current[lastKey] = value;
	return result;
};
