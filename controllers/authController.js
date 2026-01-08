import User from "../models/User.js";
import jwt from "jsonwebtoken";
// Parolni avtomatik shifrlash (hashing) Mongoose modelida qilingan deb faraz qilamiz.
// Agar modelda shifrlash bo'lmasa, bu qismda qo'shimcha kod kerak bo'ladi.

// Token yaratish funksiyasi
const generateToken = (id) => {
  // .env faylidan JWT_SECRET ni oling
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET .env faylida o'rnatilmagan.");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Tokenning amal qilish muddati
  });
};


export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Ma'lumotlarni tekshirish
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Barcha maydonlar to'ldirilishi shart." });
  }

  try {
    // 2. Foydalanuvchi mavjudligini tekshirish
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Bu email allaqachon ro'yxatdan o'tgan." });
    }

    // 3. Yangi foydalanuvchini yaratish
    // Eslatma: Parolni shifrlash User.js modelida 'pre('save')' middleware orqali amalga oshirilishi kerak.
    const user = await User.create({ name, email, password });

    if (user) {
      // 4. Muvaffaqiyatli javob qaytarish
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      // Yaratishda qandaydir muammo yuzaga kelsa
      res.status(400).json({ message: "Foydalanuvchi ma'lumotlari yaroqsiz." });
    }
  } catch (error) {
    // Serverdagi umumiy xato
    console.error(error);
    res.status(500).json({ message: "Server xatosi ro'yxatdan o'tishda yuz berdi." });
  }
};

/**
 * @desc    Foydalanuvchi tizimga kirishi
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  // 1. Ma'lumotlarni tekshirish
  if (!email || !password) {
    return res.status(400).json({ message: "Email va parol kiritilishi shart." });
  }

  try {
    // 2. Email orqali foydalanuvchini topish
    const user = await User.findOne({ email });

    // 3. Foydalanuvchi mavjudligini va parolni tekshirish
    if (user && (await user.matchPassword(password))) {
      // Muvaffaqiyatli kirish
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      // Foydalanuvchi topilmasa yoki parol noto'g'ri bo'lsa
      res.status(401).json({ message: "Email yoki parol noto'g'ri." });
    }
  } catch (error) {
    // Serverdagi umumiy xato
    console.error(error);
    res.status(500).json({ message: "Server xatosi tizimga kirishda yuz berdi." });
  }
};