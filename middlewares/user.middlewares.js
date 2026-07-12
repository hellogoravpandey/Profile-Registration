const validator = require("validator");
const {BadRequestError}=require("../middlewares/error.middlewares")
function validateUser(req, res, next) {
    const { firstName, lastName, email, password } = req.body;
    // First Name
    if (!firstName || firstName.trim() === "") {
         throw new BadRequestError('first name is required');
    }
    
    if (firstName.trim().length < 2 || firstName.trim().length > 50) {
        throw new BadRequestError('First name must be between 2 and 50 characters.');
    }

    if (!/^[A-Za-z]+$/.test(firstName.trim())) {
        throw new BadRequestError('First name should contain only letters.');
    }

    // Last Name (Optional)
    if (lastName) {
        if (lastName.trim().length < 2 || lastName.trim().length > 50) {
            throw new BadRequestError('Last name must be between 2 and 50 characters.');
        }

        if (!/^[A-Za-z]+$/.test(lastName.trim())) {
            throw new BadRequestError('Last name should contain only letters.');
        }
    }

    // Email
    if (!email || email.trim() === "") {
        throw new BadRequestError('Email is required.');
    }

    if (!validator.isEmail(email.trim())) {
        throw new BadRequestError('Please enter a valid email.');
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
        throw new BadRequestError('Password must be 8-64 characters and include an uppercase letter, lowercase letter, number, and special character.');
        }

   
    // Normalize values before the controller uses them
    req.body.firstName = firstName.trim();
    req.body.lastName = lastName ? lastName.trim() : "";
    req.body.email = email.trim().toLowerCase();

    next();
}



//uploaded file validator
function validateUploadedFiles(req, res, next) {
    const files = req.files; // fil
    //File exist validation
    if(!files){
        return next(new BadRequestError("Input the files"));
    }
    if(!files.profilePhoto){
        return next(new BadRequestError("profile photo is required"));   
    }
    if(!files.profilePdf){
        return next(new BadRequestError("profile pdf is required"));   
    }
    if(!files.profileVideo){
        return next(new BadRequestError("profile video is required"));   
    }

    //Size Validation
    // Profile Image
    if (files.profilePhoto) {
        const profilePhoto = files.profilePhoto[0];
        if (profilePhoto.size > 2 * 1024 * 1024) {
            return next(new BadRequestError('Profile image must be less than 2 MB.'))
        }
    }

    // Resume
    if (files.profilePdf) {
        const profilePdf = files.profilePdf[0];
        if (profilePdf.size > 5 * 1024 * 1024) {
            return next(new BadRequestError('Pdf must be less than 5 MB.'));
        }
    }

    // video
    if (files.profileVideo) {
        const profileVideo = files.profileVideo[0];
        if (profileVideo.size > 3 * 1024 * 1024) {
            return next(new BadRequestError('Video must be less than 3 MB.'));
        }
    }
    next();
}


module.exports ={validateUser, validateUploadedFiles};