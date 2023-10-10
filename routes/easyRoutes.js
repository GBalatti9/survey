const { express } = require("../config/plugins");
const { getIndex } = require("../controllers/easyControllers");

const router = express.Router();

router.get('/easy', getIndex);

module.exports = {
    easyRoutes: router,
}