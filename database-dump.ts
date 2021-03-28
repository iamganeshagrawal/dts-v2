import {Database, SQLite3} from './src/deps.ts';
import { Document, Compliance, DueLimit, Section, sectionTypes, complinceStatus } from "./src/Models/index.ts";


const DATABASE_FILE = "C:\\Users\\gmego\\Desktop\\Projects\\dts-v2\\database.db";

async function createDBConnection(dbpath: string){
    const _db = new Database(new SQLite3({
        filepath: dbpath,
    }));
    await _db.link([Document, Compliance, DueLimit, Section]);
    await _db.sync({drop: true});
    return _db;
}

function ensureFileSync(filepath: string){
    try{
        const stat = Deno.lstatSync(filepath);
        if (!stat.isFile) {
            const fileType = stat.isFile ? "file" : stat.isDirectory ? "dir" : stat.isSymlink ? "symlink" : undefined;
            throw new Error(`Ensure path exists, expected 'file', got '${fileType}'`,);
        }
        return true;
    }catch(err){
        if (err instanceof Deno.errors.NotFound) {
            return false;
        }
        throw err;
    }
}
/**
 * create .db file and if exits already remove it and create a blank db.
 */
function createDBFileSync(dbpath: string){
    if(ensureFileSync(dbpath)){
        Deno.removeSync(dbpath);
    }
    Deno.writeFileSync(dbpath, new Uint8Array());
}

const log = console.log;


async function main() {
    log(`🚀 Database Mock Dump Started...`);
    createDBFileSync(DATABASE_FILE);
    const db = await createDBConnection(DATABASE_FILE);
    log(`✔️ Database & Tables created.`);
    log(`❄️ Mock data inserting started..`);
    
    // DueLimit
    await DueLimit.create([
        { days: 3 },
        { days: 5 },
        { days: 7 },
    ]);
    console.log(`<DueLimit> : ${await DueLimit.count()}`);
    
    // Section (type='Allocate')
    await Section.create([
        { name: "Allocate 1", type: sectionTypes["Allocate"] },
        { name: "Allocate 2", type: sectionTypes["Allocate"] },
        { name: "Allocate 3", type: sectionTypes["Allocate"] },
    ]);
    console.log(`<Section>("type":"${sectionTypes["Allocate"]}") : ${await Section.where("type", sectionTypes["Allocate"]).count()}`);
    
    // Section (type='From')
    await Section.create([
        { name: "From 1", type: sectionTypes["From"] },
        { name: "From 2", type: sectionTypes["From"] },
        { name: "From 3", type: sectionTypes["From"] },
    ]);
    console.log(`<Section>("type":"${sectionTypes["From"]}") : ${await Section.where("type", sectionTypes["From"]).count()}`);
    
    // Section (type='Related')
    await Section.create([
        { name: "Related 1", type: sectionTypes["Related"] },
        { name: "Related 2", type: sectionTypes["Related"] },
        { name: "Related 3", type: sectionTypes["Related"] },
    ]);
    console.log(`<Section>("type":"${sectionTypes["Related"]}") : ${await Section.where("type", sectionTypes["Related"]).count()}`);
    
    // Documents
    let documentRecords = [
        {
            id: 0,
            subject: `Beware of this 7 Fiteness mistakes`,
            recivedFrom: `From 1`,
            relatedOffice: `Related 2`,
            allocateSection: `Allocate 3`,
            dueTimeLimit: 3,
            complinceStatus: complinceStatus["PENDING"],
        },
        {
            id: 0,
            subject: `8 Fiteness tricks we're using from now on`,
            recivedFrom: `From 2`,
            relatedOffice: `Related 3`,
            allocateSection: `Allocate 1`,
            dueTimeLimit: 5,
            complinceStatus: complinceStatus["PARTIALLY"],
        },
        {
            id: 0,
            subject: `Give me 20 minutes and I'll give you Fiteness`,
            recivedFrom: `From 3`,
            relatedOffice: `Related 1`,
            allocateSection: `Allocate 2`,
            dueTimeLimit: 7,
            complinceStatus: complinceStatus["COMPLETED"],
        }
    ];
    documentRecords = documentRecords.map((doc, idx) => {
        const today = new Date();
        return {
            ...doc,
            id: idx + 1001,
            documentId: `DTS/${today.getFullYear().toString().slice(-2)}/${(today.getMonth() + 1).toString().padStart(2,"0")}/${idx + 1001}`,
            date: `${today.getFullYear()}${(today.getMonth()+1).toString().padStart(2, "0")}${today.getDate().toString().padStart(2, "0")}`,
            letterNo: `LNO-${Math.round(Math.random() * 100).toString().padStart(5, "0")}`,
            filepath: `/${today.getFullYear()}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${Date.now().toString(32).toUpperCase()}.jpg`,
        }
    });
    await Document.create(documentRecords);
    console.log(`<Document> : ${await Document.count()}`);

    // Compliance
    const complianceRecords = new Array(2).fill(undefined).map((_, idx) => {
        const today = new Date();
        return {
            documentId: documentRecords[idx].id,
            date: `${today.getFullYear()}${(today.getMonth()+1).toString().padStart(2, "0")}${today.getDate().toString().padStart(2, "0")}`,
            dispatchNo: `CDNO-${(Math.round(Math.random() * 5000)).toString().padStart(5, "0")}`,
            dispatchDate: `${today.getFullYear()}${(today.getMonth()+1).toString().padStart(2, "0")}${today.getDate().toString().padStart(2, "0")}`,
            filepath: `/${today.getFullYear()}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${Date.now().toString(32).toUpperCase()}.jpg`,
        }
    });
    await Compliance.create(complianceRecords);
    console.log(`<Compliance> : ${await Compliance.count()}`);

    log(`✅ Completed 😄`)
}

await main();