
import * as React from 'react';
import { Text, View,SafeAreaView, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SaleList from './saleList';
import Contents from "./Content.js"

const Tab = createMaterialTopTabNavigator();

const ContentsTab = () => { 
  const [allInfo, setAllInfo] = React.useState([]);
  fetch("http://192.168.1.171:3000").then(res=>res.json())
    .then(res=>{
      let arr=[]
      for(let i of Object.entries(res)){
        arr.push( { [ i[0] ] : [ i[1][0], i[1][1], i[1][2], i[1][3] ] })
      }
      //arr.sort((a,b)=>(Object.keys(a)[0].localeCompare(Object.keys(b)[0])))
      //console.log(arr)
      setAllInfo([...arr])
    })

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer style={{flex:3}}  >
        <Tab.Navigator style={{flex:4}} >
          <Tab.Screen name="Home" component={Contents} value={allInfo} />
          <Tab.Screen name="Settings" component={Contents} value={allInfo} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex:13,
  },
  card: {
    flex:13,
    backgroundColor: '#abcd',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  menuScrollBar:{
  },
  menuBarTab:{
    width: 130,
    borderWidth: 0.5,
  },

});

export default ContentsTab;