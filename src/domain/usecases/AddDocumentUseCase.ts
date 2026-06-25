import type { IDocumentRepository } from '../interfaces/IDocumentRepository';
import type { Document } from '../entities/Document';

export class AddDocumentUseCase {
  constructor(private documentRepository: IDocumentRepository) {}

  async execute(uri: string, fileName: string): Promise<Document> {
    if (!fileName.toLowerCase().endsWith('.pdf')) {
      throw new Error('Only PDF files are supported currently');
    }
    return this.documentRepository.importDocument(uri, fileName);
  }
}
