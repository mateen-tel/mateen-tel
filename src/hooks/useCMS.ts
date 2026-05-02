import { useState, useEffect, useCallback } from 'react';

const CMS_PIN = '2024'; // يمكن تغيير هذا الرمز

export const useCMS = (triggerCount: number = 5, timeout: number = 3000) => {
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // COMPLETELY DISABLE IN PRODUCTION
  const isProduction = import.meta.env.PROD;

  useEffect(() => {
    if (isProduction) return;

    const timer = setTimeout(() => {
      setCount(0);
    }, timeout);
    return () => clearTimeout(timer);
  }, [count, timeout, isProduction]);

  const handleTrigger = useCallback(() => {
    // COMPLETELY DISABLE IN PRODUCTION - No logging, no tracking, nothing
    if (isProduction) return;

    const newCount = count + 1;
    setCount(newCount);
    if (newCount >= triggerCount) {
      setIsOpen(true);
      setCount(0);
    }
  }, [count, triggerCount, isProduction]);

  const authorize = useCallback((pin: string) => {
    if (isProduction) return false;

    if (pin === CMS_PIN) {
      setIsAuthorized(true);
      localStorage.setItem('cms_authorized', 'true');
      return true;
    }
    return false;
  }, [isProduction]);

  const logout = useCallback(() => {
    setIsAuthorized(false);
    localStorage.removeItem('cms_authorized');
  }, []);

  useEffect(() => {
    if (isProduction) {
      // Ensure no state persists in production
      setIsOpen(false);
      setIsAuthorized(false);
      return;
    }

    const saved = localStorage.getItem('cms_authorized');
    if (saved === 'true') {
      setIsAuthorized(true);
    }
  }, [isProduction]);

  // Return null-like values in production to prevent any accidental activation
  if (isProduction) {
    return {
      isOpen: false,
      setIsOpen: () => {},
      isAuthorized: false,
      authorize: () => false,
      handleTrigger: () => {},
      logout: () => {}
    };
  }

  return {
    isOpen,
    setIsOpen,
    isAuthorized,
    authorize,
    handleTrigger,
    logout
  };
};
