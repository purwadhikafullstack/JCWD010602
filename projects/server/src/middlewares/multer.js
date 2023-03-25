const multer = require("multer")
const { nanoid } = require("nanoid");

const imgUploader = ({
    destinationFolder = "",
    prefix = "POST",
    fileType = "image"
}) => {
    const storageConfig = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `${__dirname}/../public/${destinationFolder}`)
        },
        filename: (req, file, cb) => {
            const fileExtension = file.mimetype.split("/")[1];

            const filename = `${prefix}_${nanoid()}.${fileExtension}`;

            cb(null, filename);
        }
    })
    const uploader = multer({
        storage: storageConfig,
        limits: { fileSize: 5 * 1024 * 512 },
        fileFilter: (req, file, cb) => {
        if (file.mimetype.split("/")[0] != fileType) {
            return cb(null, false);
        } else if (
            file.mimetype.split("/")[1] == "png" ||
            file.mimetype.split("/")[1] == "jpg" ||
            file.mimetype.split("/")[1] == "jpeg"
        ) {
            return cb(null, true);
        }
        cb(null, false);
    }
    })

    return uploader
}

module.exports = { imgUploader }