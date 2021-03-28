// import configStore from './config.ts';
import database from './database.ts';
import {FILE_ROUTES} from './misc.ts';
import { path, Database, Application, logger } from './deps.ts';
import { apiRouteGroup } from "./Routes/index.ts";

const BASEDIR = "C:\\Users\\gmego\\Desktop\\Projects\\dts-v2";

const db : Database = database(path.join(BASEDIR, FILE_ROUTES["database"]));

const app : Application = new Application();

app.use(logger());

app.get("/", () => {
    return "Hello, DTSv2!";
});

apiRouteGroup(app.group("/api/v0.1"));      // "/api/v0.1*"

app.start({port: 5000});
console.log(`🚀 App started at http://localhost:5000/`);
