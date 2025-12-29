const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password_hash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['seeker', 'employer'],
        default: 'seeker'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Static methods
userSchema.statics.create = async function(name, email, password, role) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = new this({
        name,
        email,
        password_hash: hashedPassword,
        role: role || 'seeker'
    });
    
    await user.save();
    return user._id;
};

userSchema.statics.findByEmail = async function(email) {
    return await this.findOne({ email: email.toLowerCase() }).lean();
};

userSchema.statics.findById = async function(id) {
    return await this.findOne({ _id: id }).lean();
};

// Instance method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password_hash);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
