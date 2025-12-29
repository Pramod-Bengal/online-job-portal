const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, applicationController.applyForJob);
router.get('/job/:jobId', authMiddleware, applicationController.getApplicationsForJob);
router.get('/my', authMiddleware, applicationController.getMyApplications);

module.exports = router;
