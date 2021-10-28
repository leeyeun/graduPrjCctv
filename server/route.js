const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/send/pw', controller.api.sendPw);
router.post('/add/user', controller.add.user);
router.post('/add/store', controller.add.store);

router.post('/get/store', controller.get.store);
router.post('/get/store_cnt', controller.get.store_cnt);
router.post('/get/store_data', controller.get.store_data);
router.post('/delete/store', controller.delete.store);

router.post('/update/store', controller.update.store);

module.exports = router;