import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(
        null,
        Date.now() + path.extname(file.originalname)
        );
    }
    });

    const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("video/")) {
        cb(null, true);
        } else {
        cb(new Error("Only video files allowed"));
        }
    }
});

export default upload;
