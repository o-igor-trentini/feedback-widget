import 'react-native-gesture-handler';

import { Inter_400Regular, Inter_500Medium, useFonts } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Widget from './src/components/Widget/index';
import { theme } from './src/theme/index';

const App = () => {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: theme.colors.background,
            }}
        >
            <Widget />
            <StatusBar style="light" backgroundColor="transparent" translucent />
        </View>
    );
};

export default App;
