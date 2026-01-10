import multer from "multer";
import path from "path";

// path.resolve() ni hozircha o'chirib turamiz, chunki /tmp/ mutlaq manzil
// const __dirname = path.resolve(); 

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // 🛑 Renderda yozish uchun eng xavfsiz joy /tmp/
    // Qachonki /uploads/ katalogiga yozish ruxsati bo'lmasa, shu yerdan foydalanish kerak.
    cb(null, "/tmp/uploads/"); 
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

export default multer({ storage });