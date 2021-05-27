
import * as React from 'react';
import { Text, View,SafeAreaView, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SaleList from './saleList';
import TopBar from './topbar'

const Tab = createMaterialTopTabNavigator();

const Contents = () => { 
  const [allInfo, setAllInfo] = React.useState([]);
  fetch("http://192.168.1.171:3000").then(res=>res.json())
    .then(res=>{
      let arr=[]
      for(let i of Object.entries(res["baemin"])){
        arr.push({brand: "baemin", name: i[0], discountAmount: i[1]})
      }
      for(let i of Object.entries(res["yogiyo"])){
        arr.push({brand: "yogiyo", name: i[0], discountAmount: i[1]})
      }
      arr.sort((a,b)=>(a.name.localeCompare(b.name)))
      //console.log(arr)
      setAllInfo([...arr])
    })

  function HomeScreen1() {
    return (
      <View style={styles.card}>
        <SaleList infos={allInfo} />
      </View>
    );
  }
    
  function SettingsScreen() {
    return (
      <View style={styles.card}>
        <SaleList infos={allInfo} />
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer style={{flex:3}}  >
        <Tab.Navigator style={{flex:4}} >
          <Tab.Screen name="Home" component={HomeScreen1} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
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

export default Contents;