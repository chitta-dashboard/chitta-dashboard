import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
// import Loader from "../../../components/loader";
import { queryClient } from "../../../containers/provider";
import { ENDPOINTS, Endpoints, groupBy } from "../../constants";
import { useAuthContext } from "../../context/auth";
import Toast from "../../toast";

interface IOptionalCallback {
  successCb?: (data?: any) => void;
  errorCb?: (err?: unknown) => void;
}

export const useFetch = (endpoint: Endpoints, cb?: IOptionalCallback) => {
  const result = useQuery({
    queryKey: [`${endpoint}-fetch`],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5001/${endpoint}`);
      if (res.status >= 200 && res.status < 400) {
        return res.json();
      }
      throw new Error(`${res.status}: ${res.statusText}`);
    },
    cacheTime: Infinity, // do not change!
    staleTime: Infinity, // do not change!
    onSuccess: (data) => {
      cb?.successCb && cb.successCb(data);
    },
    onError: (err) => {
      cb?.errorCb && cb.errorCb(err);
    },
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
  let errorCallback: () => void;

  return useMutation(
    async ({ data, successCb, errorCb }: { data: any } & IOptionalCallback) => {
      successCallback = successCb ? successCb : () => {};
      errorCallback = errorCb ? errorCb : () => {};
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
        if (endpoint !== ENDPOINTS.notification) Toast({ message: "Request successful.", type: "success" });
        successCallback();
      },
      onError: () => {
        if (endpoint !== ENDPOINTS.notification) Toast({ message: "Request failed, please try again.", type: "error" });
        errorCallback();
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
  let errorCallback: () => void;

  return useMutation(
    ({ editedData, successCb, errorCb }: { editedData: any } & IOptionalCallback) => {
      successCallback = successCb ? successCb : () => {};
      errorCallback = errorCb ? errorCb : () => {};
      loader({ openLoader: true, loaderText: "Updating" });

      return axios.patch(`http://localhost:5001/${endpoint}/${editedData?.id}`, editedData).then(() => editedData);
    },
    {
      onSuccess: (data) => {
        const updatedData = { ...result.data, [data.id]: data };
        queryClient.setQueryData([`${endpoint}-fetch`], updatedData);
        if (endpoint !== ENDPOINTS.notification) Toast({ message: "Request successful.", type: "success" });
        successCallback();
      },
      onError: () => {
        if (endpoint !== ENDPOINTS.notification) Toast({ message: "Request failed, please try again.", type: "error" });
        errorCallback();
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
  let successCallback: () => void;
  let errorCallback: () => void;

  return useMutation(
    async ({ id, successCb, errorCb }: { id: string | Array<string> } & IOptionalCallback) => {
      successCallback = successCb ? successCb : () => {};
      errorCallback = errorCb ? errorCb : () => {};
      loader({ openLoader: true, loaderText: "Deleting" });

      if (Array.isArray(id)) {
        for (let i = 0; i < id.length; i++) {
          await axios.delete(`http://localhost:5001/${endpoint}/${id[i]}`);
        }
        return id;
      } else {
        return axios.delete(`http://localhost:5001/${endpoint}/${id}`).then(() => id);
      }
    },
    {
      onSuccess: (deleteId) => {
        let updatedData = { ...result.data };
        delete updatedData[deleteId as string];

        if (Array.isArray(deleteId)) {
          deleteId.forEach((id) => delete updatedData[id]);
        } else {
          delete updatedData[deleteId];
        }

        queryClient.setQueryData([`${endpoint}-fetch`], updatedData);
        if (endpoint !== ENDPOINTS.notification) Toast({ message: "Request successful.", type: "success" });
        successCallback();
      },
      onError: () => {
        if (endpoint !== ENDPOINTS.notification) Toast({ message: "Request failed, please try again.", type: "error" });
        errorCallback();
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
