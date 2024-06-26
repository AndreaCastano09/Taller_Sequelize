const router = require('express').Router()
const { connectClient } = require ('../db/postgres')
const Todo = require('../src/models/todoModel')

router.get('/add', async (req, res) => {
    res.render('todos/add'); // Renderiza el formulario de agregar tarea
});

//store
// Ruta POST para procesar la creación de tarea
router.post('/', async (req, res) => {
    try {
        const { title, completed } = req.body;
        await Todo.create({ title: req.body.title, completed: req.body.completed == 'on' ? true : false });
        res.redirect('todos'); // Redirige a la lista de tareas
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.get('/', async (req, res) => {
    //console.log('GET /api/v1/todos')
    const client = await connectClient();
    try{
        const result = await client.query('SELECT * FROM todos');
        res.render('todos/index', {todos: result.rows});
    } catch (error) {
        res.status(500).send(error.message);
    } finally{
        await client.end();
    }

});

//Update
router.put('/:id', async (req, res) => {
    try {
        const { title, completed } = req.body;
        const todo = await Todo.findByPk(req.params.id);
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
        await todo.update({ title, completed: completed === true });
        res.json(todo); // Devuelve la tarea actualizada
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//DELETE
router.delete('/:id', async (req, res) => {
    try {
        const result = await Todo.destroy({
            where: { id: req.params.id }
        });
        if (result === 0) {
            return res.status(404).send('Todo not found');
        }
        res.redirect('/api/v1/todos');
    } catch (error) {
        res.status(500).send('Error al eliminar el todo: ' + error.message);
    }
});

module.exports = router;