import bcrypt from 'bcryptjs';

/**
 * Generate hash password
 *
 * @param password  Plain text password. Can get in user interface
 * @returns {Promise<string>} return a hash on plain text password
 */
export async function hashed(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

/**
 * Compare plain text password with hash password
 *
 * @param password Plain text password. Can get in user interface
 * @param hash Hash the password. Can get in database
 * @returns {Promise<boolean>} return `true` if match
 */
export async function compare(data: { password: string; hash: string }): Promise<boolean> {
  const isMatch = await bcrypt.compare(data.password, data.hash);
  return isMatch;
}
