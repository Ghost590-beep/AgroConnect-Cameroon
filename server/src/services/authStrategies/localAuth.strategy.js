// src/services/authStrategies/localAuth.strategy.js
import bcrypt from "bcrypt";
import AuthStrategy from "./authStrategy.js";
import UserRepository from "../../repositories/user.repository.js";
import AppError from "../../utils/AppError.js";

class LocalAuthStrategy extends AuthStrategy {
  async authenticate({ email, password }) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new AppError("Invalid credentials", 401);
    }

    return user;
  }
}

export default new LocalAuthStrategy();
