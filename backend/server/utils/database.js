// file: server/utils/database.js

import pool from './db.js'; // PostgreSQL pool (existing)
import supabase from './supabase.js'; // Supabase client (new)

// Deteksi environment: jika di dalam Nuxt gunakan useRuntimeConfig, jika tidak gunakan process.env
let USE_SUPABASE = false;

try {
  // Coba gunakan useRuntimeConfig jika tersedia (di dalam Nuxt)
  if (typeof useRuntimeConfig !== 'undefined') {
    const config = useRuntimeConfig();
    USE_SUPABASE = config.supabaseUrl && config.supabaseAnonKey;
  } else {
    // Fallback ke process.env jika di luar Nuxt
    USE_SUPABASE = process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY;
  }
} catch (error) {
  // Jika useRuntimeConfig tidak tersedia, gunakan process.env
  USE_SUPABASE = process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY;
}

/**
 * Unified database interface
 * Dapat menggunakan PostgreSQL atau Supabase tergantung konfigurasi
 */
class DatabaseService {
  constructor() {
    this.isSupabase = USE_SUPABASE;
    this.client = this.isSupabase ? supabase : pool;
  }

  /**
   * Execute a query
   * @param {string} query - SQL query atau table name untuk Supabase
   * @param {Array} params - Parameters untuk query
   * @param {Object} options - Options untuk Supabase operations
   * @returns {Promise} Query result
   */
  async query(query, params = [], options = {}) {
    if (this.isSupabase) {
      // Supabase operations
      return this.executeSupabaseQuery(query, params, options);
    } else {
      // PostgreSQL operations
      return pool.query(query, params);
    }
  }

  /**
   * Execute Supabase query
   * @param {string} operation - Operation type or table name
   * @param {Array} params - Parameters
   * @param {Object} options - Supabase options
   */
  async executeSupabaseQuery(operation, params, options) {
    // Ini adalah wrapper sederhana - implementasi lengkap bisa lebih kompleks
    // tergantung pada kebutuhan spesifik aplikasi Anda
    throw new Error('Supabase operations need to be implemented per use case');
  }

  /**
   * Get users with pagination
   */
  async getUsers(limit = 10, offset = 0) {
    if (this.isSupabase) {
      const { data, error } = await supabase
        .from('users')
        .select('users_id, name, email, role')
        .range(offset, offset + limit - 1)
        .order('name'); // Order by name karena UUID tidak berurutan
      
      if (error) throw error;
      return { rows: data };
    } else {
      return pool.query(
        'SELECT users_id, name, email, role FROM users ORDER BY users_id LIMIT $1 OFFSET $2',
        [limit, offset]
      );
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(userId) {
    if (this.isSupabase) {
      const { data, error } = await supabase
        .from('users')
        .select('users_id, name, email, role')
        .eq('users_id', userId)
        .single();
      
      if (error) throw error;
      return { rows: data ? [data] : [] };
    } else {
      return pool.query(
        'SELECT users_id, name, email, role FROM users WHERE users_id = $1',
        [userId]
      );
    }
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email) {
    if (this.isSupabase) {
      const { data, error } = await supabase
        .from('users')
        .select('users_id, name, email, role, password')
        .eq('email', email)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
      return { rows: data ? [data] : [] };
    } else {
      return pool.query(
        'SELECT users_id, name, email, role, password FROM users WHERE email = $1',
        [email]
      );
    }
  }

  /**
   * Create user
   */
  async createUser(name, email, hashedPassword, role = 'user') {
    if (this.isSupabase) {
      const { data, error } = await supabase
        .from('users')
        .insert([
          { name, email, password: hashedPassword, role }
        ])
        .select('users_id, name, email, role')
        .single();
      
      if (error) throw error;
      return { rows: [data] };
    } else {
      return pool.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING users_id, name, email, role',
        [name, email, hashedPassword, role]
      );
    }
  }

  /**
   * Update user
   */
  async updateUser(userId, updates) {
    const { name, email, password } = updates;
    
    if (this.isSupabase) {
      const updateData = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (password) updateData.password = password;

      const { data, error } = await supabase
        .from('users')
        .update(updateData)
        .eq('users_id', userId)
        .select('users_id, name, email, role')
        .single();
      
      if (error) throw error;
      return { rows: [data] };
    } else {
      // Existing PostgreSQL logic
      const fields = [];
      const values = [];
      let param_index = 1;

      if (name) {
        fields.push(`name = $${param_index++}`);
        values.push(name);
      }
      if (email) {
        fields.push(`email = $${param_index++}`);
        values.push(email);
      }
      if (password) {
        fields.push(`password = $${param_index++}`);
        values.push(password);
      }

      values.push(userId);

      const updateQuery = `UPDATE users SET ${fields.join(
        ", "
      )} WHERE users_id = $${param_index} RETURNING users_id, name, email, role`;

      return pool.query(updateQuery, values);
    }
  }

  /**
   * Delete user
   */
  async deleteUser(userId) {
    if (this.isSupabase) {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('users_id', userId);
      
      if (error) throw error;
      return { rowCount: 1 };
    } else {
      return pool.query('DELETE FROM users WHERE users_id = $1', [userId]);
    }
  }

  /**
   * Check if email exists (excluding specific user)
   */
  async checkEmailExists(email, excludeUserId = null) {
    if (this.isSupabase) {
      let query = supabase
        .from('users')
        .select('users_id')
        .eq('email', email);
      
      if (excludeUserId) {
        query = query.neq('users_id', excludeUserId);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return { rows: data || [] };
    } else {
      if (excludeUserId) {
        return pool.query(
          'SELECT users_id FROM users WHERE email = $1 AND users_id != $2',
          [email, excludeUserId]
        );
      } else {
        return pool.query(
          'SELECT users_id FROM users WHERE email = $1',
          [email]
        );
      }
    }
  }

  /**
   * Get articles with pagination
   */
  async getArticles(limit = 10, offset = 0) {
    if (this.isSupabase) {
      const { data, error } = await supabase
        .from('artikel')
        .select('artikel_id, judul, deskripsi, gambar, created_at')
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return { rows: data };
    } else {
      return pool.query(
        'SELECT artikel_id, judul, deskripsi, gambar, created_at FROM artikel ORDER BY created_at DESC LIMIT $1 OFFSET $2',
        [limit, offset]
      );
    }
  }

  /**
   * Get article by ID
   */
  async getArticleById(articleId) {
    if (this.isSupabase) {
      const { data, error } = await supabase
        .from('artikel')
        .select('artikel_id, judul, deskripsi, gambar, created_at')
        .eq('artikel_id', articleId)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return { rows: data ? [data] : [] };
    } else {
      return pool.query(
        'SELECT artikel_id, judul, deskripsi, gambar, created_at FROM artikel WHERE artikel_id = $1',
        [articleId]
      );
    }
  }

  /**
   * Create article
   */
  async createArticle(judul, deskripsi, gambar = null) {
    if (this.isSupabase) {
      const { data, error } = await supabase
        .from('artikel')
        .insert([
          { judul, deskripsi, gambar }
        ])
        .select('artikel_id, judul, deskripsi, gambar, created_at')
        .single();
      
      if (error) throw error;
      return { rows: [data] };
    } else {
      return pool.query(
        'INSERT INTO artikel (judul, deskripsi, gambar) VALUES ($1, $2, $3) RETURNING artikel_id, judul, deskripsi, gambar, created_at',
        [judul, deskripsi, gambar]
      );
    }
  }

  /**
   * Update article
   */
  async updateArticle(articleId, updates) {
    const { judul, deskripsi, gambar } = updates;
    
    if (this.isSupabase) {
      const updateData = {};
      if (judul) updateData.judul = judul;
      if (deskripsi) updateData.deskripsi = deskripsi;
      if (gambar !== undefined) updateData.gambar = gambar;

      const { data, error } = await supabase
        .from('artikel')
        .update(updateData)
        .eq('artikel_id', articleId)
        .select('artikel_id, judul, deskripsi, gambar, created_at')
        .single();
      
      if (error) throw error;
      return { rows: [data] };
    } else {
      const fields = [];
      const values = [];
      let param_index = 1;

      if (judul) {
        fields.push(`judul = $${param_index++}`);
        values.push(judul);
      }
      if (deskripsi) {
        fields.push(`deskripsi = $${param_index++}`);
        values.push(deskripsi);
      }
      if (gambar !== undefined) {
        fields.push(`gambar = $${param_index++}`);
        values.push(gambar);
      }

      values.push(articleId);

      const updateQuery = `UPDATE artikel SET ${fields.join(
        ", "
      )} WHERE artikel_id = $${param_index} RETURNING artikel_id, judul, deskripsi, gambar, created_at`;

      return pool.query(updateQuery, values);
    }
  }

  /**
   * Delete article
   */
  async deleteArticle(articleId) {
    if (this.isSupabase) {
      const { error } = await supabase
        .from('artikel')
        .delete()
        .eq('artikel_id', articleId);
      
      if (error) throw error;
      return { rowCount: 1 };
    } else {
      return pool.query('DELETE FROM artikel WHERE artikel_id = $1', [articleId]);
    }
  }

  /**
   * Get total count of articles
   */
  async getArticleCount() {
    if (this.isSupabase) {
      const { count, error } = await supabase
        .from('artikel')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return { rows: [{ count }] };
    } else {
      return pool.query('SELECT COUNT(*) as count FROM artikel');
    }
  }

  /**
   * Get total count of users
   */
  async getUserCount() {
    if (this.isSupabase) {
      const { count, error } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return { rows: [{ count }] };
    } else {
      return pool.query('SELECT COUNT(*) as count FROM users');
    }
  }
}

// Export singleton instance
const database = new DatabaseService();
export default database;

// Also export the class for advanced usage
export { DatabaseService };
