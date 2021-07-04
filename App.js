//npx babel-node --presets @babel/env index.js
//npm run android

import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput,CheckBox, SafeAreaView, BackHandler, Modal,Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ContentsTab from './ContentsTab.js'

import { useEffect } from 'react';
import {
  AdMobBanner,
  //setTestDeviceIDAsync
} from "expo-ads-admob";


export default function App() {
  const [searchText, setSearchText] = React.useState("");
  const [modalVisible,setModalVisible]=React.useState(false);

  //테스트기기설정
    // React.useEffect(() => {
    //    setTestDeviceIDAsync("testdevice");
    // }, []);

  // useEffect(()=>{
  //   filter={yogiyo:yogiyoSelected,baemin:baeminSelected,coupang:coupangSelected,wemef:wemefSelected}
  // },[baeminSelected,yogiyoSelected,coupangSelected,wemefSelected])

  //앱 종료
  // useEffect(() => {
  //   const backAction = () => {
  //     setModalVisible(true)
  //     return true;
  //   };
  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );
  //   return () => backHandler.remove();
  // }, []);

  const closeApp=()=>{
      BackHandler.exitApp()
      setModalVisible(!modalVisible)
  }

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
      <View style={{ flex:1, flexDirection: 'row',backgroundColor:'#8A0602',zIndex: 999}}>
        <View style={{flex: 1, height: 50, }}></View>
          <View style={{flex: 5, height: 50, }}>
            <TextInput
            style={{flex:1,borderBottomWidth:1,paddingRight:10,fontSize:20}}
            onChangeText={setSearchText}
            placeholder={'검색어를입력해주세요'}
            value={searchText}
            >
            </TextInput>
          </View>
          <View style={{flex:1.5}}>
          <Ionicons name="search" size={30} style={{margin:5}} onPress={()=>toggleOpen()}/>
        </View>
      </View>
      <ContentsTab searchText={searchText} />
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



