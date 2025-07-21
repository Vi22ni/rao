// src/utils/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import sharp from 'sharp'; // Para otimização de imagens

// Configure o Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function uploadImage(fileBuffer: Buffer, fileName: string) {
    try {
        const optimizedBuffer = await sharp(fileBuffer)
            .resize({ width: 800 }) 
            .jpeg({ quality: 80 }) 
            .toBuffer();

        const result: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto',
                    public_id: `pets/${fileName.split('.')[0]}`,
                    folder: 'pets',
                    format: 'jpg',
                    quality: 'auto:good' 
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(optimizedBuffer);
        });

        return {
            url: result.secure_url,
            publicId: result.public_id,
            bytes: result.bytes
        };
    } catch (error) {
        console.error('Upload failed:', error);
        throw error;
    }
}