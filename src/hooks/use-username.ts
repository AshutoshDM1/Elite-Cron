import { useState} from 'react';

export const useUsername = () => {
  const [username, setUsername] = useState<string | null>(() => {
    // Initialize from localStorage immediately to prevent flash
    return localStorage.getItem('username');
  });
  const [isLoading] = useState(false);

  const saveUsername = (newUsername: string) => {
    localStorage.setItem('username', newUsername);
    setUsername(newUsername);
  };

  const clearUsername = () => {
    localStorage.removeItem('username');
    setUsername(null);
  };

  return {
    username,
    isLoading,
    saveUsername,
    clearUsername,
    hasUsername: !!username,
  };
};
