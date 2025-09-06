import imageCompression from 'browser-image-compression';

const uplode_url = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
const vita_uplode_preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;





const uplodecloudnery = async (file, onProgress = null) => {
  if (!uplode_url || !vita_uplode_preset) {
    console.error("Cloudinary environment variables are missing.");
    return null;
  }

  try {
    // 1. Compress the image
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 1, // Compress to under 1MB
      maxWidthOrHeight: 1920,
      useWebWorker: true
    });

    const formData = new FormData();
    formData.append('file', compressedFile);
    formData.append('upload_preset', vita_uplode_preset);
    formData.append('cloud_name', uplode_url);

    // 2. Use XMLHttpRequest to track progress
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${uplode_url}/image/upload`);

      if (onProgress) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded * 100) / event.total);
            onProgress(percent);
          }
        };
      }

      xhr.onload = () => {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
        resolve(data.secure_url || null);
      };

      xhr.onerror = (err) => {
        console.error('Upload failed:', err);
        reject(null);
      };

      xhr.send(formData);
    });

  } catch (error) {
    console.error("Compression or upload error:", error);
    return null;
  }
};

export default uplodecloudnery;
