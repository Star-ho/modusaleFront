//npx babel-node --presets @babel/env index.js
//npm run android

import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, CheckBox, SafeAreaView, Card} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MenuDrawer from 'react-native-side-drawer'
import ContentsTab from './ContentsTab.js'
import DropDownPicker from 'react-native-dropdown-picker';
import DrawerIcon from "./DrawerIconSet.js"
import { useEffect } from 'react';
import {
  AdMobBanner,
  setTestDeviceIDAsync
} from "expo-ads-admob";


export default function App() {
  const [yogiyoSelected, setyogiyoSelection] = React.useState(true);
  const [baeminSelected, setbaeminSelection] = React.useState(true);
  const [coupangSelected, setcoupangSelection] = React.useState(true);
  const [wemefSelected, setwemefSelection] = React.useState(true);

  const [drawerState, setdrawerState] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [sortValue, setsortValue] = React.useState(1);
  const [items, setItems] = React.useState([
    {
      value: '1',
      icon: () => <DrawerIcon val={1} />
    },
    {
      value: '2',
      icon: () => <DrawerIcon val={2} />
    },
    {
      value: '3',
      icon: () => <DrawerIcon val={3} />
    },
    {
      value: '4',
      icon: () => <DrawerIcon val={4} />
    }
  ]);
  //테스트기기설정
    // React.useEffect(() => {
    //    setTestDeviceIDAsync("testdevice");
    // }, []);

  useEffect(()=>{
    filter={yogiyo:yogiyoSelected,baemin:baeminSelected,coupang:coupangSelected,wemef:wemefSelected}
  },[baeminSelected,yogiyoSelected,coupangSelected,wemefSelected])

  const toggleOpen = () => {
    setdrawerState(true);
  };
  const toggleClose = () => {
    setdrawerState(false);
  };


  const drawerContent = () => {
    return (
        <View style={styles.animatedBox} >
          <TouchableOpacity onPress={()=>toggleClose()} style={{flex:1 }} >
            <Text>Close</Text>
          </TouchableOpacity>
          <View style={{flex:1, flexDirection:'row'}}>
            <CheckBox
              value={yogiyoSelected}
              onValueChange={setyogiyoSelection}
              style={styles.checkbox}
            /><Text style={{flex:3, paddingTop:6}} >요기요</Text>
          </View>
          <View style={{flex:1, flexDirection:'row'}}>
            <CheckBox
              value={baeminSelected}
              onValueChange={setbaeminSelection}
              style={styles.checkbox}
            /><Text style={{flex:3, paddingTop:6 }} >배달의민족</Text>
          </View>
          <View style={{flex:1, flexDirection:'row'}}>
            <CheckBox
              value={coupangSelected}
              onValueChange={setcoupangSelection}
              style={styles.checkbox}
            /><Text style={{flex:3, paddingTop:6 }} >쿠팡잇츠</Text>
          </View>
          <View style={{flex:13}}></View>
        </View>
    );
  };
 
  return (
    <SafeAreaView style={styles.container}>          

      <MenuDrawer 
        open={drawerState} 
        drawerContent={drawerContent()}
          drawerPercentage={45}
          animationTime={250}
          overlay={true}
          opacity={1}
      >
           <View style={{ flex:1, flexDirection: 'row'}}>

             <Ionicons name="menu-outline" size={50} onPress={()=>toggleOpen()}/>
             <View style={{flex: 5, height: 50, }}>
             </View>
             <DropDownPicker
               open={open}
               value={sortValue}
               items={items}
               setOpen={setOpen}
               setValue={setsortValue}
               setItems={setItems}
               containerStyle={{
                 height:30,
                 width:100,
                 paddingTop:2
                }}
               placeholder="정렬"
               arrowIconStyle={{
                 width: 10,
                 height: 10
               }}
               textStyle={{
                 textAlign:"center"
               }}
             />  
           </View>

        <View style={{flex:13}}>
          <ContentsTab filter={{yogiyoSelected,baeminSelected,coupangSelected}} sortValue={sortValue} />
        </View>
      </MenuDrawer>
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    zIndex: 0,
  },
  animatedBox: {
    flex: 1,
    backgroundColor: "white",
    padding: 10
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F04812'
  }
})



