exports.getVehicles = async(req,res) => {
    try {
        const vehicles =await Vehicle.find();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({msg:'Server Error'});
        
    }
};
exports .addVehicle = async (req,res) => {
    const { name,type,pricePerDay } = req.body;
    try {
        const vehicle = new Vehicle({
            name,
            type,
            pricePerDay,
            image: req.file ? `/uploads/${req.file.filename}` : null

        });
        await vehicle.save();
        res.json(vehicle);

    } catch (error) {
        res.status(500).json({ msg: 'Server error'});
    }
};

exports.updateVehicle = async(req, res) => {
    const{name, type,pricePerDay, availability }=res.body;
    try {
        const updateData = {name, type, pricePerDay, availability};
        if (req.file) updateData.image = `/uploads/${req.file.filename}`;

        const vehicle = await Vehicle.findbyIdAndUpdate(req, URLSearchParams.id,updateData, {new:true });
        if(!vehicle) return res.status res.status(404).json({msg: 'vehicle not found'});
        res.json(vehicel);


    } catch (error) {
        res.status(500).json({msg: 'Server error'});

        
    }
    

};


exports.deleteVehicle = async(req,res) => {
    try {
        const vehicle = await Vehicle.findbyIdAndUpdate(req.params.id);
        if(!vehicle) return res.status(404) .json({msg: 'vehicle not found'});

        if (vehicle.image) fs.unlinkSync(path.join(__dirname, '..', vehicle.image));
        res.json({ msg: 'Vehicle delted'});


    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
;}
