//--------------------------------------------------------------
// Ressources
//
import dayjs from "dayjs";
import express from "express";
import database from "./libs/database.js";

//--------------------------------------------------------------
// Liaisons Middlewares
//
import methodMiddlewares from "./middlewares/method.js";
import errorsMiddlewares from "./middlewares/errors.js";

//--------------------------------------------------------------
// Liaison dossiers
//
import planetsRoutes from "./routes/planets.routes.js";
import elementRoutes from "./routes/elements.routes.js";


database();
const app = express();

//--------------------------------------------------------------
// MiddleWares app use
//
app.use(express.json());
app.use(methodMiddlewares);
app.use('/planets', planetsRoutes);
app.use('/elements', elementRoutes);


export default app;

