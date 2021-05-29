import * as React from 'react';
import { Text, View,SafeAreaView, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SaleList from './saleList';



function Contents({allInfo}) {
  const [viewInfo, setViewInfo] = React.useState([]);

    return (
      <View style={styles.card}>
        <SaleList infos={allInfo} />
      </View>
    );
  } 
export default Contents;