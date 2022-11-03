import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { queryClient } from "../../../containers/provider";
import { Endpoints, groupBy } from "../../constants";

export const useFetch = (endpoint: Endpoints) => {
  const result = useQuery({
    queryKey: [`${endpoint}-fetch`],
    queryFn: () => {
      console.log(`[${endpoint}-fetch] request executed`);
      return fetch(`http://localhost:5001/${endpoint}`).then((res) => res.json());
    },
    cacheTime: Infinity, // do not change!
    staleTime: Infinity, // do not change!
  });

  const [formatChangeSuccess, setformatChangeSucess] = useState<boolean>(result.isFetched);

  useEffect(() => {
    if (result.isFetched && Array.isArray(result.data)) {
      queryClient.setQueryData([`${endpoint}-fetch`], groupBy(result.data, "id"));
      setformatChangeSucess(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isFetched]);

  return { formatChangeSuccess, result };
};

export const useAdd = (endpoint: Endpoints) => {
  const { result } = useFetch(endpoint);
  let successCallback: () => void;

  return useMutation(
    ({ data, successCb }: { data: object; successCb?: () => void }) => {
      successCallback = successCb ? successCb : () => {};
      return axios.post(`http://localhost:5001/${endpoint}/`, data);
    },
    {
      onSuccess: (data) => {
        const updatedData = { ...result.data, [data.data.id]: data.data };
        queryClient.setQueryData([`${endpoint}-fetch`], updatedData);
        successCallback();
      },
    },
  );
};

export const useEdit = (endpoint: Endpoints) => {
  const { result } = useFetch(endpoint);
  let successCallback: () => void;

  return useMutation(
    ({ editedData, successCb }: { editedData: any; successCb?: () => void }) => {
      successCallback = successCb ? successCb : () => {};
      return axios.patch(`http://localhost:5001/${endpoint}/${editedData?.id}`, editedData);
    },
    {
      onSuccess: (data) => {
        const updatedData = { ...result.data, [data.data.id]: data.data };
        queryClient.setQueryData([`${endpoint}-fetch`], updatedData);
        successCallback();
      },
    },
  );
};

export const useDelete = (endpoint: Endpoints) => {
  const { result } = useFetch(endpoint);
  let deleteId: string;
  let successCallback: () => void;

  return useMutation(
    ({ id, successCb }: { id: string; successCb?: () => void }) => {
      deleteId = id;
      successCallback = successCb ? successCb : () => {};
      return axios.delete(`http://localhost:5001/${endpoint}/${id}`);
    },
    {
      onSuccess: (data) => {
        let updatedData = { ...result.data };
        delete updatedData[deleteId];
        queryClient.setQueryData([`${endpoint}-fetch`], updatedData);
        successCallback();
      },
    },
  );
};
