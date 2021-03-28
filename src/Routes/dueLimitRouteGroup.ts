import { Group } from '../deps.ts';
import { DueLimitController } from "../Controllers/index.ts";

export function dueLimitRouteGroup(g: Group){

    g.get("s/", DueLimitController.getAll)                   // "/duelimits"
     .post("/", DueLimitController.createOne)                // "/duelimit"
     .delete("/:id", DueLimitController.deleteOneById)       // "/duelimit/:id"

}