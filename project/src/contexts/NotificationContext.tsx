import React, { createContext, useContext, ReactNode } from 'react';
import { useNotification, NotificationType } from '../hooks/useNotification';
import NotificationContainer from '../components/NotificationContainer';

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType, duration?: number) => string;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const { notifications, showNotification, removeNotification, clearAllNotifications } = useNotification();

  return (
    <NotificationContext.Provider value={{ showNotification, removeNotification, clearAllNotifications }}>
      {children}
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
    </NotificationContext.Provider>
  );
};