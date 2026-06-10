import db from "../config/db.js";
import bcrypt from "bcryptjs";

class User {
  static async create(email, password, name) {
    const hashedPassword = await bcrypt.hash(password, 10);

    // parameterized query to prevent SQL injection
    // $1, $2, $3 are placeholders for the values in the array passed as the second argument to db.query
    const result = await db.query(
      `INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id,email, name, created_at`,
      [email, hashedPassword, name],
    );
    return result.rows[0];
  }

  //   Find user by email for authentication
  static async findByEmail(email) {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  }

  //   Find user by ID for session management
  static async findById(id) {
    const result = await db.query(
      `SELECT id, email, name, created_at, updated_at, password_hash FROM users WHERE id = $1`,
      [id],
    );
    return result.rows[0];
  }

  //   Update User
  static async update(id, updates) {
    const { name, email } = updates;
    // COALESCE only update the fields which are provided in the update request,
    // if a field is not provided it will keep the existing value in the database
    // perfect for partial updates where the user may want to update only their name or email without affecting the other field
    const result = await db.query(
      `UPDATE users 
      SET name = COALESCE($1, name), 
          email = COALESCE($2, email), 
    WHERE id = $3 RETURNING id, email, name, updated_at`,
      [name, email, id],
    );
    return result.rows[0];
  }

  //   Update User Password
  static async updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query(`UPDATE users SET password_hash = $1 WHERE id = $2`, [
      hashedPassword,
      id,
    ]);
  }

  //   Verify Password for authentication
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  //   Delete User
  static async delete(id) {
    await db.query(`DELETE FROM users WHERE id = $1`, [id]);
  }
}

export default User;
