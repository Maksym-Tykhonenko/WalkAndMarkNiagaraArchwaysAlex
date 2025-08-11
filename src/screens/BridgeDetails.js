import {
  Dimensions,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AppBackground from '../components/AppBackground';
import Header from '../components/Header';

const { height } = Dimensions.get('window');

const BridgeDetails = ({ route }) => {
  const navigation = useNavigation();

  const { description, image, name, latitude, longitude } = route.params.bridge;
  const screen = route.params.screen;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${name}
${description}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AppBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Header title={'Bridge Details'} onPress={handleShare} />

          <Image source={image} style={styles.image} />
          <View style={styles.bridgeContainer}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{description}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonsWrap}>
        <TouchableOpacity
          style={styles.navButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('AddNote')}
        >
          <Image source={require('../assets/icons/create.png')} />
        </TouchableOpacity>
        {screen !== 'Map' && (
          <TouchableOpacity
            style={styles.navButton}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate('Map', {
                latitude,
                longitude,
                description,
                image,
                name,
              })
            }
          >
            <Image source={require('../assets/icons/map2.png')} />
          </TouchableOpacity>
        )}
      </View>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: height * 0.075, padding: 24 },
  bridgeContainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#CBEABA',
    borderRadius: 12,
    marginTop: 16,
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
  image: {
    width: '100%',
    height: 234,
    borderRadius: 12,
    marginTop: 24,
  },
  infoContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 53,
    top: -17,
    zIndex: 20,
  },
  navButton: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: '#1C5839',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsWrap: {
    position: 'absolute',
    bottom: 56,
    right: 20,
    flexDirection: 'row',
    gap: 19,
  },
});

export default BridgeDetails;
