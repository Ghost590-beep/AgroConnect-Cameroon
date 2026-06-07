import { useEffect, useState, useCallback } from "react";
import { API_BASE } from "../utils/constants";
import type { User } from "../types/User";
import type { Product } from "../types/Product";

import {
  getProfile,
  getUserStats,
  getUserProducts,
  getUserOrders,
} from "../services/userService";

import { useAuth } from "../context/AuthContext";

/* ─── TYPES ─── */
interface Order {
  id: number;
  product_name: string;
  quantity: number;
  unit: string;
  total_amount: number;
  status: "delivered" | "processing" | "cancelled" | "pending";
  created_at: string;
}

interface Stats {
  products_listed: number;
  orders_completed: number;
  rating: number;
  total_earnings: number;
}

export const useProfile = () => {
  const { token, user: authUser, updateUser } = useAuth();

  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<Stats>({
    products_listed: 0,
    orders_completed: 0,
    rating: 0,
    total_earnings: 0,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState<string>("");

  /* ─── FETCH PROFILE ─── */
  const fetchProfile = useCallback(async () => {
    // ✅ FIX: if no token, stop loading instead of hanging forever
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const [userRes, statsRes, productsRes, ordersRes] =
        await Promise.allSettled([
          getProfile(token),
          getUserStats(token),
          getUserProducts(token),
          getUserOrders(token),
        ]);

      /* USER */
      if (userRes.status === "fulfilled") {
        const u: User = userRes.value;
        setUser(u);
        setTimeout(() => updateUser(u), 0);

        if (u.profile_image) {
           setAvatar(`${u.profile_image}?t=${Date.now()}`);
        }
      } else if (authUser) {
        // Fallback to auth context user if fetch fails
        setUser(authUser);
        if (authUser.profile_image) {
            setAvatar(authUser.profile_image);
        }
      }

      /* STATS */
      if (statsRes.status === "fulfilled") setStats(statsRes.value);

      /* PRODUCTS */
      if (productsRes.status === "fulfilled") setProducts(productsRes.value);

      /* ORDERS */
      if (ordersRes.status === "fulfilled") setOrders(ordersRes.value);

    } catch (err) {
      console.error("Profile fetch error:", err);
    } finally {
      // ✅ Always runs — loading never gets stuck
      setLoading(false);
    }
  }, [token]);  // ✅ FIX: removed authUser & updateUser from deps to prevent re-fetch loop

  /* ─── INIT ─── */
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  /* ─── UPDATE AVATAR AFTER UPLOAD ─── */
  // ✅ FIX: accepts either a full URL or a relative path
  const updateAvatar = (pathOrUrl: string) => {
    const url = pathOrUrl.startsWith("http") || pathOrUrl.startsWith("data:")
      ? pathOrUrl
      : `${API_BASE}${pathOrUrl}?t=${Date.now()}`;
    setAvatar(url);
  };

  return {
    user,
    setUser,
    stats,
    products,
    orders,
    loading,
    avatar,
    setAvatar,
    updateAvatar,
    refreshProfile: fetchProfile,
  };
};