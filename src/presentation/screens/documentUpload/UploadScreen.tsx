import React, { useCallback } from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {
  pick,
  types,
  isErrorWithCode,
  errorCodes,
} from '@react-native-documents/picker';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addDocument,
  setLoading,
  setError,
} from '../../../store/slices/documentsSlice';
import { AddDocumentUseCase } from '../../../domain/usecases/AddDocumentUseCase';
import { DocumentRepositoryImpl } from '../../../data/repositories/DocumentRepositoryImpl';

const documentRepository = new DocumentRepositoryImpl();
const addDocumentUseCase = new AddDocumentUseCase(documentRepository);

export default function UploadScreen(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { items, isLoading, error } = useAppSelector(state => state.documents);

  const handlePickFile = useCallback(async () => {
    try {
      const [result] = await pick({ type: [types.pdf] });
      dispatch(setLoading(true));
      dispatch(setError(null));

      const doc = await addDocumentUseCase.execute(
        result.uri,
        result.name ?? 'unknown.pdf',
      );
      dispatch(addDocument(doc));
    } catch (err: any) {
      if (isErrorWithCode(err) && err.code === errorCodes.OPERATION_CANCELED)
        return;
      dispatch(setError(err.message ?? 'Something went wrong'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return (
    <View>
      <Button title="Upload PDF" onPress={handlePickFile} />

      {isLoading && <ActivityIndicator style={styles.spacing} />}
      {error && <Text style={styles.error}>{error}</Text>}

      {items.map(doc => (
        <View key={doc.id} style={styles.docItem}>
          <Text style={styles.title}>{doc.title}</Text>
          <Text numberOfLines={3}>{doc.rawText}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  spacing: {
    marginTop: 12,
  },
  error: {
    color: 'red',
    marginTop: 8,
  },
  docItem: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
