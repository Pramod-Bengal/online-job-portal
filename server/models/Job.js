const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    employer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Remote', 'Internship'],
        default: 'Full-time'
    },
    experience: {
        type: String,
        enum: ['Entry Level', 'Mid Level', 'Senior Level'],
        default: 'Entry Level'
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Static methods
jobSchema.statics.create = async function(jobData) {
    const job = new this(jobData);
    await job.save();
    return job._id;
};

jobSchema.statics.findAll = async function() {
    return await this.find()
        .populate('employer_id', 'name email')
        .sort({ created_at: -1 })
        .lean();
};

jobSchema.statics.findById = async function(id) {
    return await this.findOne({ _id: id })
        .populate('employer_id', 'name email')
        .lean();
};

jobSchema.statics.delete = async function(id) {
    return await this.findByIdAndDelete(id);
};

// Instance method to convert to JSON with employer info
jobSchema.methods.toJSON = function() {
    const job = this.toObject();
    if (job.employer_id && typeof job.employer_id === 'object') {
        job.employer_name = job.employer_id.name;
        job.employer_email = job.employer_id.email;
        job.employer_id = job.employer_id._id;
    }
    return job;
};

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
