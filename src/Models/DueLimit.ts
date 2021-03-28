import { Model, DataTypes } from '../deps.ts';

class DueLimit extends Model{
    static table = "due_limits";

    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        days: {
            as: "due_days",
            type: DataTypes.INTEGER,
            unique: true,
        },
        // isActive: DataTypes.BOOLEAN,
        // isDeleted: DataTypes.BOOLEAN,
        // deleted_at: {
        //     type: DataTypes.DATETIME,
        //     allowNull: true,
        // }
    }

    // static defaults = {
    //     // isActive: true,
    //     isDeleted: false,
    //     deleted_at: null
    // }

    static timestamps = true;
}

export default DueLimit;