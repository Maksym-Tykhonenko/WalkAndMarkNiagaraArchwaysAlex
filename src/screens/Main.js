import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AppBackground from '../components/AppBackground';
import SmallButton from '../components/SmallButton';

const { height } = Dimensions.get('window');

const Main = () => {
  const navigation = useNavigation();

  return (
    <AppBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image source={require('../assets/images/main.png')} />
          <View style={styles.welcomeContainer}>
            <Text style={styles.title}>🗂 View All Bridges</Text>
            <Text style={styles.subtitle}>
              Explore the full list of bridges. Mark the ones you’ve visited
            </Text>
            <SmallButton
              title={'Open Bridge List'}
              onPress={() => navigation.navigate('Bridges')}
            />
          </View>

          <View style={styles.welcomeContainer}>
            <Text style={styles.title}>📝 Your Location Notes</Text>
            <Text style={styles.subtitle}>
              See your memories and notes from the bridges you've visited
            </Text>
            <SmallButton
              title={'View My Notes'}
              style={{ width: 170 }}
              onPress={() => navigation.navigate('SavedNotes')}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.sideBar}>
        <TouchableOpacity
          hitSlop={styles.hitSlop}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Map')}
        >
          <Image source={require('../assets/icons/map.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          hitSlop={styles.hitSlop}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('AppInfo')}
        >
          <Image source={require('../assets/icons/info.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          hitSlop={styles.hitSlop}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Settings')}
        >
          <Image source={require('../assets/icons/settings.png')} />
        </TouchableOpacity>
      </View>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: height * 0.075, alignItems: 'center', padding: 24 },
  welcomeContainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#CBEABA',
    borderRadius: 12,
    marginVertical: 16,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginBottom: 8,
    color: '#1C5839',
  },
  subtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1C5839',
    marginBottom: 12,
  },
  sideBar: {
    backgroundColor: '#AF1E23',
    position: 'absolute',
    bottom: 40,
    right: 24,
    padding: 20,
    borderRadius: 100,
    gap: 40,
  },
  hitSlop: {
    top: 15,
    bottom: 15,
    left: 20,
    right: 20,
  },
});

export default Main;
