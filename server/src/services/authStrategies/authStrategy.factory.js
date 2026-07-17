// src/services/authStrategies/authStrategy.factory.js
import LocalAuthStrategy from "./localAuth.strategy.js";
import GoogleAuthStrategy from "./googleAuth.strategy.js";
import AppError from "../../utils/AppError.js";

const STRATEGIES = {
  local: LocalAuthStrategy,
  google: GoogleAuthStrategy,
};

/**
 * AuthStrategyFactory (Factory Method)
 * - AuthService selects among interchangeable strategy instances by
 *   name instead of hardcoding `new` calls at each of its call sites.
 */
class AuthStrategyFactory {
  forProvider(name) {
    const strategy = STRATEGIES[name];
    if (!strategy) {
      throw new AppError(`Unknown auth provider: ${name}`, 500);
    }
    return strategy;
  }
}

export default new AuthStrategyFactory();
