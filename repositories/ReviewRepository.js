const pool = require("../users_db"); // Подключение к вашей базе данных

class ReviewRepository {
    static async fetchReviews() {
        try {
            const result = await pool.query("SELECT r.id, r.review_text, r.created_at, u.email FROM reviews r JOIN users u ON r.user_id = u.id ORDER BY r.created_at DESC");
            return result.rows;
        } catch (error) {
            throw new Error("Ошибка при чтении отзывов: " + error.message);
        }
    }

    static async createReview(userId, reviewText) {
        try {
            await pool.query("INSERT INTO reviews (user_id, review_text) VALUES ($1, $2)", [userId, reviewText]);
        } catch (error) {
            throw new Error("Ошибка при создании отзыва: " + error.message);
        }
    }
}

module.exports = ReviewRepository;