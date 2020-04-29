/* 
Routes:
    /api/tutorials - GET, POST, DELETE
    /api/tutorials/:id - GET, PUT DELETE
    /api/tutorials/published - GET
*/

module.exports = (app) => {
  const tutorials = require("../controllers/tutorial.controller.js");

  let router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorials.create);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial by id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Delete all tutorials
  router.delete("/", tutorials.deleteAll);

  app.use("/api/tutorials", router);
};
