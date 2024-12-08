const CourseRepository = require("../repositories/CourseRepository");

class CourseController {
    static async getCourses(req, res) {
        try {
            const courses = await CourseRepository.fetchCourses();
            res.render("courses", { user: req.user, courses }); // Передаём данные о курсах и пользователе
        } catch (error) {
            console.error('Error fetching courses:', error);
            res.status(500).json({ message: "Ошибка при получении курсов", error: error.message });
        }
    }

    static async createCourse(req, res) {
        const { language, level, description } = req.body;
        try {
            await CourseRepository.createCourse(language, level, description);
            return res.redirect("/courses");
        } catch (error) {
            res.json({ message: "Ошибка при создании курса", error: error.message });
        }
    }
    
    
}

module.exports = CourseController;