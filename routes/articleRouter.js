const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router.get('/', articleController.getArticles);
router.get('/category/:category', articleController.getArticlesByCategory);
router.get('/author/:author', articleController.getArticlesByAuthor);
router.get(
  '/author/:author/category/:category',
  articleController.getArticlesByAuthorAndCategory
);
router.post('/', articleController.createArticle);
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);

module.exports = router;
