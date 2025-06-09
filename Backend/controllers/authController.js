
export const register = async (req,res) => {
    try {
        const{ username, email, password, isAdmin } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({message : 'User alredy exists'});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        //new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false  //optioanl admin create
        });
        await newUser.save();
         res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: err.message });

    }

};

//login

export const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        //find user
        const user =await User.findOne ({ email});
        if(!user) return res.status(404).json({ message: 'user not found' })
            
            //compare pssword
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) return res.status(400).json({message: 'Invalid credentials'});

            //Genarate token
            const token = jwt.sign(
                {id: user_id, isAdmin: user.isAdmin },
                process.env.JWT_SECRET,
                { expiresIn: '7d' } // token valid 7 dys

            );

            //send cookie
            res.cookie('token',token, {
                httpOnly:true,
                secure: process.env.NODE_ENV ==='production',
                sameSite: 'strict',
                maxAge:7*24*60*1000 // 7dys
            })
            .status(200)
      .json({ 
        message: 'Login successful',
        user: { id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin }
      });
            
    } catch (err) {
     res.status(500).json({ message: 'Server Error', error: err.message });
  }
};