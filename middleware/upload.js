import multer from "multer";
import path from "path";

// 1. __dirname ni aniqlash (ESM uchun)
const __dirname = path.resolve(); 

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // 2. path.join yordamida aniq manzilni belgilash
    cb(null, path.join(__dirname, "uploads")); 
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

export default multer({ storage });