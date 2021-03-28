import {Group, Context} from '../deps.ts';
import {dueLimitRouteGroup} from './dueLimitRouteGroup.ts';
import {sectionRouteGroup} from './sectionRouteGroup.ts';

export function apiRouteGroup(g: Group){
    g.get("/", (ctx: Context) => {
        return ctx.json({
            status: 200,
            message: "API Working Fine!",
        }, 200);
    });

    sectionRouteGroup(g.group("/section"));     // "/section*"
    dueLimitRouteGroup(g.group("/duelimit"));   // "/duelimit*"
}