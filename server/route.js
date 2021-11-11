const express = require('express');
const router = express.Router();
const controller = require('./controller');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')//저장 위치
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)//저장될 이름
    }
})
const upload = multer({ storage: storage });
            
router.post('/api/login', controller.api.login);
router.post('/add/user', controller.add.user);
router.post('/add/store', upload.single('image') ,controller.add.store);

router.post('/get/store', controller.get.store);
router.post('/get/store_cnt', controller.get.store_cnt);
router.post('/get/store_data', controller.get.store_data);

router.post('/get/store_address', controller.get.store_address);

router.post('/delete/store', controller.delete.store);

router.post('/update/store', controller.update.store);
router.post('/update/view_cnt', controller.update.view_cnt);
router.post('/update/like', controller.update.like);

//router.post('/upload/image', controller.upload.image);

module.exports = router;