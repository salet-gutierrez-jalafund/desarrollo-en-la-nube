import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
});

export const uploadToCloudinary = async (file: File, type: "image" | "audio") => {
  try {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error("Faltan las credenciales de Cloudinary en el archivo .env");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("resource_type", type);

    const resourceType = type === "audio" ? "video" : type;
    formData.append("resource_type", resourceType);

    console.log(`Subiendo ${type} a Cloudinary con cloud_name: ${cloudName}, preset: ${uploadPreset}`);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error al subir a Cloudinary: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return { url: data.secure_url, publicId: data.public_id };
  } catch (error) {
    console.error("Error en uploadToCloudinary:", error);
    throw error;
  }
};

export default cld;