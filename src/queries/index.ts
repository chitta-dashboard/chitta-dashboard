import { base64Encode, decryptCrypto } from "./../utils/helpers/index";
import axios from "axios";
import { IAddFarmersDetailsFormInput } from "./../components/modals/type/formInputs";
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
      for (let i = 0; i < customers.length; ) {
        const authToken = await getAuthToken(customers[i].id as string);

        if (authToken) {
          const config = {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          };
          const data = {
            name: customers[i].name,
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
          if (res && res.data && res.data.status && res.data.customer) i++;
          //TODO:Need to handle else case
        } else return null;
      }
      return true;
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
      } else return null;
    }
  } catch (e) {
    console.log("Creating customer failed", e);
    return null;
  }
};

export const editCustomer = async (customer: IAddFarmersDetailsFormInput) => {
  try {
    const authToken = await getAuthToken(customer.id as string);
    if (authToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const data = {
        name: customer.name,
        contact: customer.phoneNumber,
        type: "employee",
        customerId: customer.id,
        payment: {
          accountType: "bank",
          accountNumber: decryptText(customer.accountNumber as string),
          bankName: customer.bankName,
          ifscCode: customer.ifscCode,
        },
        notes: {
          reason: "Contact Updation",
        },
      };
      const res = await axios.patch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/customers/${customer.id}`, data, config);
      if (res && res.data && res.data.status) return true;
      else return false;
    } else return false;
  } catch (e) {
    console.log("Updating customer failed", e);
    return false;
  }
};
