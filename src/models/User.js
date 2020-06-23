const mongoose = require('mongoose');
const {Schema, model } = mongoose;
const bcrypt = require('bcrypt');

const userSchema =new Schema({
    nombre: {type:String, required: true},
    correo: {type:String, required: true, unique: true},
    password: { type:String, required: true }
    
},{
    timestamps: true
});
userSchema.methods.encryptPassword = async password =>{
    const salt = await bcrypt.genSalt(15);
    return await bcrypt.hash(password, salt);
}

userSchema.methods.matchPassword= async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = model('User', userSchema );