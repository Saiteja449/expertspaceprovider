import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';

// Request notification permission
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
  if (enabled) {
    console.log('Authorization status:', authStatus);
    return true;
  }
  return false;
}

// Create notification channel for Android (required for sound)
async function createNotificationChannel() {
  if (Platform.OS === 'android') {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      sound: 'default', // Use default system sound
      importance: AndroidImportance.HIGH,
      vibration: true,
    });
    console.log('Notification channel created');
  }
}

// Display notification with sound using Notifee
async function displayNotification(remoteMessage) {
  try {
    await notifee.requestPermission();
    
    // Create channel if Android
    await createNotificationChannel();

    await notifee.displayNotification({
      title: remoteMessage.notification?.title || 'New Notification',
      body: remoteMessage.notification?.body || '',
      android: {
        channelId: 'default',
        sound: 'default', // Use default sound
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
        smallIcon: 'ic_launcher', // Make sure you have this icon
      },
      ios: {
        sound: 'default', // Use default iOS sound
        foregroundPresentationOptions: {
          alert: true,
          badge: true,
          sound: true,
        },
      },
    });
    
    console.log('Notification displayed with sound');
  } catch (error) {
    console.error('Error displaying notification:', error);
  }
}

// Get FCM token
export const getFCMToken = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      console.log('🔕 Notification permission not granted');
      return null;
    }

    // ✅ REQUIRED FOR iOS
    await messaging().registerDeviceForRemoteMessages();

    if (Platform.OS === 'ios') {
      // ✅ WAIT until APNs token exists
      let apnsToken = await messaging().getAPNSToken();

      let retryCount = 0;
      while (!apnsToken && retryCount < 10) {
        await new Promise(res => setTimeout(res, 500));
        apnsToken = await messaging().getAPNSToken();
        retryCount++;
      }

      if (!apnsToken) {
        console.error('❌ APNs token not available');
        return null;
      }

      console.log('✅ APNs Token:', apnsToken);
    }

    // ✅ NOW SAFE
    const fcmToken = await messaging().getToken();
    console.log('✅ FCM Token:', fcmToken);

    return fcmToken;
  } catch (error) {
    console.error('❌ FCM TOKEN ERROR:', error);
    return null;
  }
};


// Initialize FCM (call this in your App.js or main component)
export const initializeFCM = async () => {
  try {
    // Create notification channel for Android
    await createNotificationChannel();
    
    if (Platform.OS === 'ios') {
      // Check if already registered to avoid multiple registrations
      // const isRegistered = messaging().isDeviceRegisteredForRemoteMessages;
      
        await messaging().registerDeviceForRemoteMessages();
        console.log('iOS device registered for remote messages');
    }
    
    // Get initial token
    const token = await getFCMToken();
    return token;
  } catch (error) {
    console.error('Error initializing FCM:', error);
    return null;
  }
};

// Handle token refresh
messaging().onTokenRefresh(token => {
  console.log('FCM Token refreshed:', token);
  // Save the new token to your server
});

// Handle foreground messages with sound
messaging().onMessage(async remoteMessage => {
  console.log('Foreground message:', remoteMessage);
  // Display notification with sound when app is in foreground
  await displayNotification(remoteMessage);
});

// Handle background/quit state messages
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background message:', remoteMessage);
  // Note: Background messages automatically show with sound if payload is correct
  // But you can also display custom notification here if needed
});