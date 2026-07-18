// src/dto/UserDTO.js

/**
 * UserDTO
 * - Centralizes the one non-trivial construction rule for users:
 *   never let a password hash leave this process in an API response.
 */
class UserDTO {
  static toPublic(row) {
    if (!row) return null;
    const { password, ...rest } = row;
    return rest;
  }
}

export default UserDTO;
