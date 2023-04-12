import nacl from "tweetnacl";
import utils from "tweetnacl-util";
import { randomIntBetween } from "../utils/helpers";
import binascii from "binascii";
import CryptoJS from "crypto-js";

// const nacl = require("tweetnacl");
// const utils = require("tweetnacl-util");

export const generateAccount = () => {
  const keys = nacl.box.keyPair();
  var SK = utils.encodeBase64(keys.secretKey);
  var PK = utils.encodeBase64(keys.publicKey);
  return {
    SK,
    PK,
  };
};

export const encrypt_AES_GCM = (msg, secretKey) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(msg), secretKey).toString();
  return ciphertext;
};

export const decrypt_AES_GCM = (encryptedMsg, secretKey) => {
  let bytes = CryptoJS.AES.decrypt(encryptedMsg, secretKey);
  const plaintext = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return plaintext;
};

export const createWalletAndEncrypt = (farmers) => {
  const updatedFarmers = [];
  // Iterate through the members and for each
  for (const farmer of farmers) {
    const pin = randomIntBetween(1000, 9999);
    const phoneNumber = farmer["phoneNumber"];
    const binaryPasscode = binascii.hexlify(farmer["password"].slice(0, 16));
    const secretkey = pin * parseInt(phoneNumber.slice(1));

    //Create a new wallet
    const { SK, PK } = generateAccount();
    console.log("SK", SK);
    console.log("PK", PK);

    //Use the passcode to encrypt the wallets' SK
    const SK_encryptedMsg = encrypt_AES_GCM(SK, binaryPasscode);
    const pin_encryptedMsg = encrypt_AES_GCM(pin, binaryPasscode);

    //Use the secret key and passcode to generate the K ciphertext
    const binary_secretkey = binascii.hexlify(secretkey.toString().slice(0, 12));
    const K_encryptedMsg = encrypt_AES_GCM(farmer["password"].slice(0, 16), binary_secretkey);

    //Save the SK ciphertext
    const cipertextTableItem = {
      phone: phoneNumber,
      SK_cipher: SK_encryptedMsg,
      K_cipher: K_encryptedMsg,
    };
    console.log("cipertextTableItem", cipertextTableItem);
    //TODO: Send some algo to activate(make account status as online) the account

    //Add pin and pk to farmerlist
    farmer["SK_cipher"] = SK_encryptedMsg;
    farmer["K_cipher"] = K_encryptedMsg;
    farmer["pin"] = pin_encryptedMsg;
    farmer["PK"] = PK;
    //Append object to list
    updatedFarmers.push(farmer);
  }
  console.log("updatedFarmers", updatedFarmers);

  return updatedFarmers;
};

export const getPin = (pin_encryptedMsg, password) => {
  const binaryPasscode = binascii.hexlify(password.slice(0, 16));
  const pin = decrypt_AES_GCM(pin_encryptedMsg, binaryPasscode);
  return pin;
};
