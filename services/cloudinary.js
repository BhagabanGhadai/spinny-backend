const cloudinary = require('cloudinary').v2;
const { env } = require('../env')
const fs = require('fs')

cloudinary.config({
    cloud_name: env.cloudinary_cloud_name,
    api_key: env.cloudinary_api_key,
    api_secret: env.cloudinary_api_secret
});

const uploadToCloudinary = async (stream) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
                resolve(result);
            } else {
                reject(error);
            }
        });

        stream.pipe(uploadStream);
    });
};

exports.UPLOAD_IMAGE = (path) => {
    const stream = fs.createReadStream(path);
    uploadToCloudinary(stream)
        .then((result) => {
            console.log('Image uploaded successfully');
            return result
        })
        .catch((error) => {
            console.error('Error uploading image:', error);
        });
}
