import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const SmallButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    backgroundColor: '#1C5839',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#CBEABA',
  },
});

export default SmallButton;
