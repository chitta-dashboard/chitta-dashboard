import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { queryClient } from "../../../containers/provider";
import { Endpoints, groupBy } from "../../constants";

export const useFetch = (endpoint: Endpoints) => {
  const [formatChangeSuccess, setformatChangeSucess] = useState(false);

  const result = useQuery({
    queryKey: [`${endpoint}-fetch`],
    queryFn: () => {
      console.log(`[${endpoint}-fetch] request executed`);
      return fetch(`http://localhost:5001/${endpoint}`).then((res) => res.json());
    },
    cacheTime: Infinity, // do not change!
    staleTime: Infinity, // do not change!
  });

  useEffect(() => {
    if (result.data !== undefined && result.isFetched) {
      queryClient.setQueryData([`${endpoint}-fetch`], groupBy(result.data, "id"));
      setformatChangeSucess(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isFetched]);

  return { formatChangeSuccess, result };
};
