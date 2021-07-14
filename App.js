import * as React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, BackHandler, Modal,Pressable,Dimensions} from 'react-native';
import ContentsTab from './ContentsTab.js'
import { SearchBar } from 'react-native-elements';
import { useEffect } from 'react';
import {
  AdMobBanner,
  //setTestDeviceIDAsync
} from "expo-ads-admob";
import { fontSizeFlex,heightSize } from "./fontSizeFlex.js";

export default function App() {
  const [searchText, setSearchText] = React.useState("");
  const [modalVisible,setModalVisible]=React.useState(false);

  //테스트기기설정
    // React.useEffect(() => {
    //    setTestDeviceIDAsync("testdevice");
    // }, []);

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
      <View style={{ flex:1.1, flexDirection: 'row',backgroundColor:'#8A0602'}}>
        <View style={{flex: 1.5 }}>
        <Image style={{width:heightSize(40),height:heightSize(40),margin:heightSize(7)}} source={require('./assets/homelogo.png')} />
        </View>

        <View style={{flex: 5 }}>
          <SearchBar
            placeholder="어떤 가게를 찾으시나요?"
            onChangeText={setSearchText}
            value={searchText}
            allowFontScaling={false} 
            containerStyle={{backgroundColor:'#8A0602',flex:1,margin:heightSize(1)}}
            inputContainerStyle={{backgroundColor:'white',borderRadius:20,fontSize:fontSizeFlex(15)}}
            style={{backgroundColor:'white',margin:0,padding:1,fontSize:fontSizeFlex(15)}}
            cancelIcon ={true}
          />

          </View>
          <View style={{flex:1.5}}></View>
      </View>
      <ContentsTab searchText={searchText} setSearchText={setSearchText} />
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
    fontSize: fontSizeFlex(3),//20,
  }
})



