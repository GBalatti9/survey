const { express } = require("../config/plugins");
const { getIndex } = require("../controllers/mainControllers");

const router = express.Router();

router.get('/medium', getIndex);

module.exports = {
    mediumRoutes: router,
}