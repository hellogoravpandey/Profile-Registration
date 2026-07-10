const validator = require("validator");

function validateUser(req, res, next) {
    const { firstName, lastName, email, password } = req.body;

    // First Name
    if (!firstName || firstName.trim() === "") {
        return res.status(400).json({
            message: "First name is required."
        });
    }

    if (firstName.trim().length < 2 || firstName.trim().length > 50) {
        return res.status(400).json({
            message: "First name must be between 2 and 50 characters."
        });
    }

    if (!/^[A-Za-z]+$/.test(firstName.trim())) {
        return res.status(400).json({
            message: "First name should contain only letters."
        });
    }

    // Last Name (Optional)
    if (lastName) {
        if (lastName.trim().length < 2 || lastName.trim().length > 50) {
            return res.status(400).json({
                message: "Last name must be between 2 and 50 characters."
            });
        }

        if (!/^[A-Za-z]+$/.test(lastName.trim())) {
            return res.status(400).json({
                message: "Last name should contain only letters."
            });
        }
    }

    // Email
    if (!email || email.trim() === "") {
        return res.status(400).json({
            message: "Email is required."
        });
    }

    if (!validator.isEmail(email.trim())) {
        return res.status(400).json({
            message: "Please enter a valid email."
        });
    }

    //password validation
        // Required
        // At least 8 characters
        // At most 64 or 128 characters (to prevent abuse while allowing password managers)
        // At least one uppercase letter
        // At least one lowercase letter
        // At least one digit
        // At least one special character
        // No leading/trailing spaces (or trim and reject if altered)

    const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,64}$/;
     if (!passwordRegex.test(password)) {
         return res.status(400).json({message:
            "Password must be 8-64 characters and include an uppercase letter, lowercase letter, number, and special character."
    });
}

    // Normalize values before the controller uses them
    req.body.firstName = firstName.trim();
    req.body.lastName = lastName ? lastName.trim() : "";
    req.body.email = email.trim().toLowerCase();

    next();
}

module.exports ={validateUser};