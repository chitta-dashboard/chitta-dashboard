import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { getProductStructure } from "../../../components/portfolio/helper";
// import Loader from "../../../components/loader";
import { queryClient } from "../../../containers/provider";
import { Endpoints, groupBy } from "../../constants";
import { useAuthContext } from "../../context/auth";

interface IOptionalCallback {
  successCb?: (data?: any) => void;
  errorCb?: (err?: unknown) => void;
}

export const useFetch = (endpoint: Endpoints, cb?: IOptionalCallback) => {
  const result = useQuery({
    queryKey: [`${endpoint}-fetch`],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_API_KEY}/${endpoint}`);
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
      loader({ openLoader: true, loaderText: `Creating ${endpoint}` });

      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          await axios.post(`${process.env.REACT_APP_API_KEY}/${endpoint}/`, data[i]);
          await new Promise((r) => setTimeout(r, 50));
        }
        return data;
      } else {
        return axios.post(`${process.env.REACT_APP_API_KEY}/${endpoint}/`, data).then(() => data);
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
      onError: () => {
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
      loader({ openLoader: true, loaderText: `Updating ${endpoint}` });

      return axios.patch(`${process.env.REACT_APP_API_KEY}/${endpoint}/${editedData?.id}`, editedData).then(() => editedData);
    },
    {
      onSuccess: (data) => {
        const updatedData = { ...result.data, [data.id]: data };
        queryClient.setQueryData([`${endpoint}-fetch`], updatedData);
        successCallback();
      },
      onError: () => {
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
      loader({ openLoader: true, loaderText: `Deleting ${endpoint}` });

      if (Array.isArray(id)) {
        for (let i = 0; i < id.length; i++) {
          await axios.delete(`${process.env.REACT_APP_API_KEY}/${endpoint}/${id[i]}`);
          await new Promise((r) => setTimeout(r, 50));
        }
        return id;
      } else {
        return axios.delete(`${process.env.REACT_APP_API_KEY}/${endpoint}/${id}`).then(() => id);
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
        successCallback();
      },
      onError: () => {
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
        .get(`${process.env.REACT_APP_API_KEY}/${endpoint}`, {
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

export const useEditPortfolio = (endpoint: Endpoints) => {
  const { loader } = useAuthContext();
  const {
    result: { data: oldData },
  } = useFetch(endpoint);
  let successCallback: () => void;
  let errorCallback: () => void;
  let action: "changeVariantData" | "addProductData" | "deleteProductData" = "changeVariantData";

  return useMutation(
    ({ data, productId, successCb, errorCb }: { data: any; productId: string } & IOptionalCallback) => {
      // initializing vars + setting loader
      successCallback = successCb ? successCb : () => {};
      errorCallback = errorCb ? errorCb : () => {};

      // deciding action based on data
      if (oldData) {
        // will be true when trying to add variant to a product that does not exist on db,
        const isFirstVariant = oldData[productId] === undefined;
        // will be true when trying to delete the last variant,
        const isFinalVariant =
          Object.values(data)[0] === null && oldData[productId].variants.filter((id: string) => oldData[productId][id] !== null).length === 1;
        if (isFirstVariant) action = "addProductData";
        else if (isFinalVariant) action = "deleteProductData";
      }

      // Loader Function for variant CRUD operations
      const variantLoader = () => {
        const getOldProductData = oldData[productId];
        const getDataVariantId = Object.keys(data)[0];
        switch (
          ((getOldProductData[getDataVariantId] === null || getOldProductData[getDataVariantId]) !== null && data[getDataVariantId] !== null) ||
          data[getDataVariantId] === null
        ) {
          case getOldProductData[getDataVariantId] === null:
            return loader({ openLoader: true, loaderText: "Creating" });
          case getOldProductData[getDataVariantId] !== null && data[getDataVariantId] !== null:
            return loader({ openLoader: true, loaderText: "Updating" });
          case data[getDataVariantId] === null:
            return loader({ openLoader: true, loaderText: "Deleting" });
        }
      };

      switch (action) {
        // if there is no product, add it using post
        case "addProductData":
          loader({ openLoader: true, loaderText: "Creating" });
          return axios
            .post(`${process.env.REACT_APP_API_KEY}/${endpoint}/`, {
              ...getProductStructure(productId),
              ...data,
            })
            .then(() => ({ data, productId }));
        // if this is the last variant, delete the entire product data
        case "deleteProductData":
          loader({ openLoader: true, loaderText: "Deleting" });
          return axios.delete(`${process.env.REACT_APP_API_KEY}/${endpoint}/${productId}`).then(() => ({ data: null, productId }));
        // if product is already present, just change the variant data using patch
        case "changeVariantData":
          variantLoader();
          return axios.patch(`${process.env.REACT_APP_API_KEY}/${endpoint}/${productId}`, data).then(() => ({ data, productId }));
      }
    },
    {
      onSuccess: ({ data, productId }) => {
        let updatedData: any;
        switch (action) {
          case "addProductData":
            updatedData = {
              ...oldData,
              [productId]: {
                ...getProductStructure(productId),
                ...data,
              },
            };
            break;
          case "deleteProductData":
            updatedData = {
              ...oldData,
            };
            delete updatedData[productId];
            break;
          case "changeVariantData":
            updatedData = {
              ...oldData,
              [productId]: {
                ...oldData[productId],
                ...data,
              },
            };
            break;
        }

        queryClient.setQueryData([`${endpoint}-fetch`], updatedData);
        successCallback();
      },
      onError: () => {
        errorCallback();
      },
      onSettled: () => {
        loader({ openLoader: false });
      },
    },
  );
};
