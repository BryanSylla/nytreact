const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");
var request = require('request');
 
// Matches with "/api/articles/saved"
router.route("/saved")
  .get(articlesController.findAllsaved)
  .post(articlesController.create);

// Matches with "/api/articles/saved/:id"
router
  .route("/saved/:id")
  .get(articlesController.findById)
  .put(articlesController.update)
  .delete(articlesController.remove);

module.exports = router;
