import { fetcher } from "@/lib/fetcher";

export class AuthService {
  static async login(data: { identifier: string; password: string }) {
    return await fetcher({
      url: `${import.meta.env.VITE_API_URL}/api/auth/login`,
      method: "POST",
      data,
    });
  }

  static async register(data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) {
    return await fetcher({
      url: `${import.meta.env.VITE_API_URL}/api/auth/register`,
      method: "POST",
      data,
    });
  }

  static async logout() {
    return await fetcher({
      url: `${import.meta.env.VITE_API_URL}/api/auth/logout`,
      method: "GET",
    });
  }
}
