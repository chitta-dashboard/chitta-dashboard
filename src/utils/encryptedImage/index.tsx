import { FC, useEffect, useState } from "react";
import { decryptText } from "../constants";

const EncryptedImage: FC<{ src: string; [key: string]: any }> = ({ src, ...otherAttrs }) => {
  const [decryptedBase64, setDecryptedBase64] = useState("");

  useEffect(() => {
    const fetchDecryptSetBase64 = async () => {
      let res,
        encryptedBase64 = "";

      try {
        res = await fetch(src);
        encryptedBase64 = await res.text();
      } catch (err) {
        console.log("error during image fetch");
      }

      if (encryptedBase64 !== "") setDecryptedBase64(decryptText(encryptedBase64));
    };
    fetchDecryptSetBase64();
  }, [src]);

  return <img src={decryptedBase64} {...otherAttrs} />;
};

export default EncryptedImage;
