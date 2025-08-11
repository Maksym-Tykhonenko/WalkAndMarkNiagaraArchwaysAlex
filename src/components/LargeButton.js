import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const LargeButton = ({ title, onPress, style, isDisabled, textStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 51,
    backgroundColor: '#F6AE29',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1C5839',
  },
});

export default LargeButton;
