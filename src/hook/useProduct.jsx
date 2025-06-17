import API from "@/config/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import useDebounce from "@/hook/useDebounce";

function useProduct() {
  const queryClient = useQueryClient();
  const [sorting, setSorting] = useState([{}]);
  const [searchValue, setSearchValue] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const debouncedSearch = useDebounce(searchValue, 500);

  const productFetch = useQuery({
    queryKey: ["products", sorting, debouncedSearch, pagination],
    queryFn: async () => {
      try {
        const sort = sorting[0];
        const sortBy = sort?.id ? `&sortBy=${sort?.id}` : "";
        const sortOrder = sort?.id
          ? `&sortOrder=${sort?.desc ? "desc" : "asc"}`
          : "";

        const response = await API.get(
          `products?page=${
            pagination?.pageIndex + 1
          }${sortBy}${sortOrder}&q=${debouncedSearch}`
        );
        return response?.data || [];
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: (data) => {
      return API.post("/products/add", data);
    },
    onSuccess: () => {
      toast.success("Added successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => {
      return API.put(`/products/update/${data?.id}`, data?.value);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Updated successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (data) => {
      await API.delete(`products/delete/${data?._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Delete successfully");
    },
    onError: () => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  return {
    productFetch,
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

export default useProduct;
