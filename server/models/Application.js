const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    seeker_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    resume_url: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'accepted', 'rejected'],
        default: 'pending'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Static methods
applicationSchema.statics.create = async function(appData) {
    const application = new this(appData);
    await application.save();
    return application._id;
};

applicationSchema.statics.findByJobId = async function(jobId) {
    return await this.find({ job_id: jobId })
        .populate('seeker_id', 'name email')
        .sort({ created_at: -1 })
        .lean();
};

applicationSchema.statics.findBySeekerId = async function(seekerId) {
    return await this.find({ seeker_id: seekerId })
        .populate('job_id', 'title company')
        .sort({ created_at: -1 })
        .lean();
};

// Instance method to convert to JSON with related info
applicationSchema.methods.toJSON = function() {
    const app = this.toObject();
    if (app.seeker_id && typeof app.seeker_id === 'object') {
        app.seeker_name = app.seeker_id.name;
        app.seeker_email = app.seeker_id.email;
        app.seeker_id = app.seeker_id._id;
    }
    if (app.job_id && typeof app.job_id === 'object') {
        app.job_title = app.job_id.title;
        app.company = app.job_id.company;
        app.job_id = app.job_id._id;
    }
    return app;
};

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
