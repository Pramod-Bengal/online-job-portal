const Job = require('../models/Job');
const mongoose = require('mongoose');

exports.createJob = async (req, res) => {
    const { title, description, company, location, salary, jobType, experience, isFeatured } = req.body;
    const employer_id = req.user.id; // From auth middleware

    if (req.user.role !== 'employer') {
        return res.status(403).json({ msg: 'Not authorized' });
    }

    try {
        const jobData = {
            employer_id: new mongoose.Types.ObjectId(employer_id),
            title,
            description,
            company,
            location,
            salary,
            jobType: jobType || 'Full-time',
            experience: experience || 'Entry Level',
            isFeatured: isFeatured || false
        };
        const jobId = await Job.create(jobData);
        res.json({ id: jobId.toString(), title, description, company, location, salary, jobType, experience, isFeatured });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll();
        // Transform jobs to include employer_name and convert _id to id
        const transformedJobs = jobs.map(job => ({
            id: job._id.toString(),
            title: job.title,
            description: job.description,
            company: job.company,
            location: job.location,
            salary: job.salary,
            jobType: job.jobType || 'Full-time',
            experience: job.experience || 'Entry Level',
            isFeatured: job.isFeatured || false,
            created_at: job.created_at,
            employer_name: job.employer_id?.name || 'Unknown',
            employer_email: job.employer_id?.email || ''
        }));
        res.json(transformedJobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }
        // Transform job to include employer info and convert _id to id
        const transformedJob = {
            id: job._id.toString(),
            title: job.title,
            description: job.description,
            company: job.company,
            location: job.location,
            salary: job.salary,
            jobType: job.jobType || 'Full-time',
            experience: job.experience || 'Entry Level',
            isFeatured: job.isFeatured || false,
            created_at: job.created_at,
            employer_name: job.employer_id?.name || 'Unknown',
            employer_email: job.employer_id?.email || ''
        };
        res.json(transformedJob);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getTopJobs = async (req, res) => {
    try {
        // Get featured jobs first, then top 5 most recent jobs
        const featuredJobs = await Job.find({ isFeatured: true })
            .populate('employer_id', 'name email')
            .sort({ created_at: -1 })
            .limit(5)
            .lean();
        
        // If we don't have 5 featured jobs, fill with recent jobs
        let topJobs = featuredJobs;
        if (topJobs.length < 5) {
            const recentJobs = await Job.find({ isFeatured: { $ne: true } })
                .populate('employer_id', 'name email')
                .sort({ created_at: -1 })
                .limit(5 - topJobs.length)
                .lean();
            topJobs = [...topJobs, ...recentJobs];
        }
        
        // Transform jobs
        const transformedJobs = topJobs.map(job => ({
            id: job._id.toString(),
            title: job.title,
            description: job.description,
            company: job.company,
            location: job.location,
            salary: job.salary,
            jobType: job.jobType || 'Full-time',
            experience: job.experience || 'Entry Level',
            isFeatured: job.isFeatured || false,
            created_at: job.created_at,
            employer_name: job.employer_id?.name || 'Unknown',
            employer_email: job.employer_id?.email || ''
        }));
        
        res.json(transformedJobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};