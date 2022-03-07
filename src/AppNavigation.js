import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Share, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import NewsScreen from './screen/NewsScreen'
import DetailsScreen from './screen/DetailsScreen';
import FavScreen from './screen/FavScreen';
import WebViewScreen from './screen/WebViewScreen';
import SearchScreen from './screen/SearchScreen';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { appTheme } from './appTheme';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    const url = useSelector(state => state.selectedNewsUrl.newsUrl);
    const navigate = useNavigation()

    const shareUrlHandler = async () => {
        try {
            const result = await Share.share({ message: `GON24 | ${url}` });
            if (result.action === Share.sharedAction) {
                if (result.activityType) { } else { }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const navigationToSearchHandler = () => { navigate.navigate('SearchScreen') }

    return (
        <Stack.Navigator
            screenOptions={{ headerStyle: { backgroundColor: appTheme.colors.primary }, headerTintColor: '#fff' }}>
            <Stack.Screen name="Home" component={NewsScreen}
                options={{
                    title: 'GON24', headerRight: () => (
                        <Pressable onPress={navigationToSearchHandler}>
                            < AntDesign name="search1" size={24} color="#fff" />
                        </Pressable>
                    )
                }}
            />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen}
                options={{
                    title: '', headerRight: () => (
                        <Pressable onPress={shareUrlHandler}>
                            <AntDesign name="sharealt" size={24} color="#fff" />
                        </Pressable>
                    ),
                }}
            />
            <Stack.Screen name="FavScreen" component={FavScreen} />
            <Stack.Screen name="WebViewScreen" component={WebViewScreen} options={{ title: '' }} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ title: '', headerShown: false }} />
        </Stack.Navigator>

    )
}

export default AppNavigation