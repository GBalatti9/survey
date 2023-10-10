const { express } = require("../config/plugins");
const { getIndex, postIndex, nextQuestion, getQuestion } = require("../controllers/mainControllers");

const router = express.Router();

// @GET -->/
router.get('/', getIndex);

// POST --> /
router.post('/', postIndex);

// POST --> /nextQuestion
router.post('/nextQuestion', nextQuestion);

// GET --> /
// router.get('/question/:index', getQuestion);
router.get('/question/', getQuestion);

module.exports = {
    mainRoutes: router,
}
