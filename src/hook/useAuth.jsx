import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    initialData: JSON.parse(localStorage.getItem("auth")) || null,
  });
};
