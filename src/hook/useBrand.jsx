import API from "@/config/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import useDebounce from "@/hook/useDebounce";

function useBrand(isSelectQuery) {
  const queryClient = useQueryClient();
  const [sorting, setSorting] = useState([{}]);
  const [searchValue, setSearchValue] = useState("");
  const [brandsSelect, setBrandsSelect] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const debouncedSearch = useDebounce(searchValue, 500);

  const brandsFetch = useQuery({
    queryKey: ["brands", sorting, debouncedSearch, pagination],
    enabled: !isSelectQuery, // USE CASE: IF FALSE NOT FETCH API, DEFAULT => TRUE
    queryFn: async () => {
      try {
        const sort = sorting[0];
        const sortBy = sort?.id ? `&sortBy=${sort?.id}` : "";
        const sortOrder = sort?.id
          ? `&sortOrder=${sort?.desc ? "desc" : "asc"}`
          : "";

        const response = await API.get(
          `brands?page=${
            pagination?.pageIndex + 1
          }${sortBy}${sortOrder}&q=${debouncedSearch}`
        );
        return response?.data || [];
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    },
  });

  const selectQuery = useQuery({
  queryKey: ["brands-select", pagination, debouncedSearch],
  enabled: isSelectQuery, 
  queryFn: async () => {
    const response = await API.get(`brands?page=${pagination?.pageIndex + 1}&q=${debouncedSearch}`);
    let responseData = response?.data?.data;
    let updated = [];
    
    if (searchValue) {
      updated = [...responseData];
    } else {
      updated = pagination?.pageIndex == 0 ? [...responseData] : [...brandsSelect,...responseData]
    }

    setBrandsSelect(updated)
    return response?.data || [];
  },
  })

  const createMutation = useMutation({
    mutationFn: (data) => {
      return API.post("/brands/add", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      toast.success("Added successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => {
      return API.put(`/brands/update/${data?.id}`, data?.value);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      toast.success("Updated successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (data) => {
      await API.delete(`brands/delete/${data?._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      toast.success("Delete successfully");
    },
    onError: () => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  return {
    brandsFetch,
    createMutation,
    updateMutation,
    deleteMutation,
    sorting,
    searchValue,
    pagination,
    selectQuery,
    brandsSelect,
    setSorting,
    setSearchValue,
    setPagination,
  };
}

export default useBrand;
