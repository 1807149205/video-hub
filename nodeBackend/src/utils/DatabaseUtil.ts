import db from './db';

export interface UpdateResultOption {
  affectedRows: number;
  insertId: string;
}

class DatabaseUtil {
  /**
   * 执行 SELECT 查询
   * @param sql - SQL 查询语句
   * @param params - SQL 参数（可选）
   * @returns 查询结果
   */
  static async select(sql: string, params?: any[]): Promise<any[]> {
    try {
      const [rows] = await db.query(sql, params);
      return rows as any[];
    } catch (error) {
      console.error('Error executing SELECT query:', error);
      throw error;
    }
  }

  /**
   * 执行 UPDATE 查询
   * @param sql - SQL 查询语句
   * @param params - SQL 参数（可选）
   * @returns 受影响的行数
   */
  static async update(sql: string, params?: any[]): Promise<UpdateResultOption> {
    try {
      const [result]: any = await db.query(sql, params);
      return result;
    } catch (error) {
      console.error('Error executing UPDATE query:', error);
      throw error;
    }
  }

  /**
   * 执行 DELETE 查询
   * @param sql - SQL 查询语句
   * @param params - SQL 参数（可选）
   * @returns 受影响的行数
   */
  static async delete(sql: string, params?: any[]): Promise<number> {
    try {
      const [result]: any = await db.query(sql, params);
      return result.affectedRows;
    } catch (error) {
      console.error('Error executing DELETE query:', error);
      throw error;
    }
  }
}

export default DatabaseUtil;
