import { uploadFile, deleteFile, putObject } from "react-s3";

const config = {
  bucketName: process.env.REACT_APP_AWS_BUCKET_NAME ?? null,
  region: process.env.REACT_APP_AWS_REGION ?? null,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY ?? null,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY ?? null,
  debug: true,
  contentType: "image/png", // specify the MIME type of your file here
};

export const farmerProfiles = {
  ...config,
  dirName: "profiles/farmerProfiles",
};

export const ceoProfiles = {
  ...config,
  dirName: "profiles/ceoProfiles",
};

export const founderProfiles = {
  ...config,
  dirName: "profiles/founderProfiles",
};

export const adminProfiles = {
  ...config,
  dirName: "profiles/adminProfiles",
};

const s3Configs = {
  farmer: farmerProfiles,
  ceo: ceoProfiles,
  founder: founderProfiles,
  admin: adminProfiles,
};

export const uploadProfile = async (image, key) => {
  try {
    let imageUrl = "";
    const urlResponse = await uploadFile(image, s3Configs[key]);
    console.log("urlResponse", urlResponse);
    imageUrl = urlResponse.location;
    return imageUrl;
  } catch (e) {
    console.log(`Uploading ${key} profile failed.`, e);
    return "";
  }
};

export const deleteProfile = async (imageName, key) => {
  try {
    const response = await deleteFile(imageName, s3Configs[key]);
    console.log("ok :", response.ok, "status :", response.status);
    return response.ok;
  } catch (e) {
    console.log(`Deleting ${key} profile failed.`, e);
  }
};
