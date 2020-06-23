const passport = require('passport');
const localStrategy = require('passport-local').Strategy; 
const User = require('../models/User');

passport.use(new localStrategy({
    usernameField: 'correo',
    passwordField: 'password'
}, async (correo, password, done )=> {


    //Verificacion de corro en BD
    const user = await User.findOne({correo})
    if(!user){
        return done(null, false, {mensaje :'Usuario no encontrado'})
    }else{
        //Verificacion de contraseña
        const match = await user.matchPassword(password);
        if(match){
            return done(null, user);

        }else {
            return done(null, false, {mensaje: 'contraseña incorrecta'});
        }
    }
}));

passport.serializeUser( (user, done)=> {
    done(null, user.id);
});
passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user) =>{
        done(err, user);
    })
});