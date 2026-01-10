import multer from "multer";
import path from "path";
import fs from "fs"; // Fayl tizimi (File System) moduli qo'shildi!

const uploadPath = '/tmp/uploads'; // Qat'iy manzil

// Agar katalog mavjud bo'lmasa, uni sinxron yaratish funksiyasi
const ensureUploadsExists = () => {
    // fs.existsSync katalog mavjudligini tekshiradi
    if (!fs.existsSync(uploadPath)) {
        // fs.mkdirSync katalog yaratadi (rekursiv: ota-kataloglar ham yaratiladi)
        fs.mkdirSync(uploadPath, { recursive: true });
        console.log(`Created directory: ${uploadPath}`);
    }
};

// Bu funksiyani storage sozlanishidan oldin chaqiramiz
ensureUploadsExists();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Endi biz katalog yaratilganligiga ishonch hosil qilganimiz uchun, 
    // to'g'ridan-to'g'ri manzilni beramiz.
    cb(null, uploadPath); 
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

export default multer({ storage });