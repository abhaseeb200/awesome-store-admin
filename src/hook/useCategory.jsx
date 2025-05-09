import API from "@/config/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import useDebounce from "@/hook/useDebounce";

function useCategory(enabled = true) {
  const queryClient = useQueryClient();
  const [sorting, setSorting] = useState([{}]);
  const [searchValue, setSearchValue] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const debouncedSearch = useDebounce(searchValue, 500);

  const categoriesFetch = useQuery({
    queryKey: ["categories", sorting, debouncedSearch, pagination],
    enabled: enabled,
    queryFn: async () => {
      const sort = sorting[0];
      const sortBy = sort?.id ? `&sortBy=${sort?.id}` : "";
      const sortOrder = sort?.id ? `&sortOrder=${sort?.desc ? "desc" : "asc"}` : "";

      const response = await API.get(`categories?page=${pagination?.pageIndex + 1}${sortBy}${sortOrder}&q=${debouncedSearch}`);
      return response?.data || [];
    },
  });

  const createMutation = useMutation({
    mutationFn: (data) => {
      return API.post("/categories/add", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category added successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => {
      return API.put(`/categories/update/${data?.id}`, data?.value);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Updated successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (data) => {
      await API.delete(`categories/delete/${data?._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Delete successfully");
    },
    onError: () => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  return {
    categoriesFetch,
    createMutation,
    updateMutation,
    deleteMutation,
    sorting,
    searchValue,
    pagination,
    setSorting,
    setSearchValue,
    setPagination,
  };
}

export default useCategory;
