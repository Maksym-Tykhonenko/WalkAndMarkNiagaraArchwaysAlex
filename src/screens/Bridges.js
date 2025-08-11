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
import { useState } from 'react';

import AppBackground from '../components/AppBackground';
import { bridges } from '../data/bridges';

const { height } = Dimensions.get('window');

const Bridges = () => {
  const navigation = useNavigation();
  const [showInfo, setShowInfo] = useState(false);

  const handleShowInfo = () => {
    setShowInfo(!showInfo);
    setTimeout(() => {
      setShowInfo(false);
    }, 6000);
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
            <Text style={styles.headerTitle}>All Bridges</Text>
            <TouchableOpacity
              style={styles.infoBtn}
              activeOpacity={0.7}
              onPress={handleShowInfo}
            >
              <Image source={require('../assets/icons/headInfo.png')} />
            </TouchableOpacity>

            {showInfo && (
              <View style={styles.infoContainer}>
                <Image source={require('../assets/images/notification.png')} />
                <Text style={styles.notificationText}>
                  Some locations featured in this app may be unsafe or
                  inaccessible. They are included for historical reference and
                  exploration through knowledge, not for physical access. 
                </Text>
              </View>
            )}
          </View>

          {bridges.map((bridge, idx) => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.bridgeContainer}
              key={idx}
              onPress={() => {
                navigation.navigate('BridgeDetails', {
                  bridge,
                  screen: 'Bridge',
                }),
                  setShowInfo(false);
              }}
            >
              <Image source={bridge.image} style={styles.image} />
              <Text style={styles.title}>{bridge.name}</Text>
              <Text numberOfLines={2} style={styles.subtitle}>
                {bridge.description}
              </Text>
            </TouchableOpacity>
          ))}
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
    marginTop: 24,
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
  },
  infoBtn: {
    width: 56,
    height: 56,
    borderRadius: 100,
    backgroundColor: '#1C5839',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: 170,
    borderRadius: 12,
    marginBottom: 8,
  },
  notificationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    width: 200,
    position: 'absolute',
    lineHeight: 15,
  },
  infoContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 53,
    top: -17,
    zIndex: 20,
  },
});

export default Bridges;
