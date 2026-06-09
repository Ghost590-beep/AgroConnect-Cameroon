// src/repositories/base.repository.js

/**
 * BaseRepository
 * - Abstract class used by concrete repository implementations.
 * - SOLID:
 *   - SRP: Provides only the contract for repository operations.
 *   - OCP: Concrete repositories can extend without modifying this base.
 *   - LSP: Subclasses are substitutable for BaseRepository.
 */
export default class BaseRepository {
  constructor(tableName) {
    if (new.target === BaseRepository) {
      throw new TypeError(
        "BaseRepository is abstract and cannot be instantiated directly",
      );
    }
    this.tableName = tableName;
  }

  async findById(id) {
    throw new Error("Method 'findById' must be implemented by subclass");
  }

  async create(data) {
    throw new Error("Method 'create' must be implemented by subclass");
  }

  async update(id, updates) {
    throw new Error("Method 'update' must be implemented by subclass");
  }

  async delete(id) {
    throw new Error("Method 'delete' must be implemented by subclass");
  }
}
