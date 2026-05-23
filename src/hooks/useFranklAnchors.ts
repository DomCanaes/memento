import { useState, useCallback } from 'react';
import { getFranklAnchors, setFranklAnchors } from '../lib/storage';
import type { FranklAnchor } from '../types';

function makeId() {
  return `fa_${Date.now()}`;
}

export function useFranklAnchors() {
  const [anchors, setAnchors] = useState<FranklAnchor[]>(() => getFranklAnchors());

  function save(updated: FranklAnchor[]) {
    setAnchors(updated);
    setFranklAnchors(updated);
  }

  const addAnchor = useCallback((name: string, description?: string) => {
    save([...anchors, { id: makeId(), name, description }]);
  }, [anchors]);

  const updateAnchor = useCallback((id: string, name: string, description?: string) => {
    save(anchors.map(a => a.id === id ? { ...a, name, description } : a));
  }, [anchors]);

  const removeAnchor = useCallback((id: string) => {
    save(anchors.filter(a => a.id !== id));
  }, [anchors]);

  return { anchors, addAnchor, updateAnchor, removeAnchor, save };
}
