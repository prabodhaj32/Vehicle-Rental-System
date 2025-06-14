import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user:{ type:mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
    vehicle: {type:mongoose.Schema.Types.ObjectId, ref, ref: 'vehicle', required: true},

    startDate: {type: Date, required:true},
    endDate:{type: Date, required: true},
     totalCost: { type: Number, required: true },
     status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
     createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);