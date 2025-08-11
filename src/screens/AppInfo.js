import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppBackground from '../components/AppBackground';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const AppInfo = () => {
  const navigation = useNavigation();

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
            <Text style={styles.headerTitle}>
              {`About Walk & Mark: \n Niagara Archways`}
            </Text>
          </View>

          <View activeOpacity={0.7} style={styles.infoContainer}>
            <Text style={styles.title}>
              {`Walk & Mark is not just an app — it’s a guide through the historical echoes of Niagara’s bridges. Each crossing tells a story: some are alive with movement and light, others remain only in memory, hidden beneath time and overgrowth. This app invites you to explore these places thoughtfully, to connect with the past through architecture, discovery, and personal reflection.

As you mark the bridges you visit and record your impressions, you become part of a larger narrative — one shaped by steel, stone, and the river’s relentless current.

Please note: some of the bridges or sites featured in this app may no longer be accessible or safe to approach. They are included for historical and educational purposes. We encourage exploration through knowledge, not risk.

Let your curiosity lead you, but always choose safety first.
Walk slowly. Observe deeply. Let history guide your steps.`}
            </Text>
          </View>
        </View>
      </ScrollView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: height * 0.075, padding: 24 },
  infoContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: '#CBEABA',
    borderRadius: 12,
  },
  title: {
    fontFamily: 'Poppins-Regular',
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
  },
  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 24,
  },
});

export default AppInfo;
