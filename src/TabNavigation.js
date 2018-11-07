import React from 'react';
import { createBottomTabNavigator, StackNavigator } from 'react-navigation';
import ToDoListScreen from './screens/ToDoListScreen';
import HouseholdScreen from './screens/HouseholdScreen';


export default createBottomTabNavigator(
    {
    ToDoList: ToDoListScreen,
    Household: HouseholdScreen,
    },
    {
        tabBarOptions: {
            initialRouteName: 'ToDoList',

            animationEnabled: 'true',
            activeTintColor: '#ffd344',
            inactiveTintColor: 'white',
            activeBackgroundColor: '#283350',
            inactiveBackgroundColor: '#283350'
        },
        style: {
            backgroundColor: 'blue'
        }
    }
);
