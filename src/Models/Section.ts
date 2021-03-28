import { Model, DataTypes } from '../deps.ts';

export const sectionTypes = {
    "Allocate": "allocate",
    "From": "from",
    "Related": "related"
}

class Section extends Model{
    static table = "sections";

    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            as: "section_name",
            type: DataTypes.STRING,
            length: 64,
            unique: true,
        },
        type: {
            as: "section_type",
            ...DataTypes.enum(Object.values(sectionTypes)),
        },
        // isActive: DataTypes.BOOLEAN,
        // isDeleted: DataTypes.BOOLEAN,
        // deleted_at: {
        //     type: DataTypes.DATETIME,
        //     allowNull: true,
        // },
    };

    // static defaults = {
    //     isActive: true,
    //     isDeleted: false,
    //     deleted_at: null,
    // };

    static timestamps = true;
}

export default Section;