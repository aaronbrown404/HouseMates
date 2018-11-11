import React from 'react';
import {createStackNavigator } from 'react-navigation';

// These import paths may need to change depending on the directory hierarchy.
import WelcomeScreen from './src/screens/WelcomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HouseSetupScreen from './src/screens/HouseSetupScreen';
import WIPScreen from './src/screens/WIPScreen';
import TabNavigation from './src/TabNavigation';
import Firebase from  './src/components/Firebase';


// Governs screen names as well as sets up the navigator. Required for screen traversal.
const RootStack = createStackNavigator(
    {
        Welcome: {
            screen: WelcomeScreen
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
        WIP: {
            screen: WIPScreen
        }
    },
    {

        initialRouteName: 'Welcome', // Determines starting screen.

        headerMode: 'screen',
        navigationOptions: {
            headerTitleStyle: {
                fontWeight: "bold",
                color: "#fff",
            },
            headerTintColor: "blue"
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
