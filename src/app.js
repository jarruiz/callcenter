const express = require('express');
const logger = require('morgan');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const indexRoutes = require('./routes/index.js');
const router = express.Router();


/* configuraciones del servidor */
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "view"))
app.set("view engine", "ejs")


/*middlewares*/
app.use(logger("dev"));
app.use((req, res, next) => {
    console.log('${req.url} -${req.method}');
    next();
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*rutas*/
app.use(router)
app.use('/', indexRoutes)


/*archivos estáticos*/
//app.use(express.static(path.join(__dirname, 'public')))

/* Iniciar servidor*/
app.listen(app.get('port'), () => console.log("Servidor corriendo en el puerto: ", app.get('port')));


