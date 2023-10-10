const { express } = require("../config/plugins");
const { getIndex } = require("../controllers/mainControllers");

const router = express.Router();

router.get('/hard', getIndex);

module.exports = {
    hardRoutes: router,
}