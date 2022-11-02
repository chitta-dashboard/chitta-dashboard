import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { queryClient } from "../../../containers/provider";
import { groupBy } from "../../constants";

export const useFetchResolutions = () => {
  const [formatChangeSuccess, setformatChangeSucess] = useState(false);

  const result = useQuery({
    queryKey: ["resolutions-fetch"],
    queryFn: () => {
      console.log("[resolutions-fetch] request executed");
      return fetch("http://localhost:5001/resolutions").then((res) => res.json());
    },
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (result.data !== undefined && result.isFetching) {
      queryClient.setQueryData(["resolutions-fetch"], groupBy(result.data, "id"));
      setformatChangeSucess(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isFetching]);

  return { formatChangeSuccess, result };
};
useFetchResolutions.queryKey = ["resolutions-fetch"];
