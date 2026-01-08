const Application = require('../models/Application');
const mongoose = require('mongoose');

exports.applyForJob = async (req, res) => {
    const { job_id, resume_url } = req.body;
    const seeker_id = req.user.id;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(job_id)) {
        return res.status(400).json({ msg: 'Invalid job ID format' });
    }

    try {
        const appId = await Application.create({ job_id, seeker_id, resume_url });
        res.json({ id: appId, job_id, seeker_id, resume_url, status: 'pending' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getApplicationsForJob = async (req, res) => {
    try {
        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(req.params.jobId)) {
            return res.status(400).json({ msg: 'Invalid job ID format' });
        }
        const apps = await Application.findByJobId(req.params.jobId);
        res.json(apps);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getMyApplications = async (req, res) => {
    try {
        const apps = await Application.findBySeekerId(req.user.id);
        res.json(apps);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
