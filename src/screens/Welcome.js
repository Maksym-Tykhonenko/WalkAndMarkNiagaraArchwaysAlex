import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import AppBackground from '../components/AppBackground';
import LargeButton from '../components/LargeButton';

const { height } = Dimensions.get('window');

const Welcome = () => {
  const navigation = useNavigation();
  const [showLoaderImage, setShowLoaderImage] = useState(false);
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    step === 3 ? navigation.replace('Main') : setStep(step + 1);
  };

  return (
    <AppBackground style={showLoaderImage && styles.loaderContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {step === 1 ? (
            <Image source={require('../assets/images/onb1.png')} />
          ) : step === 2 ? (
            <Image source={require('../assets/images/onb2.png')} />
          ) : (
            <Image source={require('../assets/images/onb3.png')} />
          )}
          <View
            style={[styles.welcomeContainer, step === 2 && { marginTop: 30 }]}
          >
            <Text style={styles.title}>
              {step === 1
                ? '🌉 Explore the Crossings'
                : step === 2
                ? '🗺 Mark and Remember'
                : '📝 History Lives Here'}
            </Text>
            <Text style={styles.subtitle}>
              {step === 1
                ? `Some bridges echo with history — others are quietly waiting to be found.Discover both well-known and forgotten crossings throughout Niagara.`
                : step === 2
                ? `Mark the bridges you've visited and keep your journey in one place.Save your own notes and reflections as you explore.`
                : `Some locations are no longer safe to visit and are shown for historical insight only.Learn from the past, explore with care, and let the bridges tell their stories.`}
            </Text>
          </View>

          <LargeButton
            title={step === 1 ? 'Next' : step === 2 ? 'Next' : 'Explore'}
            onPress={handleNextStep}
          />
        </View>
      </ScrollView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: height * 0.075, alignItems: 'center', padding: 24 },
  loaderContainer: { justifyContent: 'center', alignItems: 'center' },
  welcomeContainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#CBEABA',
    borderRadius: 12,
    marginBottom: 12,
    marginTop: 12,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginBottom: 8,
    color: '#1C5839',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
});

export default Welcome;
