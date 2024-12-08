const ReviewRepository = require("../repositories/ReviewRepository");

class ReviewController {
    static async getReviews(req, res) {
        try {
            const reviews = await ReviewRepository.fetchReviews();
            res.render("reviews", { user: req.user, reviews }); // Передача данных о пользователе и отзывах в шаблон
        } catch (error) {
            res.json({ message: "Ошибка при получении отзывов", error: error.message });
        }
    }

    static async createReview(req, res) {
        const { review_text } = req.body;
        try {
            await ReviewRepository.createReview(req.user.id, review_text);
            return res.redirect("/reviews");
        } catch (error) {
            res.json({ message: "Ошибка при создании отзыва", error: error.message });
        }
    }
}

module.exports = ReviewController;