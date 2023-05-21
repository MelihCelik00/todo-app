const Model = require("../../models/");
const User = Model.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    try {
        let user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user)  
            return res.status(409).json({ message: 'There is no such user!' });
        const success = await bcrypt.compare(req.body.password, user.password);
        const token = jwt
        if (success)  
            res.status(200).json({user, token})
        else
            res.status(409).json({ message: 'Login failed!' });
    } catch (error) {
        next(error);
    }
};

const signup = async (req, res, next) => {
    try {
        let users = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (users)  
            return res.status(409).json({ message: 'This mail already in use!' });
        
        // hash password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        const userId = user.id;
        const token = jwt.sign({userId}, 'secret', {expiresIn: '1hr'});

        return res.status(200).json({user, token});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    login,
    signup
};
