const express = require('express')
const todosFilesRouter = require('./todos.api.files.router')
const todosApiRouter = require('./todos.api.router')
const methodOverride = require('method-override');
const todosRouter = require('./todos.router')

function routerTodos(app){

    const router = express.Router()
    app.use('/api/v1', router)
    router.use('/todos', todosRouter)
    //router.use('/todos/crear', todosRouter)
    router.use('/files/todos', todosFilesRouter)
    router.use('/todos/api', todosApiRouter)
}

module.exports = routerTodos