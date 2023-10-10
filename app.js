const { express } = require("./config/plugins");
const path = require('path');
const { mainRoutes } = require('./routes/index');

const app = express();

app.use(express.urlencoded({ extended: true })); // para usar los datos que llegan de los formularios
app.use(express.json()); // Para leer archivos .JSON

app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, "./views/"),
])

app.use('/', mainRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}...`);
})