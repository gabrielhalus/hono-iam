import argon2 from "argon2";

/**
 * Hash a plaintext password using Argon2id.
 * @param password The plaintext password to hash.
 * @returns A promise that resolves to the hashed password string.
 */
export const hashPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16, // 64 MB
    timeCost: 3,
    parallelism: 1,
  });
};

/**
 * Verify a plaintext password against a hash.
 * @param hash The hash to verify against.
 * @param password The plaintext password to verify.
 * @returns A promise that resolves to true if the password matches the hash, false otherwise.
 */
export const verifyPassword = async (hash: string, password: string): Promise<boolean> => {
  return argon2.verify(hash, password);
};
