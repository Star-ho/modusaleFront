//npx babel-node --presets @babel/env index.js
//npx react-native run-android

import React,{useState, Component} from 'react';
import {SafeAreaView, StyleSheet, View, Text, ScrollView } from 'react-native';
import SaleList from './saleList';
import Icon from 'react-native-vector-icons/Ionicons';

class TopBar extends Component {
  render() {
    return (
      <View style={{ flex:1, flexDirection: 'row'}}>
        <Icon name="menu-outline" size={50} />
        <View style={{flex: 1, height: 50, }}>
          <Text>현재 사용하는것들</Text>
        </View>
      </View>
    )
  }
}

class MenuBar extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <ScrollView style={styles.menuScrollBar} horizontal={true} showsHorizontalScrollIndicator = {true} >
          <View style={styles.menuBarTab}>
            <Text>
              전체
            </Text>
          </View>
          <View style={styles.menuBarTab}>
            <Text>
              치킨
            </Text>
          </View>
          <View style={styles.menuBarTab}>
            <Text>
              피자
            </Text>
          </View>
          <View style={styles.menuBarTab}>
            <Text>
              양식
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const App = () => { 
  const [allInfo, setAllInfo] = useState([]);
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

  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <MenuBar />
      <View style={styles.card}>
        <SaleList infos={allInfo} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
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

export default App;