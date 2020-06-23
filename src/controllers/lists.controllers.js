const listCtrl = {};
const List = require('../models/List');

listCtrl.renderListForm = (req, res) => {
    res.render('list/new-list')
}

listCtrl.createNewList = async (req, res) => {
    console.log(req.file);
    //const { title, descripcion, item1, item2, item3, item4, item5 } = req.body;
    //const {filename, path, originalname, mimetype, size} = req.file;
    //const newList = new List({ title, descripcion, item1, item2, item3, item4, item5 });
    //const newImg = new List({filename, path, originalname, mimetype, size})
    const list = new List(); 
    list.user = req.user.id;
    list.title = req.body.title;
    list.descripcion = req.body.descripcion;
    list.item1 = req.body.item1;
    list.item2 = req.body.item2;
    list.item3 = req.body.item3;
    list.item4 = req.body.item4;
    list.item5 = req.body.item5;
    list.filename = req.file.filename;
    list.path = '/img/uploads/' + req.file.filename;
    list.originalname = req.file.originalname;
    list.mimetype = req.file.mimetype;
    list.size = req.file.size;
    await list.save();
    //await newImg.save();
    req.flash('mensaje', 'La lista ha sido creada :)');
    res.redirect('/lists')
}
listCtrl.renderList = async (req, res) => {
    const lists = await List.find({ user: req.user.id }).sort({ date: 'desc' });

    res.render('list/all-lists', { lists })
}

listCtrl.renderEditForm = async (req, res) => {
    const list = await List.findById(req.params.id);
    if (list.user != req.user.id) {
        req.flash('mensaje_error', 'Acceso denegado')
        return res.redirect('/lists')
    }
    res.render('list/edit-list', { list })
}

listCtrl.updateList = async (req, res) => {
    const { title, descripcion, item1, item2, item3, item4, item5 } = req.body;
    await List.findByIdAndUpdate(req.params.id, { title, descripcion, item1, item2, item3, item4, item5 });
    req.flash('mensaje', 'Su lista se actualizo con exito!');
    res.redirect('/lists')
}
listCtrl.deleteList = async (req, res) => {
    const list = await List.findByIdAndDelete(req.params.id);
    if (list.user != req.user.id) {
        req.flash('mensaje_error', 'Acceso denegado')
        return res.redirect('/lists')
    }
    req.flash('mensaje', 'Su lista se elimino con exito!');
    res.redirect('/lists');
}

module.exports = listCtrl;