import { loader } from "./../utils/context/auth";
import { base64Encode, decryptCrypto } from "./../utils/helpers/index";
import axios from "axios";
import { IAddFarmersDetailsFormInput } from "../components/modals/type/formInputs";
import { decryptText } from "../utils/constants";

const getAuthToken = async (customerId: string) => {
  try {
    let authToken = null;
    const encryptedAuthToken = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/appConfig/${customerId}`);

    if (encryptedAuthToken.data.status && encryptedAuthToken.data.key) {
      const decryptedKey = decryptCrypto(encryptedAuthToken.data.key);
      authToken = base64Encode(`${decryptedKey.split("+")[0]}:${decryptedKey.split("+")[1]}`);
    }
    return authToken;
  } catch (e) {
    console.log("Fetching auth token failed.", e);
    return null;
  }
};

export const addCustomer = async (customers: IAddFarmersDetailsFormInput | IAddFarmersDetailsFormInput[]) => {
  try {
    if (Array.isArray(customers)) {
      let count = 0;
      for (let i = 0; i < customers.length; i++) {
        const authToken = await getAuthToken(customers[i].id as string);

        if (authToken) {
          const config = {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          };
          const data = {
            name: customers[i].name,
            email: "",
            contact: customers[i].phoneNumber,
            type: "employee",
            customerId: customers[i].id,
            payment: {
              accountType: "bank",
              accountNumber: decryptText(customers[i].accountNumber as string),
              bankName: customers[i].bankName,
              ifscCode: customers[i].ifscCode,
            },
            notes: {
              reason: "Contact creation",
            },
          };
          const res = await axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/customers`, data, config);
          if (res && res.data && res.data.status && res.data.customer) {
            count = count + 1;
          }
        }
      }
      if (count === customers.length) return true;
      else return null;
    } else {
      const authToken = await getAuthToken(customers.id as string);

      if (authToken) {
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };
        const data = {
          name: customers.name,
          email: "",
          contact: customers.phoneNumber,
          type: "employee",
          customerId: customers.id,
          payment: {
            accountType: "bank",
            accountNumber: decryptText(customers.accountNumber as string),
            bankName: customers.bankName,
            ifscCode: customers.ifscCode,
          },
          notes: {
            reason: "Contact creation",
          },
        };
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/customers`, data, config);
        if (res && res.data && res.data.status && res.data.customer) {
          return res.data.customer;
        }
        return null;
      }
    }
  } catch (e) {
    console.log("Creating customer failed", e);
    return null;
  }
};
