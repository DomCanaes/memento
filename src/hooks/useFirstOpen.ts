import { useState } from 'react';
import { getSettings, setSettings } from '../lib/storage';

export function useFirstOpen() {
  const [show, setShow] = useState(() => !getSettings().hasSeenFirstOpenModal);

  function dismiss() {
    const s = getSettings();
    setSettings({ ...s, hasSeenFirstOpenModal: true });
    setShow(false);
  }

  return { show, dismiss };
}
