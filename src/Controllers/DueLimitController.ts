import { Context } from '../deps.ts';
import { DueLimit } from '../Models/index.ts';

export class DueLimitController{

    static async getAll(ctx: Context){
        try{
            let duelimitRecords = await DueLimit.select('id','days').all() as Partial<{days: number, id: number, value: number, name: string}>[];
            duelimitRecords = duelimitRecords.map(({id, days}) => ({
                id,
                days,
                value: days,
                title: `${days} ${days === 1 ? 'Day' : 'Days'}`
            }))
            const res = {
                total: duelimitRecords.length,
                type: "all",
                data: duelimitRecords,
            };
            return ctx.json(res, 200);
        }catch(e){
            return ctx.json({
                status: 500,
                message: "Error Occured",
                error: e.message ?? "Error log not found",
            }, 500);
        }
    }

    static async createOne(ctx: Context){
        try {
            const {days} = await ctx.body as {days: number};
            if(days){
                const duelimit = await DueLimit.create({days});
                if(duelimit){
                    const res = {
                        status: 201,
                        message: `DueLimit of ${duelimit.days} ${duelimit.days === 1 ? 'Day' : 'Days'} created`,
                        data: {
                            ...duelimit,
                            value: duelimit.days,
                            title: `${duelimit.days} ${duelimit.days === 1 ? 'Day' : 'Days'}`
                        },
                    }
                    return ctx.json(res, res.status);
                }
            }
            throw Error("Required payload incorrect.");
        }catch(e){
            console.error(e);
            return ctx.json({
                status: 400,
                message: "Error Occured",
                error: e.message ?? "Error log not found",
            }, 400);
        }
    }

    static async deleteOneById(ctx: Context){
        try{
            const { id } = ctx.params as {id: string};
            const duelimit = await DueLimit.find(id);
            if(duelimit){
                await DueLimit.deleteById(id);
                ctx.response.status = 204;
                return "";
            }
            throw Error(`DueLimit id "${id}" not valid.`);
        }catch(e){
            return ctx.json({
                status: 400,
                message: "Error Occured",
                error: e.message ?? undefined,
            }, 400);
        }
    }

}