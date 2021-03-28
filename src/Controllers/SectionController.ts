import { Context } from '../deps.ts';
import { Section, sectionTypes } from '../Models/index.ts';

export class SectionController{

    private static validSectionTypes = Object.values(sectionTypes);

    static async getAll(ctx: Context){
        try{
            const sections = await Section.select('id','name','type').all();
            const res = {
                total: sections.length,
                type: "all",
                sections: sections,
            };
            return ctx.json(res, 200);
        }catch(e){
            console.error(e);
            return ctx.json({
                status: 500,
                message: "Error Occured",
                error: e.message ?? "Error log not found",
            }, 500);
        }
    }

    static async getOneById(ctx: Context){
        try{
            const { id } = ctx.params as {id: string};
            const section = await Section.select('id', 'name', 'type').find(id);
            return ctx.json(section, 200);
        }catch(e){
            console.error(e);
            return ctx.json({
                status: 500,
                message: "Error Occured",
                error: e.message ?? "Error log not found",
            }, 500);
        }
        
    }

    static async getAllByType(ctx: Context){
        try{
            const { type } = ctx.params as {type: string};
            if(SectionController.validSectionTypes.some(t => t===type)){
                const sections = await Section.select('id','name','type').where({type}).get();
                const res = {
                    total: sections.length,
                    type,
                    sections: sections,
                };
                return ctx.json(res, 200);
            }
            throw Error("Type not valid");
        }catch(e){
            console.error(e);
            return ctx.json({
                status: 500,
                message: "Error Occured",
                error: e.message ?? "Error log not found",
            }, 500);
        }
    }

    static async createOne(ctx: Context){
        try {
            const {name, type} = await ctx.body as {name: string, type: string};
            if(name && type && SectionController.validSectionTypes.some(t => t===type)){
                const section = await Section.create({name, type});
                if(section){
                    const res = {
                        status: 201,
                        message: `Section "${section.name}" under "${section.type}" created.`,
                        section: section,
                    }
                    return ctx.json(res, res.status);
                }
            }
            throw Error("Required payload incorrect.");
        }catch(e){
            console.error(e);
            return ctx.json({
                status: 500,
                message: "Error Occured",
                error: e.message ?? "Error log not found",
            }, 500);
        }
    }

    static async deleteOneById(ctx: Context){
        try{
            const { id } = ctx.params as {id: string};
            const section = await Section.find(id);
            if(section){
                await Section.deleteById(id);
                ctx.response.status = 204;
                return "";
            }
            throw Error(`Section id "${id}" not valid.`);
        }catch(e){
            return ctx.json({
                status: 400,
                message: "Error Occured",
                error: e.message ?? undefined,
            }, 400);
        }
    }

    static availableTypes(ctx: Context){
        const data = Object.entries(sectionTypes).map(([k, v]) => ({title: k, type: v}))
        return ctx.json({
            total: data.length,
            types: data,
        }, 200);
    }
}
