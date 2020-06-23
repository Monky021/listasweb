const { Router } = require('express');
const router = Router();

const {signup, logout, renderSignUpForm, signin, signinForm }= require('../controllers/users.controllers');

router.get('/users/signup', renderSignUpForm);

router.post('/users/signup', signup );

router.get('/users/signin', signinForm);

router.post('/users/signin', signin);

router.get('/users/logout', logout);
module.exports = router;