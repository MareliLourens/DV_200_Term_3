const multer = require('multer');
const mimeTypes = ['image/webp', 'image/png', 'image/jpg', 'image/jpeg', 'image/svg+xml'];


const fileFilter = (req, file, cb) => {
  if (mimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, JPG, GIF are allowed.'), false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const uploadFields = upload.fields([
  { name: 'character_icon_img', maxCount: 1 },
  { name: 'character_model_img', maxCount: 1 },
  { name: 'character_dish_img', maxCount: 1 },
  { name: 'character_normal_attack_img', maxCount: 1 },
  { name: 'character_elemental_skill_img', maxCount: 1 },
  { name: 'character_elemental_burst_img', maxCount: 1 },
  { name: 'character_element_img', maxCount: 1 },
  { name: 'character_card_img', maxCount: 1 }
]);

module.exports = uploadFields;