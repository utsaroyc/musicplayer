import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import AudioList from '../screens/AudioList'
import Player from '../screens/Player'
import PlayList from '../screens/PlayList'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

const AppNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='Player'>
        <Tab.Screen name='AudioList' component={AudioList} options={{ headerTitleAlign: 'center',
            tabBarIcon: ({color, size}) => (
                <MaterialIcons name="headset" size={size} color={color} />
            )
        }}/>
        <Tab.Screen name='Player' component={Player} options={{ headerTitleAlign: 'center',
            tabBarIcon: ({color, size}) => (
                <FontAwesome5 name="compact-disc" size={size} color={color} />
            ),
        }}/>
        <Tab.Screen name='PlayList' component={PlayList} options={{ headerTitleAlign: 'center',
            tabBarIcon: ({color, size}) => (
                <MaterialIcons name="library-music" size={size} color={color} />
            ),
        }}/>
    </Tab.Navigator>
  )
}

export default AppNavigator

