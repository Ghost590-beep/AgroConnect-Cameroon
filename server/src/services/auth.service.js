// src/services/auth.service.js
import bcrypt from "bcrypt";
import UserRepository from "../repositories/user.repository.js";
import AuthStrategyFactory from "./authStrategies/authStrategy.factory.js";
import TokenService from "./token.service.js";
import UserDTO from "../dto/UserDTO.js";
import AppError from "../utils/AppError.js";

const SALT_ROUNDS = 10;

/**
 * AuthService (Facade)
 * - The only thing the auth controller talks to. Hides strategy
 *   selection, password hashing, and token issuance behind three
 *   plain methods.
 */
class AuthService {
  async register({ full_name, email, password, phone, location }) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    let user;
    try {
      user = await UserRepository.create({
        full_name,
        email,
        password: hashedPassword,
        phone,
        location,
      });
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        throw new AppError("Email already registered", 409);
      }
      throw error;
    }

    return this.#issueSession(user);
  }

  async login({ email, password }) {
    const user = await AuthStrategyFactory.forProvider("local").authenticate({
      email,
      password,
    });
    return this.#issueSession(user);
  }

  async loginWithGoogle({ id_token }) {
    const user = await AuthStrategyFactory.forProvider("google").authenticate({
      id_token,
    });
    return this.#issueSession(user);
  }

  #issueSession(user) {
    return {
      token: TokenService.issue(user),
      user: UserDTO.toPublic(user),
    };
  }
}

export default new AuthService();
