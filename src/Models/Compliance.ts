import { DataTypes, Model, Relationships } from '../deps.ts';
import Document from './Document.ts';

export default class Compliance extends Model{
    static table = "compliances";
    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        documentId: {
            ...Relationships.belongsTo(Document),
            as: "dts_no",
        },
        date: DataTypes.INTEGER,
        dispatchNo: DataTypes.string(64),
        dispatchDate: DataTypes.INTEGER,
        filepath: {
            ...DataTypes.string(256),
            allowNull: true,
        },
        remark: {
            ...DataTypes.string(1024),
            allowNull: true,
        },
        isDeleted: DataTypes.BOOLEAN,
        deleted_at: {
            type: DataTypes.DATETIME,
            allowNull: true,
        }
    }

    static defaults = {
        isDeleted: false,
        deleted_at: null,
        filpath: null,
        remark: null,
        dispatchNo: "N/A",
    }
    
    static timestamps = true;
}