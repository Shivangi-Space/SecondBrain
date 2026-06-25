import { NativeModules } from 'react-native';
import type { IDocumentRepository } from '../../domain/interfaces/IDocumentRepository';
import type { Document } from '../../domain/entities/Document';

const { PdfParsedModule } = NativeModules;

export class DocumentRepositoryImpl implements IDocumentRepository {
  async importDocument(uri: string, fileName: string): Promise<Document> {
    const rawText: string = await PdfParsedModule.extractText(uri, fileName);

    return {
      id: `${Date.now()}`,
      title: fileName,
      fileName,
      filePath: uri,
      rawText,
      status: 'processed',
      createdAt: Date.now(),
    };
  }
}
