import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
// import Loader from "../../../components/loader";
import { queryClient } from "../../../containers/provider";
import { Endpoints, groupBy } from "../../constants";
import { useAuthContext } from "../../context/auth";

export const useFetch = (endpoint: Endpoints) => {
  const result = useQuery({
    queryKey: [`${endpoint}-fetch`],
    queryFn: () => {
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
  const { loader } = useAuthContext();
  const { result } = useFetch(endpoint);
  let successCallback: () => void;

  return useMutation(
    async ({ data, successCb }: { data: any; successCb?: () => void }) => {
      successCallback = successCb ? successCb : () => {};
      loader({ openLoader: true, loaderText: "Creating" });
      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          await axios.post(`http://localhost:5001/${endpoint}/`, data[i]);
        }
        return data;
      } else {
        return axios.post(`http://localhost:5001/${endpoint}/`, data).then(() => data);
      }
    },
    {
      onSuccess: (data) => {
        let updatedData;
        if (Array.isArray(data)) {
          updatedData = { ...result.data, ...groupBy(data, "id") };
        } else {
          updatedData = { ...result.data, [data.id]: data };
        }
        queryClient.setQueryData([`${endpoint}-fetch`], updatedData);
        successCallback();
      },
      onSettled: () => {
        loader({ openLoader: false });
      },
    },
  );
};

export const useEdit = (endpoint: Endpoints) => {
  const { loader } = useAuthContext();
  const { result } = useFetch(endpoint);
  let successCallback: () => void;

  return useMutation(
    ({ editedData, successCb }: { editedData: any; successCb?: () => void }) => {
      loader({ openLoader: true, loaderText: "Updating" });

      successCallback = successCb ? successCb : () => {};
      return axios.patch(`http://localhost:5001/${endpoint}/${editedData?.id}`, editedData);
    },
    {
      onSuccess: (data) => {
        const updatedData = { ...result.data, [data.data.id]: data.data };
        queryClient.setQueryData([`${endpoint}-fetch`], updatedData);
        successCallback();
      },
      onSettled: () => {
        loader({ openLoader: false });
      },
    },
  );
};

export const useDelete = (endpoint: Endpoints) => {
  const { loader } = useAuthContext();
  const { result } = useFetch(endpoint);

  return useMutation(
    async ({ id, successCb }: { id: string | Array<string>; successCb?: () => void }) => {
      loader({ openLoader: true, loaderText: "Deleting" });

      if (Array.isArray(id)) {
        for (let i = 0; i < id.length; i++) {
          await axios.delete(`http://localhost:5001/${endpoint}/${id[i]}`);
        }
        return { deleteId: id, successCb };
      } else {
        return axios.delete(`http://localhost:5001/${endpoint}/${id}`).then((res) => ({ deleteId: id, successCb }));
      }
    },
    {
      onSuccess: ({ deleteId, successCb }) => {
        let updatedData = { ...result.data };
        delete updatedData[deleteId as string];

        if (Array.isArray(deleteId)) {
          deleteId.forEach((id) => delete updatedData[id]);
        } else {
          delete updatedData[deleteId];
        }

        queryClient.setQueryData([`${endpoint}-fetch`], updatedData);
        successCb && successCb();
      },
      onSettled: () => {
        loader({ openLoader: false });
      },
    },
  );
};

export const useFetchByPage = (endpoint: Endpoints, page: number) => {
  const result = useQuery({
    queryKey: [`${endpoint}-fetch-${page}`],
    queryFn: () => {
      return axios
        .get(`http://localhost:5001/${endpoint}`, {
          params: {
            _page: page,
            _limit: 10,
          },
        })
        .then((res) => res.data);
    },
    cacheTime: Infinity, // do not change!
    staleTime: Infinity, // do not change!
  });

  const [formatChangeSuccess, setformatChangeSucess] = useState<boolean>(result.isFetched);
  useEffect(() => {
    if (Array.isArray(result.data)) {
      queryClient.setQueryData([`${endpoint}-fetch-${page}`], groupBy(result.data, "id"));
      setformatChangeSucess(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isFetched]);
  return { formatChangeSuccess, result };
};
