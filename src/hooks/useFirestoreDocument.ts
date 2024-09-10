// src/hooks/useFirestoreDocument.ts
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function useFirestoreDocument<T>(collection: string, id: string | null) {
  const [document, setDocument] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchDocument = async () => {
      try {
        const docRef = doc(db, collection, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDocument({ id: docSnap.id, ...docSnap.data() } as T);
        } else {
          setError(new Error('Document not found'));
        }
      } catch (err) {
        setError(err as Error);
      }
    };

    fetchDocument();
  }, [collection, id]);

  return { document, error };
}

export default useFirestoreDocument;