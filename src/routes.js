const express = require("express");
const validate = require("express-validation");

const routes = express.Router();

const authMiddleware = require("./app/middlewares/auth");

const controllers = require("./app/controllers");
const validators = require("./app/validators");

routes.post(
  "/users",
  validate(validators.User),
  controllers.UserController.store
);
routes.post(
  "/sessions",
  validate(validators.Session),
  controllers.SessionController.store
);

//toda rota a partir dessa estará configurada para não aceitar caso o usario não esteja autenticado
routes.use(authMiddleware);

/**
 * Ads
 */
routes.get("/ads", controllers.AdController.index);
routes.get("/ads/:id", controllers.AdController.show);
routes.post("/ads", validate(validators.Ad), controllers.AdController.store);
routes.put(
  "/ads/:id",
  validate(validators.Ad),
  controllers.AdController.update
);
routes.delete("/ads/:id", controllers.AdController.destroy);

/**
 * Purchase
 */
routes.post(
  "/purchase",
  validate(validators.Purchase),
  controllers.PurchaseController.store
);
routes.get("/purchase", controllers.ApproveController.show);
routes.put("/purchase/:id", controllers.ApproveController.put);

module.exports = routes;
