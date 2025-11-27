const CLOUD_NAME_CLOUDINARY = import.meta.env.REACT_APP_CLOUD_NAME_CLOUDINARY;

const url = `https://api.cloudinary.com/v1_1/dsufnie7k/image/upload`;

const uploadImage = async (image) => {
  const formData = new FormData()
  formData.append('file', image)
  formData.append('upload_preset', 'my_upload_preset')

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  })
  const data = await response.json()
  return data;
}

export default uploadImage