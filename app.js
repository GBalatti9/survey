const { express } = require("./config/plugins");
const path = require('path');
const { mainRoutes } = require('./routes/index');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, "./views/"),
])

app.use('/', mainRoutes);

app.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '0');
    next();
});

app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}...`);
})