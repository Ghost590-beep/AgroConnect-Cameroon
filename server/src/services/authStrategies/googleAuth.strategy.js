// src/services/authStrategies/googleAuth.strategy.js
import crypto from "crypto";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import AuthStrategy from "./authStrategy.js";
import UserRepository from "../../repositories/user.repository.js";
import EnvConfig from "../../config/env.js";
import AppError from "../../utils/AppError.js";

class GoogleAuthStrategy extends AuthStrategy {
  async authenticate({ id_token }) {
    const clientId = EnvConfig.getGoogleClientId();
    if (!clientId) {
      throw new AppError("Google sign-in is not configured on the server", 503);
    }

    const client = new OAuth2Client(clientId);

    let payload;
    try {
      // verifyIdToken checks signature, issuer, expiry, AND audience
      // (the audience check is what the previous implementation was
      // missing — it fetched GOOGLE_CLIENT_ID but never compared it).
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: clientId,
      });
      payload = ticket.getPayload();
    } catch (error) {
      throw new AppError("Invalid Google token", 401);
    }

    if (!payload.email_verified) {
      throw new AppError("Google account email is not verified", 401);
    }

    let user = await UserRepository.findByEmail(payload.email);
    if (!user) {
      const randomPassword = crypto.randomBytes(32).toString("hex");
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      user = await UserRepository.create({
        full_name: payload.name || payload.email.split("@")[0],
        email: payload.email,
        password: hashedPassword,
        phone: null,
        location: payload.locale || "Cameroon",
        profile_image: payload.picture || null,
      });
    }

    return user;
  }
}

export default new GoogleAuthStrategy();
