// It's a good practice to use environment variables for sensitive or environment-specific data.
// Assuming you are using Vite, environment variables should be prefixed with VITE_.
// In your .env file, you should have:
// VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
// VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

/**
 * Interface for the expected successful response from Cloudinary.
 */
interface CloudinaryUploadResponse {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  original_filename: string;
}

const uploadImage = async (image: File): Promise<CloudinaryUploadResponse> => {
  const formData = new FormData();
  formData.append('file', image);
  // formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('upload_preset', 'my_upload_preset');

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Image upload failed: ${response.statusText} ${JSON.stringify(errorData)}`);
  }

  const data: CloudinaryUploadResponse = await response.json();
  return data;
};

export default uploadImage;