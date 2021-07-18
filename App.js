import * as React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, BackHandler, Modal,Pressable,Dimensions,Animated} from 'react-native';
import ContentsTab from './ContentsTab.js'
import { SearchBar } from 'react-native-elements';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import {
  AdMobBanner,
  //setTestDeviceIDAsync
} from "expo-ads-admob";
import { fontSizeFlex,heightSize } from "./fontSizeFlex.js";
import * as Facebook from 'expo-facebook';


Facebook.initializeAsync({appId:'1284519921980066'})

export default function App() {
  const [searchText, setSearchText] = React.useState("");
  const [modalVisible,setModalVisible]=React.useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const [isHide, setIsHide] = React.useState(true)
  const [loaded] = useFonts({
    BMHANNAPro: require('./assets/fonts/BMJUA_ttf.ttf'),
  });

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

  const fadeIn = () => {
    setIsHide(false)
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true, 
    }).start();
  };
  const fadeOut = () => {
    setIsHide(true)
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true, 
    }).start();
  };

  const HideButton =()=>{
    if(isHide){
      return(
        <View style={{flex:7.5,flexDirection:'row'}}>
          <View style={{flex: 5 }}>
            <SearchBar
              placeholder="어떤 브랜드를 찾으시나요?"
              onChangeText={setSearchText}
              value={searchText}
              allowFontScaling={false} 
              containerStyle={{backgroundColor:'#8A0602',
              borderBottomColor: 'transparent',
              borderTopColor: 'transparent',
              padding:fontSizeFlex(6)
              }}
              inputContainerStyle={{backgroundColor:'white',borderRadius:20,fontSize:fontSizeFlex(13)}}
              style={{backgroundColor:'white',fontSize:fontSizeFlex(13)}}
              cancelIcon ={true}
            />
          </View>
          <Pressable 
            style={{flex:1.5,alignItems:'center',justifyContent:'center'}}
            onPress={fadeIn}
            >
            <Text 
              allowFontScaling={false} 
              style={{color:'white',fontSize:fontSizeFlex(15),fontFamily:'BMHANNAPro',marginLeft:7,marginTop:9}}
            >
              숨기기
            </Text>
          </Pressable>
        </View>
       )
    }else{
      return(
        <View style={{flex:7.5,flexDirection:'row'}}>
          <View style={{flex: 7 }}>
          <SearchBar
              placeholder="어떤 브랜드를 찾으시나요?"
              onChangeText={setSearchText}
              value={searchText}
              allowFontScaling={false} 
              containerStyle={{backgroundColor:'#8A0602',
              borderBottomColor: 'transparent',
              borderTopColor: 'transparent',
              padding:fontSizeFlex(6)
              }}
              inputContainerStyle={{backgroundColor:'white',borderRadius:20,fontSize:fontSizeFlex(13)}}
              style={{backgroundColor:'white',fontSize:fontSizeFlex(13)}}
              cancelIcon ={true}
            />
          </View>
          <Pressable 
          style={{flex:1.5,alignContent:'center',justifyContent:'center'}}
          onPress={fadeOut}
          >
          <Text 
            allowFontScaling={false} 
            style={{color:'white',fontSize:fontSizeFlex(15),fontFamily:'BMHANNAPro',marginLeft:7,marginTop:9}}
          >
            목록
          </Text>
        </Pressable>
          <Pressable 
          style={{flex:1.5,alignContent:'center',justifyContent:'center'}}
          onPress={fadeOut}
          >
          <Text 
            allowFontScaling={false} 
            style={{color:'white',fontSize:fontSizeFlex(15),fontFamily:'BMHANNAPro',marginLeft:7,marginTop:9}}
          >
            취소
          </Text>
        </Pressable>
      </View>
      )
    }
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
            <Text style={styles.modalText}>{"앱을 종료하시겠습니까??"}</Text>          
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

        
          <HideButton/>
      </View>
      <ContentsTab searchText={searchText} setSearchText={setSearchText} fadeAnim={fadeAnim} isHide={isHide} />
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
    fontSize: fontSizeFlex(19),//30,
  }
})



