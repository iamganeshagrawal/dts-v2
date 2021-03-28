import { Group } from '../deps.ts';
import { SectionController } from "../Controllers/index.ts";

export function sectionRouteGroup(g: Group){

    g.get("s/", SectionController.getAll)                   // "/sections"
     .get("s/all", SectionController.getAll)                // "/sections/all"
     .get("s/:type", SectionController.getAllByType)        // "/sections/:type"
     .get("/types", SectionController.availableTypes)       // "/section/types"
     .post("/", SectionController.createOne)                // "/section"
     .get("/:id", SectionController.getOneById)             // "/section/:id"
     .delete("/:id", SectionController.deleteOneById)       // "/section/:id"

}