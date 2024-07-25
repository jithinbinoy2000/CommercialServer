const adminController = require('../Controllers/adminController')
const express = require('express');
const { sendOtpMiddleware, verifyOtpMiddleware } = require('../MiddleWare/phverify');
const router = express.Router();
router.post('/admin/login',adminController.adminlogin);
router.post('/send-otp',sendOtpMiddleware);
router.post('/admin/addresturant',verifyOtpMiddleware,adminController.addResturant);
router.delete('/admin/deleteresturant/:resturantId',adminController.deleteResturant);
router.patch('/admin/update-resturant/:itemId',adminController.updateResturant);
router.post('/admin/add-tables',adminController.addTables);
router.delete('/admin/delete-table/:deleteId',adminController.deleteTable);
router.patch('/admin/update-table/:itemId',adminController.updateTable);
router.get('/admin/resturansts',adminController.getAllResturants);
router.get('/admin/table',adminController.getAllTables);
// router.post('/reg',adminController.adminregister)
module.exports=router;
