import { Database, SQLite3 } from "./deps.ts";

import {
  Document,
  Compliance,
  DueLimit,
  Section
} from "./Models/index.ts";

/**
 * Create Database Connection and Create Tables in Database For Models
 */
function database(filepath: string): Database {

  const connector = new SQLite3({
    filepath: filepath,
  }); // SQLite3 adpater
  
  const db = new Database(connector); // Database Init

  db.link([Document, Compliance, DueLimit, Section]); // Link Models in Database

  return db;
}

export default database;
