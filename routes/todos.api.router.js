const router = require('express').Router()
const client = require ('../db/postgres')
//const sequelize = require('../db/sequileze')
//importamos sequelize
//const sequelize = require('../db/sequileze');
const todoModel = require("../src/models/todoModel")

//index
router.get('/', async (req, res) => {
    try{
        const todos = await todoModel.findAll();
        res.json(todos);
    } catch (error){
        res.status(500).send(error.message);
    }
});
    //luego probamos si la conexion de la base de datos la tenemos correcta con sequileze
    /*try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }*/
    /*console.log('GET /api/v1/todos')
    //obtener todos los "todos" de la BD
    //http://localhost:3000/api/v1/todos
await client.connect()
const result = await client.query('SELECT * FROM todos')
console.log(result)
await client.end()
res.json(result.rows)
})*/

//store
router.post('/', async (req, res) => {
    try {
        const { title, completed } = req.body;
        await todoModel.create({ title: req.body.title, complete: req.body.complete == 'on' ? true : false });
        res.status(201).json({ message: 'Todo created successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//show
router.get('/:id', async (req, res) => {
    try {
        const todos = await todoModel.findByPk(req.params.id);
        if (todos) {
            res.json(todos);
        } else {
            res.status(404).send('Todo not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching todo');
    }
});    

//Update
router.put('/:id', async (req, res) => {
    try {
        const { title, completed } = req.body;
        const todo = await todoModel.update(req.params.id);
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
        await todo.update({ title, completed });
        res.json({ message: 'Todo updated successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Delete
router.delete('/:id', async (req, res) => {
    try {
        const result = await todoModel.destroy({
            where: { id: req.params.id }
        });
        if (result === 0) {
            return res.status(404).send('Todo not found');
        }
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).send('Error al eliminar el todo: ' + error.message);
    }
});

module.exports = router;