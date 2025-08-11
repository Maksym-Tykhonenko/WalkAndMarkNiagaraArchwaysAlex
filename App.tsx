import { NavigationContainer } from '@react-navigation/native';

import StackNavigation from './src/nav/StackNavigation';
import { ContextProvider } from './src/store/context';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <NavigationContainer>
      <ContextProvider>
        <StackNavigation />
        <Toast position="top" topOffset={50} />
      </ContextProvider>
    </NavigationContainer>
  );
};

export default App;
