const cloudinary = require("../config/cloudinary");
const Media = require("../models/media");

const UploadImage = async (req, res) => {

    try {

        const { title, description, tag } = req.body;

        let images = req.files;

        let imageArray = [];

        if (images && images.length > 0) {

            for (const image of images) {

                const base64Pdf = `data:${image.mimetype};base64,${image.buffer.toString("base64")}`;

                const uploadImage = await cloudinary.uploader.upload(base64Pdf, {
                    resource_type: "auto",
                    folder: "uploads/images"
                });

                imageArray.push(
                    {
                        imageUrl: uploadImage.secure_url,
                        publicId: uploadImage.public_id
                    }
                )
            }

        } else {

            console.log("No file uploaded");
        }

        //console.log(uploadImage);

        const newMedia = new Media({
            title: title,
            description: description,
            tag: tag,
            images: imageArray
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

        const newImages = req.files;

        let imageArray = [];

        // Find the existing media in Database
        let media = await Media.findById(id);

        if (!media) {
            return res.status(404).json(
                { message: "Media not found" }
            );
        }

        if (newImages && newImages.length > 0) {

            for(const image of newImages){

                const base64Pdf = `data:${image.mimetype};base64,${image.buffer.toString("base64")}`;

                const uploadImage = await cloudinary.uploader.upload(base64Pdf, {
                    resource_type: "auto",
                    folder: "uploads/images"
                });

                imageArray.push(
                    {
                        imageUrl: uploadImage.secure_url,
                        publicId: uploadImage.public_id
                    }
                );
            }
        }

        // 3. Update metadata fields (only if they are provided in request)
        media.title = title || media.title;
        media.description = description || media.description;
        media.tag = tag || media.tag;
        media.images = imageArray || media.images;

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

const GetAllMedia = async (req, res) => {
    try {

        // Fetch from MongoDB, sorted by newest first
        const mediaList = await Media.find().sort({ createdAt: -1 });

        res.status(200).json({
            count: mediaList.length,
            media: mediaList
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch media",
            error: error.message
        });
    }
}

const DeleteMedia = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Find the media first to get the Cloudinary Public ID
        const media = await Media.findById(id);

        if (!media) {
            return res.status(404).json({ message: "Media not found" });
        }

        // 2. Delete the image from Cloudinary
        // We use the publicId stored during the upload process
        if (media.publicId) {
            await cloudinary.uploader.destroy(media.publicId);
        }

        // 3. Delete the record from MongoDB
        await Media.findByIdAndDelete(id);

        res.status(200).json({
            message: "Media deleted successfully from cloud and database"
        });

    } catch (error) {
        res.status(500).json({
            message: "Delete operation failed",
            error: error.message
        });
    }
};

module.exports = { UploadImage, UpdateMedia, GetAllMedia, DeleteMedia };