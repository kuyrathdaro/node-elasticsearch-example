import express from 'express';
import controller from '../controllers';

const routes = express.Router();

routes.route("/").get(controller.getQuotes);
routes.route("/new").post(controller.addQuote);

export default routes;