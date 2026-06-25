import type { Document } from '../entities/Document';

export interface IDocumentRepository {
  importDocument(uri: string, fileName: string): Promise<Document>;
}
