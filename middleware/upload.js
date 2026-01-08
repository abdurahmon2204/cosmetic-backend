// middleware/upload.js (Yangi kod)

import multer from "multer";
import path from "path";

// __dirname Node.js ES Modulesda bevosita mavjud emas, shuning uchun uni hosil qilamiz
const __dirname = path.resolve(); // Loyihaning ildiz katalogini beradi

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Manzilni loyiha ildiziga nisbatan aniq ko'rsatamiz
    cb(null, path.join(__dirname, "uploads")); 
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

export default multer({ storage });