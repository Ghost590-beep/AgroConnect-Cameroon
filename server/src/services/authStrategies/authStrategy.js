// src/services/authStrategies/authStrategy.js

/**
 * AuthStrategy (abstract)
 * - Real problem this solves: login and Google sign-in both end in
 *   "resolve a credential to a user row," differing only in how the
 *   credential is verified. AuthService depends on this interface,
 *   not on either concrete strategy.
 */
export default class AuthStrategy {
  /**
   * @param {object} payload - provider-specific credential payload
   * @returns {Promise<object>} the resolved user row
   */
  async authenticate(payload) {
    throw new Error("Method 'authenticate' must be implemented by subclass");
  }
}
