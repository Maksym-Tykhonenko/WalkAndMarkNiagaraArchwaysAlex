import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';

import { bridges } from '../data/bridges';

const INITIAL_REGION = {
  latitude: 42.9044,
  longitude: 78.9086,
  latitudeDelta: 0.3,
  longitudeDelta: 0.3,
};

const Map = ({ route }) => {
  const navigation = useNavigation();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [initialRegion, setInitialRegion] = useState(INITIAL_REGION);
  const { height, width } = useWindowDimensions();

  const isLandscape = width > height;

  const selectedBridge = route.params;
  useEffect(() => {
    if (route.params !== undefined) {
      setInitialRegion(prev => ({
        ...prev,
        latitude: selectedBridge.latitude,
        longitude: selectedBridge.longitude,
      }));
    }
  }, []);

  return (
    <View>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Image source={require('../assets/icons/back.png')} />
      </TouchableOpacity>

      <MapView style={styles.map} initialRegion={initialRegion}>
        {route.params === undefined ? (
          <View>
            {bridges.map((marker, idx) => (
              <Marker
                key={idx}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                onPress={() =>
                  selectedMarker !== null
                    ? setSelectedMarker(null)
                    : setSelectedMarker(marker)
                }
              >
                {Platform.OS === 'ios' ? (
                  <Image source={require('../assets/icons/marker.png')} />
                ) : null}
              </Marker>
            ))}
          </View>
        ) : (
          <Marker
            coordinate={{
              latitude: selectedBridge.latitude,
              longitude: selectedBridge.longitude,
            }}
            onPress={() =>
              selectedMarker !== null
                ? setSelectedMarker(null)
                : setSelectedMarker(selectedBridge)
            }
          >
            {Platform.OS === 'ios' ? (
              <Image source={require('../assets/icons/marker.png')} />
            ) : null}
          </Marker>
        )}
      </MapView>
      <View
        style={[
          isLandscape ? { top: height * 0.08 } : { top: height * 0.3 },
          { position: 'absolute', alignSelf: 'center' },
        ]}
      >
        {selectedMarker && (
          <View>
            <Image source={selectedMarker.image} style={styles.calloutImage} />
            <View style={styles.calloutWrap}>
              <Text style={styles.bridgeName}>{selectedMarker.name}</Text>
              <TouchableOpacity
                style={styles.calloutButton}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('BridgeDetails', {
                    bridge: selectedMarker,
                    screen: 'Map',
                  });
                  setSelectedMarker(null);
                }}
              >
                <Text style={styles.btnText}>Explore</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  backBtn: {
    width: 56,
    height: 56,
    borderRadius: 100,
    backgroundColor: '#AF1E23',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 24,
    top: 75,
    zIndex: 1,
  },
  mapBtn: {
    width: 56,
    height: 56,
    borderRadius: 100,
    backgroundColor: '#1C5839',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calloutImage: {
    width: 125,
    height: 133,
    borderRadius: 12,
  },
  calloutButton: {
    width: 109,
    height: 28,
    backgroundColor: '#F6AE29',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: '#fff',
  },
  bridgeName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#fff',
    width: 110,
  },
  calloutWrap: {
    position: 'absolute',
    bottom: 12,
    left: 8,
  },
});

export default Map;
