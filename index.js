//Crear servidor
require('dotenv').config()
const methodOverride = require('method-override');
const express = require('express')
const routerTodos = require('./routes')
const bodyParser = require('body-parser')



const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true}));
app.set('view engine', 'ejs');

//Middleware a nivel de aplicación
app.use((req, res, next)=>{
    /*console.log(req)
    console.log(req.params)
    console.log(req.query)
    console.log(req.ip)
    console.log('Middleware de aplicación')
    console.log(req.method, req.url)*/
    next()
})

//Rutas
routerTodos(app)

app.set('views','./src/views')
app.set('view engine', 'ejs')

//Levantando el servidor para escuchar por el puerto 3000
app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
})