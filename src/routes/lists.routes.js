const { Router } = require('express');
const router = Router();
const { 
    renderListForm, 
    createNewList, 
    renderList, 
    renderEditForm, 
    updateList, 
    deleteList
 } = require('../controllers/lists.controllers');
const { isAuthenticated} = require('../helpers/auth');
// Creacion de listas
router.get('/lists/add',isAuthenticated, renderListForm);

router.post('/lists/new-list', isAuthenticated,createNewList);

//Obtener todas las listas
router.get('/lists', isAuthenticated,renderList);

//Editar listas
router.get('/list/edit/:id', isAuthenticated,renderEditForm);
router.put('/list/edit/:id', updateList);

// Eliminar lista 
router.delete('/list/delete/:id', isAuthenticated,deleteList)

module.exports = router;