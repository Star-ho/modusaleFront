import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  useIsDrawerOpen 
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class TopBar extends React.Component {
    render() {
      return (
        <View style={{ flex:1, flexDirection: 'row'}}>
          
          <Ionicons name="menu-outline" size={50} />
          <View style={{flex: 1, height: 50, }}>
            <Text>현재 사용하는것들</Text>
          </View>
        </View>
      )
    }
  
}