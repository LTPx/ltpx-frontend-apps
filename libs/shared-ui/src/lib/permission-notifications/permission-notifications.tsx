import { useEffect, useState } from 'react';
import Button from '../button/button';
import styles from './permission-notifications.module.scss';

/* eslint-disable-next-line */
export interface PermissionNotificationsProps {
  messaging: any;
  getToken: any;
}

export function PermissionNotifications(props: PermissionNotificationsProps) {
  const { messaging, getToken } = props;
  const [notificationPermission, setNotificationPermission] = useState(
    Notification.permission
  );

  async function requestNotificationPermission() {
    try {
      await Notification.requestPermission();
      const token = await getToken(messaging, {
        vapidKey: process.env.NX_FIREBASE_VAPID_KEY,
      });
      if (token) {
        console.log('Token:', token);
        // Aquí se puede enviar el token al servidor para suscribir al usuario a las notificaciones
      }
    } catch (error) {
      console.log('Error requesting notification permission:', error);
    }
  }

  useEffect(() => {
    setNotificationPermission(Notification.permission);
  }, []);

  // useEffect(() => {
  //   async function requestNotificationPermission() {
  //     const permission = await Notification.requestPermission();
  //     setNotificationPermission(permission);
  //   }

  //   if (notificationPermission === 'default') {
  //     requestNotificationPermission();
  //   }
  // }, [notificationPermission]);

  return (
    <div className={styles['container']}>
      {notificationPermission === 'default' && (
        <div className={styles['content']}>
          <div>
            <h3>¿Desea recibir notificaciones?</h3>
            <p>
              Para recibir notificaciones de nuestra aplicación, por favor
              permita las notificaciones en su navegador.
            </p>
          </div>
          <div>
            <Button
              title="Permitir notificaciones"
              onClick={requestNotificationPermission}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PermissionNotifications;
