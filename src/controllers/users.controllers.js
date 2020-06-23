const { render } = require("../server");
const User = require('../models/User')

const userCtrl = {};
const passport = require('passport');


userCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
}

userCtrl.signup = async (req, res) => {
    const errors = [];
    const { nombre, correo, password, confirma_password } = req.body;
    if (password != confirma_password) {
        errors.push({ text: 'Las contraseñas no coinciden' });
    }
    if (password.length <= 6) {
        errors.push({ text: 'La contraseña debe ser tener mas de 6 caracteres' });
    }
    if (errors.length > 0) {
        res.render('users/signup', { 
            errors,
            nombre,
            correo
         });
    } else {
        const correoUsers = await User.findOne({correo: correo});
        if(correoUsers){
            req.flash('mensaje_error', 'El correo ya esta en uso');
            res.redirect('/users/signup');
        }else{
            const newUser = new User ({nombre, correo, password});
            newUser.password =await newUser.encryptPassword(password)
            await newUser.save();
            req.flash('mensaje', 'Usuario creado :)');
            res.redirect('/users/signin');
            console.log(newUser)
            
        }
    }
    

    
};

userCtrl.signinForm = (req, res) => {
    res.render('users/signin')
}

userCtrl.signin = passport.authenticate('local',{
    failureRedirect: '/users/signin',
    successRedirect:'/lists',
    failureFlash: true
});

userCtrl.logout = (req, res) => {
    req.logout();
    req.flash('mensaje', 'Sesión cerrada :)');
    res.redirect('/users/signin');
}


module.exports = userCtrl;