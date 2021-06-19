//npx babel-node --presets @babel/env index.js
//npm run android

import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert,CheckBox, SafeAreaView, BackHandler, Modal,Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MenuDrawer from 'react-native-side-drawer'
import ContentsTab from './ContentsTab.js'
import DropDownPicker from 'react-native-dropdown-picker';
import DrawerIcon from "./DrawerIconSet.js"
import { useEffect } from 'react';
import {
  AdMobBanner,
  //setTestDeviceIDAsync
} from "expo-ads-admob";


export default function App() {
 
  const [yogiyoSelected, setyogiyoSelection] = React.useState(true);
  const [baeminSelected, setbaeminSelection] = React.useState(true);
  const [coupangSelected, setcoupangSelection] = React.useState(true);
  const [wemefSelected, setwemefSelection] = React.useState(true);

  const [drawerState, setdrawerState] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [sortValue, setsortValue] = React.useState(1);
  const [modalVisible,setModalVisible]=React.useState(false);
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

  //앱 종료
  useEffect(() => {
    const backAction = () => {
      setModalVisible(true)
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  const closeApp=()=>{
      BackHandler.exitApp()
      setModalVisible(!modalVisible)
  }
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
            /><Text style={{flex:3, paddingTop:6 }} >쿠팡이츠</Text>
          </View>
          <View style={{flex:1, flexDirection:'row'}}>
            <CheckBox
              value={wemefSelected}
              onValueChange={setwemefSelection}
              style={styles.checkbox}
            /><Text style={{flex:3, paddingTop:6 }} >위메프오</Text>
          </View>
          <View style={{flex:13}}></View>
        </View>
    );
  };
 
  return (
    <SafeAreaView style={styles.container}>          

    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{"앱을 종료하시겠습니까"}</Text>          

        <AdMobBanner
          bannerSize="mediumRectangle"
          adUnitID="ca-app-pub-5926200986625193/7250011193" 
          servePersonalizedAds={true}
          onDidFailToReceiveAdWithError={(e) => console.log(e)}
          />
            <View style={{flexDirection:'row',marginTop:10}}>
            <Pressable
              style={[styles.button, styles.buttonClose,{paddingHorizontal:30, marginRight:20}]}
              onPress={() => closeApp() }
            >
              <Text style={styles.textStyle}>종료</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose,{paddingHorizontal:30}]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>취소</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>

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
          <ContentsTab filter={{yogiyoSelected,baeminSelected,coupangSelected,wemefSelected}} sortValue={sortValue} />
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
  },
  
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: '500',
    fontSize: 20,
  }
})



