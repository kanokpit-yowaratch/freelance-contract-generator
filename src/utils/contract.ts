import { z } from 'zod';
import { contractSchema } from '@/utils/schemas/contract-schema';
import { ContractData } from '@/types/contract';

export const validateContractData = (data: unknown) => {
  return contractSchema.safeParse(data);
};

export const getFieldError = (
  errors: z.ZodError | undefined,
  fieldName: string
): string | undefined => {
  if (!errors) return undefined;

  const fieldError = errors.issues.find(issue =>
    issue.path.join('.') === fieldName
  );

  return fieldError?.message;
};

export const getNestedPath = (fieldName: string): string[] => {
  return fieldName.split('.');
};

export const setNestedValue = <T extends ContractData>(
  obj: T,
  path: string,
  value: unknown
): T => {
  const keys = path.split('.');
  const result = { ...obj };
  let current: Record<string, unknown> = result as Record<string, unknown>;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = { ...current[key] as Record<string, unknown> };
    current = current[key] as Record<string, unknown>;
  }

  const lastKey = keys[keys.length - 1];
  current[lastKey] = value;
  return result;
};
