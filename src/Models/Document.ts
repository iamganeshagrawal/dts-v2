import { Model, DataTypes } from '../deps.ts';

export const complinceStatus = {
    "PENDING": "PENDING",
    "PARTIALLY": "PARTIALLY",
    "COMPLETED": "COMPLETED",
}
export const subjectLanguages = {
    "EN": "en",
    "HI": "hi",
}

export default class Document extends Model{
    static table = "documents";
    
    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        documentId: {
            ...DataTypes.string(64),
            unique: true,
            as: "dts_no",
        },
        subject: DataTypes.string(1024),
        date: DataTypes.INTEGER,
        letterNo: DataTypes.string(64),
        recivedFrom: DataTypes.string(64),
        relatedOffice: DataTypes.string(64),
        allocateSection: DataTypes.string(64),
        dueTimeLimit: DataTypes.INTEGER,
        filepath: {
            ...DataTypes.string(256),
            allowNull: true,
        },
        complinceStatus: DataTypes.enum(Object.values(complinceStatus)),
        remark: {
            ...DataTypes.string(1024),
            allowNull: true,
        },
        subjectLang: DataTypes.enum(Object.values(subjectLanguages)),
        isDeleted: DataTypes.BOOLEAN,
        deleted_at: {
            type: DataTypes.DATETIME,
            allowNull: true,
        }
    }

    static defaults = {
        isDeleted: false,
        deleted_at: null,
        subjectLang: subjectLanguages["EN"],
        remark: null,
        filepath: null,
        complinceStatus: complinceStatus["PENDING"],
    }
    
    static timestamps = true;
}