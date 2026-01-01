const cloudinary = require("../config/cloudinary");
const Media = require("../models/media");

const UploadImage = async (req, res) => {

    try {

        const { title, description, tag } = req.body;
        const image = req.file;
        let uploadImage;

        if (image) {

            const base64Pdf = `data:${image.mimetype};base64,${image.buffer.toString("base64")}`;

            uploadImage = await cloudinary.uploader.upload(base64Pdf, {
                resource_type: "auto",
                folder: "uploads/images"
            });

        }else{

            console.log("No file uploaded");
        }

        //console.log(uploadImage);

        const newMedia = new Media({

            title: title,
            description: description,
            imageUrl: uploadImage.secure_url,
            publicId: uploadImage.public_id,
            tag: tag
        });

        newMedia.save();


        res.status(200).json(
            {
                message: "Media upload successfully",
                media: newMedia,
            });

    } catch (error) {

        res.status(500).json(
            {
                message: "Server error",
                error: error.message

            });
    }
}

const UpdateMedia = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from URL
        const { title, description, tag } = req.body;
        const newImageFile = req.file;

        // 1. Find the existing media in Database
        let media = await Media.findById(id);
        if (!media) {
            return res.status(404).json({ message: "Media not found" });
        }

        // 2. If a new image is provided, replace the old one in Cloudinary
        if (newImageFile) {
            // Delete old image from Cloudinary using its publicId
            if (media.publicId) {
                await cloudinary.uploader.destroy(media.publicId);
            }

            // Upload the new image
            const base64Image = `data:${newImageFile.mimetype};base64,${newImageFile.buffer.toString("base64")}`;
            const uploadResponse = await cloudinary.uploader.upload(base64Image, {
                resource_type: "auto",
                folder: "uploads/images"
            });

            // Update image-related fields
            media.imageUrl = uploadResponse.secure_url;
            media.publicId = uploadResponse.public_id;
        }

        // 3. Update metadata fields (only if they are provided in request)
        media.title = title || media.title;
        media.description = description || media.description;
        media.tag = tag || media.tag;

        // 4. Save the updated document
        const updatedMedia = await media.save();

        res.status(200).json({
            message: "Media updated successfully",
            media: updatedMedia,
        });

    } catch (error) {
        res.status(500).json({
            message: "Update failed",
            error: error.message
        });
    }
}

module.exports = { UploadImage, UpdateMedia };