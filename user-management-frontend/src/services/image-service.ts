import { fetcher } from "@/lib/fetcher";

export class ImageService {
  static async getImages(params: { page?: number; pageSize?: number }) {
    return await fetcher({
      url: `${import.meta.env.VITE_API_URL}/api/images/get-images`,
      method: "GET",
      params,
    });
  }
}
