const { express, cors } = require("./config/plugins");
const path = require('path');
const { mainRoutes } = require('./routes/index');

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: 'GET,POST,OPTIONS,PUT,PATCH,DELETE',
    allowedHeaders: 'X-Requested-With,content-type',
}));

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