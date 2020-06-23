const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const {format} = require('timeago.js')

//inicializaciones
const app = express();
require('./config/passport');

// configuraciones
app.set('port', process.env.PORT || 5000);
app.set('views',path.join(__dirname , 'views') );
app.engine('.hbs', exphbs({
    defaultLayout:'main' ,
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Intermediarios 
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); 

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),    
    filename: (req, file, cb, filename) => {
        cb(null, uuidv4() + path.extname( file.originalname));
    }
});
app.use(multer({storage: storage}).single('image'));
app.use(methodOverride('_method'));
app.use(session({
     secret: 'secreto',
     resave: true,
     saveUninitialized: true
 }));
app.use(passport.initialize());    
app.use(passport.session());
app.use(flash());



//Variables globales 
app.use((req, res, next) => {
     res.locals.mensaje = req.flash('mensaje');
     res.locals.mensaje_error = req.flash('mensaje_error');
     res.locals.error = req.flash('error');
     res.locals.user = req.user || null;
     next();
 });
app.use((req, res, next)=>{
    app.locals.format = format;
    next();
})
//rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/lists.routes'));
app.use(require('./routes/user.routes'));

//archivos estaticos 
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;