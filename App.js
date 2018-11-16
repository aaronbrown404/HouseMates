import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Image, View } from 'react-native';
import { Icon, Button } from 'native-base';

// These import paths may need to change depending on the directory hierarchy.
import WelcomeScreen from './src/screens/WelcomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HouseSetupScreen from './src/screens/HouseSetupScreen';
import CreateTaskScreen from './src/screens/CreateTaskScreen';
import TabNavigation from './src/TabNavigation';
import LogInScreen from './src/screens/LogInScreen';
import WIPScreen from './src/screens/WIPScreen';
import Firebase from  './src/components/Firebase';

/**
 * Class required for top navigation bar's House Mates Logo image.
 */
class LogoTitle extends React.Component {
    render() {
        return (
            <View style={{paddingLeft: 8}}>
               <Image source={require('./src/assets/HouseMatesPNGLogo_long_noBackground.png')}
                      style={{width: 180, height: 90}}
                      resizeMode='contain'
               />
            </View>
        );
    }
}

// Governs screen names as well as sets up the navigator. Required for screen traversal.
const RootStack = createStackNavigator(
    {
        Welcome: {
            screen: WelcomeScreen
        },
        LogIn: {
            screen: LogInScreen
        },
        SignUp: {
            screen: SignUpScreen
        },
        HouseSetup: {
            screen: HouseSetupScreen
        },
        TabNavigation: {
            screen: TabNavigation
        },
        CreateTask: {
            screen: CreateTaskScreen
        },
        WIP: {
            screen: WIPScreen
        }
    },
    {
        initialRouteName: 'Welcome', // Determines starting screen.

        //headerMode: 'screen',
        navigationOptions: {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#283350',
            },

            // Lacks functionality at the moment. This is the options button (three dots) at the top right
            // of the nav bar on the ToDoListScreen.js and HouseholdScreen.js.
            headerRight:
                <Button transparent
                        style={{justifyContent: 'center', alignSelf: 'center'}}>
                    <Icon style={{color: 'white'}}
                          name="md-more"/>
                </Button>,
            headerTintColor: "white"
        }
    }
);

/**
 * Class initiates the app according to the navigator.
 */
export default class App extends React.Component {

    componentWillMount() {
        Firebase.init();
    }

    render() {
        return <RootStack />;
    }
}
