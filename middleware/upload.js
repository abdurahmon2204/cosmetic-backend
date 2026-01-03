import multer from "multer";
import path from "path";

// uploads/ papkaga saqlaydi
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // papka nomi
  },
  filename: function (req, file, cb) {
    // vaqt + original nom
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// faqat rasm fayllarini qabul qilamiz
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Faqat rasm fayllarini yuklash mumkin"));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
