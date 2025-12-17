const express = require('express');
const router = express.Router();
const gigController = require('../controllers/gigController');

// 定义路由
router.get('/', gigController.getAllGigs);       // GET /api/gigs
router.get('/:id', gigController.getGigById);    // GET /api/gigs/123
router.post('/', gigController.createGig);       // POST /api/gigs (发布)

module.exports = router;