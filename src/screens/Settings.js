import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

import AppBackground from '../components/AppBackground';
import { useStore } from '../store/context';
import LargeButton from '../components/LargeButton';

const { height } = Dimensions.get('window');

const Settings = () => {
  const navigation = useNavigation();
  const { isEnableNotification, setIsEnableNotification } = useStore();

  const toggleNotifications = () =>
    setIsEnableNotification(previousState => !previousState);

  const clearAllData = async () => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify([]));

      if (isEnableNotification) {
        Toast.show({
          text1: 'All app data has been cleared!',
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AppBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headerWrap}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Image source={require('../assets/icons/back.png')} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Settings</Text>
          </View>

          <View style={styles.noteContainer}>
            <Text style={styles.title}>Notification</Text>

            <Switch
              onValueChange={toggleNotifications}
              value={isEnableNotification}
              trackColor={{ true: '#F6AE29', false: 'grey' }}
              thumbColor={'#fff'}
            />
          </View>

          <TouchableOpacity
            style={styles.noteContainer}
            activeOpacity={0.7}
            onPress={() =>
              Linking.openURL(
                'https://www.termsfeed.com/live/4b1e4185-e353-4e1b-a2dd-cbb36f87fe73',
              )
            }
          >
            <Text style={styles.title}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.noteContainer}
            activeOpacity={0.7}
            onPress={() =>
              Linking.openURL(
                'https://www.termsfeed.com/live/55fee088-cc48-4969-85de-7bbc76b3dcaf',
              )
            }
          >
            <Text style={styles.title}>Terms of Use</Text>
          </TouchableOpacity>

          <LargeButton
            title={'Clear My Data'}
            style={{ backgroundColor: '#1C5839' }}
            textStyle={{ color: '#fff' }}
            onPress={clearAllData}
          />
        </View>
      </ScrollView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: height * 0.075, padding: 24 },
  noteContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: '#CBEABA',
    borderRadius: 12,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 51,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1C5839',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#fff',
  },
  backBtn: {
    width: 56,
    height: 56,
    borderRadius: 100,
    backgroundColor: '#AF1E23',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
  },
  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 37,
  },
  notificationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    width: 200,
    position: 'absolute',
    lineHeight: 15,
  },
});

export default Settings;
