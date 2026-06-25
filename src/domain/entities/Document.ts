export interface Document {
  id: string;
  title: string;
  fileName: string;
  filePath: string;
  rawText: string;
  status: 'pending' | 'processing' | 'processed' | 'error';
  createdAt: number;
}
