const Application = require('../models/Application');

exports.applyForJob = async (req, res) => {
    const { job_id, resume_url } = req.body;
    const seeker_id = req.user.id;

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
