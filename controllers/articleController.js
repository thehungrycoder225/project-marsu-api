const Article = require('../models/Articles');
const College = require('../models/Colleges');
const Author = require('../models/Users');

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

exports.createArticle = async (req, res) => {
  try {
    const { title, content, author, college } = req.body;

    // Validate required fields
    if (!title || !content || !author || !college) {
      return res.status(400).json({
        success: false,
        message: 'Title, content, author, and college are required',
      });
    }

    // Check if author and college exist in parallel
    const [authorExists, collegeExists] = await Promise.all([
      Author.findById(author),
      College.findById(college),
    ]);

    if (!authorExists) {
      return res.status(404).json({
        success: false,
        message: 'Author not found',
      });
    }

    if (!collegeExists) {
      return res.status(404).json({
        success: false,
        message: 'College not found',
      });
    }

    // Create the article
    const article = new Article({ title, content, author, college });
    await article.save();

    // Update college and author references
    collegeExists.articles.push(article._id);
    authorExists.posts.push(article._id);

    // Save college and author updates
    await Promise.all([collegeExists.save(), authorExists.save()]);

    res.status(201).json({
      success: true,
      message: 'Article created successfully',
      data: article,
    });
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create article',
    });
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

// delete all articles with their respective authors and colleges
exports.deleteAllArticles = async (req, res) => {
  try {
    await Article.deleteMany();
    res.status(200).json({
      success: true,
      message: 'All articles deleted successfully',
    });
  } catch (error) {
    handleError(res, error, 'Failed to delete all articles');
  }
};
