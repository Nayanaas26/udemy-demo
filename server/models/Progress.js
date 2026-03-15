const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: String, required: true },
    lessonId: { type: String, required: true },
    status: { type: String, enum: ['completed'], default: 'completed' }
}, { timestamps: true });

// Ensure a user can only have one progress entry per lesson
progressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);
