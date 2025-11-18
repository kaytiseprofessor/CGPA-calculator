
/**
 * Generates a random alphanumeric ID.
 * Replaces deprecated substr() with substring().
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};
