const config = {
  bucketName: process.env.REACT_APP_AWS_BUCKET_NAME ?? null,
  region: process.env.REACT_APP_AWS_REGION ?? null,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY ?? null,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY ?? null,
};

export const farmerProfiles = {
  ...config,
  dirName: "farmerProfiles",
};

export const ceoProfiles = {
  ...config,
  dirName: "ceoProfiles",
};

export const founderProfiles = {
  ...config,
  dirName: "founderProfiles",
};

export const adminProfiles = {
  ...config,
  dirName: "adminProfiles",
};
