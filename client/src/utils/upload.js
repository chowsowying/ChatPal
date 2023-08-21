import axios from "axios";

// env
const cloud_name = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET;

export const uploadFiles = async (files) => {
  let formData = new FormData();
  formData.append("upload_preset", upload_preset);
  let uploaded = [];
  for (const f of files) {
    const { file, type } = f;
    formData.append("file", file);
    let res = await uploadToCloudinary(formData, type);
    uploaded.push({
      file: res,
      type,
    });
  }
  return uploaded;
};

const uploadToCloudinary = async (formData, type) => {
  return new Promise(async (resolve) => {
    return await axios
      .post(`https://api.cloudinary.com/v1_1/${cloud_name}/raw/upload`, formData)
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
