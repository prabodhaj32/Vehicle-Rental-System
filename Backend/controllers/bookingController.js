exports.createBooking = async (req,res) => {
    const{ vehicleId, startDate, endDate} = req.body;
    try {
         const vehicle = await Vehicle.findById(vehicleId);
           if (!vehicle || !vehicle.availability) return res.status(400).json({ msg: 'Vehicle not available' });

    const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    const totalCost = days * vehicle.pricePerDay;

    const booking = new Booking({
      user: req.user.id,
      vehicle: vehicleId,
      startDate,
      endDate,
      totalCost
    });
    await booking.save();

    vehicle.availability = false;
    await vehicle.save();

    res.json(booking);

  } catch (err) {

    res.status(500).json({ msg: 'Server error' });
  }
};



//getuser
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('vehicle');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
//getall
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user').populate('vehicle');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

//cancle

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });
    if (booking.user.toString() !== req.user.id) return res.status(403).json({ msg: 'Access denied' });

    const vehicle = await Vehicle.findById(booking.vehicle);
    vehicle.availability = true;
    await vehicle.save();

    await booking.deleteOne();
    res.json({ msg: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
