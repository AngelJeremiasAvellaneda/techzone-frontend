import { apiFetch } from "@/lib/api-client";

export const getProducts = async () => {
  return await apiFetch("/items");
};
