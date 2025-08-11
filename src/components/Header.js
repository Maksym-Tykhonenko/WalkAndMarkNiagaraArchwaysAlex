import { useNavigation } from '@react-navigation/native';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Header = ({
  title,
  onPress,
  children,
  type,
  isUnsavedData,
  setIsVisibleAlert,
}) => {
  const navigation = useNavigation();

  const showConfirm = () => {
    setIsVisibleAlert(true);

    Alert.alert(
      'Unsaved Changes',
      'You have unsaved changes. Are you sure you want to leave?',
      [
        {
          text: 'Cancel',
          onPress: () => setIsVisibleAlert(false),
          style: 'cancel',
        },
        {
          text: 'Discard',
          onPress: () => {
            navigation.goBack(), setIsVisibleAlert(false);
          },
        },
      ],
      { cancelable: false },
    );
  };

  const handleGoBack = () => {
    isUnsavedData ? showConfirm() : navigation.goBack();
  };

  return (
    <View style={styles.headerWrap}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={handleGoBack}
        activeOpacity={0.7}
      >
        <Image source={require('../assets/icons/back.png')} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity
        style={styles.infoBtn}
        activeOpacity={0.7}
        onPress={onPress}
      >
        {type === 'Note' ? (
          <Image source={require('../assets/icons/note.png')} />
        ) : (
          <Image source={require('../assets/icons/share.png')} />
        )}
      </TouchableOpacity>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Header;
