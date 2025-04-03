import { pool } from "../config/database";
import { Person } from "./Person";

export class PersonRepository {
  async create(person: Person): Promise<Person> {
    const query =
      "INSERT INTO persons (name, age, email) VALUES ($1, $2, $3) RETURNING *";
    const values = [person.name, person.age, person.email];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findAll(): Promise<Person[]> {
    const query = "SELECT * FROM persons ORDER BY id";
    const result = await pool.query(query);
    return result.rows;
  }

  async findById(id: number): Promise<Person | null> {
    const query = "SELECT * FROM persons WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async update(id: number, person: Person): Promise<Person | null> {
    const query =
      "UPDATE persons SET name = $1, age = $2, email = $3, updated_at = now() WHERE id = $4 RETURNING *";
    const values = [person.name, person.age, person.email, id];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const query = "DELETE FROM persons WHERE id = $1";
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }
}
