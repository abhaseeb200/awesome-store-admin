import { useLocation } from "react-router-dom";
import { useMemo } from "react";

const useQueryParams = () => {
  const { search } = useLocation();

  return useMemo(() => {
    const params = new URLSearchParams(search);
    
    return {
      query: params.get("q") || "",
      postPerPage: params.get("postPerPage") || "10",
      offset: params.get("offset") || "0",
      category: params.get("category") || "",
    };
  }, [search]);
};

export default useQueryParams;
