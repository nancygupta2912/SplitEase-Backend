const authService = require("../services/auth.service");

const signup = async (req, res) => {

    try {

        const result = await authService.signup(req.body);

        return res.status(201).json(result);

    } catch (error) {

        return res.status(error.status || 500).json({
            message: error.message
        });

    }

};

const login = async (req, res) => {

    try {

        const result = await authService.login(req.body);

        return res.status(200).json(result);

    } catch (error) {

        return res.status(error.status || 500).json({
            message: error.message
        });

    }

};

const getProfile = async (req, res) => {

    try {

        const result = await authService.getProfile(req.user.id);

        return res.status(200).json(result);

    } catch (error) {

        return res.status(error.status || 500).json({
            message: error.message
        });

    }

};

module.exports = {
    signup,
    login,
    getProfile
};