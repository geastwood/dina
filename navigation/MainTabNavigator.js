import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'

const HomeStack = createStackNavigator({
    Home: HomeScreen,
})

HomeStack.navigationOptions = {
    tabBarLabel: 'Chat',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-chatbubbles${focused ? '' : '-outline'}` : 'md-ios-chatbubbles'}
        />
    ),
}

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
})

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
        />
    ),
}

export default createBottomTabNavigator({
    HomeStack,
    SettingsStack,
})
