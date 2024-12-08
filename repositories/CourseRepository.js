const pool = require("../users_db"); // Подключение к вашей базе данных

class CourseRepository {
    static async fetchCourses() {
        try {
            const result = await pool.query("SELECT * FROM courses");
            return result.rows;
        } catch (error) {
            throw new Error("Ошибка при чтении курсов: " + error.message);
        }
    }

    static async createCourse(language, level, description) {
        try {
            await pool.query("INSERT INTO courses (language, level, description) VALUES ($1, $2, $3)", [language, level, description]);
        } catch (error) {
            throw new Error("Ошибка при создании курса: " + error.message);
        }
    }
}

module.exports = CourseRepository;