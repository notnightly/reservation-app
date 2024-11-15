import { Database } from "jsr:@db/sqlite@0.11";
const db = new Database("users.db");

db.exec(`CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    phone TEXT NOT NULL UNIQUE,
    date DATETIME NOT NULL
)`);

const insertStmt = db.prepare(
  `INSERT INTO users (id, phone, date) VALUES(?, ?, ?) RETURNING id`,
);
export function insertUser(id: string, phone: string, date: Date) {
  return insertStmt.get(id, phone, date);
}
type User = {
  phone: string;
  id: string;
  date: Date;
};
const getUsersStmt = db.prepare("SELECT * FROM users where id = ?");
export function userReservations(id: string): User | undefined {
  return getUsersStmt.get(id);
}
