// src/controllers/auth.controller.js
import AuthService from "../services/auth.service.js";
import response from "../utils/response.js";

/**
 * AuthController
 * - SRP: exposes auth endpoints only.
 * - OOP: organizes each route handler as a class method.
 */
class AuthController {
  async register(req, res, next) {
    try {
      const { full_name, email, password, phone, location } = req.body;
      const result = await AuthService.register({
        full_name,
        email,
        password,
        phone,
        location,
      });
      return response.success(res, result, "User registered successfully", 201);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login({ email, password });
      return response.success(res, result, "Login successful");
    } catch (error) {
      next(error);
    }
  }

  async googleAuth(req, res, next) {
    try {
      const { id_token } = req.body;
      const result = await AuthService.loginWithGoogle({ id_token });
      return response.success(res, result, "Google sign-in successful");
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
