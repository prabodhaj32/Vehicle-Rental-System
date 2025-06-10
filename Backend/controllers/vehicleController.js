exports.getVehicles = async(req,res) => {
    try {
        const vehicles =await Vehicle.find();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({msg:'Server Error'});
        
    }
};
