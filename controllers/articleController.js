const Article = require('../models/Articles');

// Helper function to handle errors
const handleError = (res, error, message = 'Internal server error') => {
  res.status(500).json({
    success: false,
    message,
    error: error.message,
  });
};

// Display list of all articles
exports.getArticles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const articles = await Article.find().skip(skip).limit(limit);
    const total = await Article.countDocuments();

    res.status(200).json({
      success: true,
      message: `Total articles: ${total}`,
      data: articles,
      page,
      limit,
    });
  } catch (error) {
    handleError(res, error);
  }
};
// Display detail page for a specific article
exports.getArticles = async (req, res) => {
  try {
    const { category, sort } = req.query;
    const query = {};
    if (category) query.category = category;

    const sortOptions = {};
    if (sort) sortOptions[sort] = 1; // Ascending order

    const articles = await Article.find(query).sort(sortOptions);
    res.status(200).json({
      success: true,
      message: `Total articles: ${articles.length}`,
      data: articles,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Display articles by category
exports.getArticlesByCategory = async (req, res) => {
  try {
    const articles = await Article.find({ category: req.params.category });
    res.status(200).json({
      success: true,
      message: `Total articles: ${articles.length}`,
      data: articles,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Display articles by author
exports.getArticlesByAuthor = async (req, res) => {
  try {
    const articles = await Article.find({ author: req.params.author });
    res.status(200).json({
      success: true,
      message: `Total articles: ${articles.length}`,
      data: articles,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Display articles by author and category
exports.getArticlesByAuthorAndCategory = async (req, res) => {
  try {
    const articles = await Article.find({
      author: req.params.author,
      category: req.params.category,
    });
    res.status(200).json({
      success: true,
      message: `Total articles: ${articles.length}`,
      data: articles,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Handle article creation on POST
exports.createArticle = async (req, res) => {
  try {
    const { title, content, author, college } = req.body;

    if (!author) {
      return res.status(400).json({
        success: false,
        message: 'Author ID is required',
      });
    }

    const article = new Article({ title, content, author, college });
    await article.save();

    res.status(201).json({
      success: true,
      message: 'Article created successfully',
      data: article,
    });
  } catch (error) {
    handleError(res, error, 'Failed to create article');
  }
};

// Handle article update on PUT
exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Article updated successfully',
      data: article,
    });
  } catch (error) {
    handleError(res, error, 'Failed to update article');
  }
};

// Handle article delete on DELETE
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Article deleted successfully',
      data: article,
    });
  } catch (error) {
    handleError(res, error, 'Failed to delete article');
  }
};
