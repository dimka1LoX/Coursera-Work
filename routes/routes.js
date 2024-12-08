const router = require("express").Router();

const CourseController = require("../controllers/CourseController");
const PageController = require("../controllers/PageController");
const AuthController = require("../controllers/AuthController");
const ReviewController = require("../controllers/ReviewController");
const Middleware = require("../middleware");
const UserRepository = require("../repositories/UserRepository");
router.use(Middleware.contentUnlock);

router.get("/", (req, res) => {
    res.redirect('/index'); // перенаправление на новую главную страницу
});

router.get("/authorization", PageController.authorization);
router.get("/registration", PageController.registration);
router.get("/index", (req, res) => {
    res.render("index", { user: req.user }); // передайте данные пользователя, если необходимо
});
router.get('/courses', Middleware.ident, CourseController.getCourses);

console.log('Register method:', AuthController.register);
console.log('Login method:', AuthController.login);
console.log('Logout method:', AuthController.logout);


router.post("/register", AuthController.register);
router.post("/logout", AuthController.logout);
router.post("/login", AuthController.login);



// Другие маршруты...

// Маршрут для страницы расписания
router.get("/raspis", (req, res) => {
    res.render("raspis"); // Отображение страницы raspis.ejs
});

// Получение курсов
router.get("/courses", CourseController.getCourses);

// Запись на курс
router.post("/courses", CourseController.createCourse);

// Получение отзывов
router.get("/reviews", Middleware.ident, ReviewController.getReviews);

// Запись отзыва
router.post("/reviews", Middleware.ident, ReviewController.createReview);


module.exports = router;