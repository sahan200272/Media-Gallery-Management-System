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

module.exports = { UploadImage };