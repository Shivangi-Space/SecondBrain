import { NativeModules } from 'react-native';
const { PdfParserModule } = NativeModules;

export const extractPdfText = async (filePath: string): Promise<string> => {
  return PdfParserModule.extractPdfText(filePath);
};
