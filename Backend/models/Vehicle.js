import mongoose from "mongoose";

const vehicleSchema = new  mongoose.Schema({
    name: {type:String, required: true},
    type: {type:String, required: true},
    pricePerDay: {type:Number, required:true},
    availability: { type:Boolean, default: true},
    createdAt: {type:Date, default: Date.now}



});
module.exports = mongoose.model('Vehicle', vehicleSchema);