import {
  Dimensions,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppBackground from '../components/AppBackground';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';
import SmallButton from '../components/SmallButton';

const { height } = Dimensions.get('window');

const NoteDetails = ({ route }) => {
  const { description, images, date, title, category, latitude, longitude } =
    route.params;
  const navigation = useNavigation();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${title} ${date}
${category}
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
          <Header title={date} onPress={handleShare} />

          <View style={styles.bridgeContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{description}</Text>
          </View>

          <View style={[styles.bridgeNameContainer]}>
            <Text style={styles.bridgeName}>{category}</Text>
            <SmallButton
              title={'Show on Map'}
              style={{ width: 154 }}
              onPress={() =>
                navigation.navigate('Map', { latitude, longitude })
              }
            />
          </View>

          <View style={styles.imagesWrap}>
            {images.map((img, idx) => (
              <Image
                source={{ uri: img.image }}
                style={styles.image}
                key={idx}
              />
            ))}
          </View>
        </View>
      </ScrollView>
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
  bridgeNameContainer: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: '#CBEABA',
    borderRadius: 12,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginBottom: 8,
    color: '#1C5839',
  },
  bridgeName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1C5839',
    width: 180,
  },
  subtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#000',
  },
  image: {
    width: '48%',
    height: 167,
    borderRadius: 12,
    marginTop: 24,
  },
  imagesWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default NoteDetails;
