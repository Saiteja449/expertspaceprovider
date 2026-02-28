import { collection, getDocs, limit, query } from 'firebase/firestore';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import { db } from '../firebase/firebaseConfig';

export const checkAppVersion = async () => {
  try {
    const currentVersion = DeviceInfo.getVersion();

    const q = query(collection(db, 'version'), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    const data = snapshot.docs[0].data();

    const latestVersion =
      Platform.OS === 'android'
        ? data.android_version
        : data.ios_version;
        console.log("latestVersion : ", latestVersion, " currentVersion : ", currentVersion)

    if (currentVersion !== latestVersion) {
      return {
        visible: true,
        forceUpdate: data.force_update,
      };
    }

    return null;
  } catch (e) {
    console.log('❌ Version check failed:', e);
    return null;
  }
};

const compareVersions = (v1, v2) => {
  const a = v1.split('.').map(Number);
  const b = v2.split('.').map(Number);

  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const diff = (a[i] || 0) - (b[i] || 0);
    if (diff !== 0) return diff > 0 ? 1 : -1;
  }
  return 0;
};
