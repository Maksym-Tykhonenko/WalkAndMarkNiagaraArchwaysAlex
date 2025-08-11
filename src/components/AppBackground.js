import { ImageBackground } from 'react-native';

const AppBackground = ({ children, style }) => {
  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={[{ flex: 1 }, style]}
    >
      {children}
    </ImageBackground>
  );
};

export default AppBackground;
