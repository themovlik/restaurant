import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getAsyncStorageItem(key: string): Promise<string | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log(`Error getting item from AsyncStorage: ${error}`);
    return null;
  }
}

export async function setAsyncStorageItem(
  key: string,
  value: string,
): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(`Error setting item in AsyncStorage: ${error}`);
  }
}

export async function removeAsyncStorageItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(`Error removing item from AsyncStorage: ${error}`);
  }
}
