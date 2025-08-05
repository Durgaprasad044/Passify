import { useState, useCallback } from 'react';

export const useLoadingButton = () => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const setLoading = useCallback((buttonId: string, isLoading: boolean) => {
    setLoadingStates(prev => ({
      ...prev,
      [buttonId]: isLoading
    }));
  }, []);

  const isLoading = useCallback((buttonId: string) => {
    return loadingStates[buttonId] || false;
  }, [loadingStates]);

  const withLoading = useCallback(async (
    buttonId: string,
    asyncAction: () => Promise<void>,
    duration?: number
  ) => {
    if (isLoading(buttonId)) return;

    setLoading(buttonId, true);
    
    try {
      await asyncAction();
    } finally {
      if (duration) {
        setTimeout(() => setLoading(buttonId, false), duration);
      } else {
        setLoading(buttonId, false);
      }
    }
  }, [isLoading, setLoading]);

  return {
    isLoading,
    setLoading,
    withLoading
  };
};