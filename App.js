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
import * as SQLite from 'expo-sqlite';
import { FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const db = SQLite.openDatabase('hideDB.db');
Facebook.initializeAsync({appId:'1284519921980066'})

export default function App() {
  const [searchText, setSearchText] = React.useState("");
  const [modalVisible,setModalVisible]=React.useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const [isHide, setIsHide] = React.useState(true)
  const [loaded] = useFonts({
    BMHANNAPro: require('./assets/fonts/BMJUA_ttf.ttf'),
  });
  const [hideListVisible,setHideListVisible]=React.useState(false)

  //테스트기기설정
    // React.useEffect(() => {
    //    setTestDeviceIDAsync("testdevice");
    // }, []);

  const createTable='CREATE TABLE IF NOT EXISTS hidetable(item TEXT PRIMARY KEY);'
  
  const [hideItem,setHideItem]=React.useState([]);
  db.transaction((tx)=>{
    tx.executeSql(createTable,[]);
    tx.executeSql('select * from hidetable',[],(_,{rows:{_array}})=>{
      _array=_array.map(v=>v.item)
      if(JSON.stringify(hideItem)!==JSON.stringify(_array)){
        setHideItem([..._array])
      }
    })
  })
  
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
  const deleteHideBrand=(item)=>{
    // console.log(item)
    db.transaction((tx)=>{
      tx.executeSql('delete from hidetable where item=?',[item],()=>{
        setHideItem(hideItem.filter(v=>v!=item))
      })
    })
  }
  const HideList=()=>{
    return(
      <Modal
        animationType="slide"
        transparent={true}
        visible={hideListVisible}
        onRequestClose={() => {
          setHideListVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.hideModalView}>
            <Text 
              allowFontScaling={false} 
              style={{ fontSize:fontSizeFlex(23),fontFamily:'BMHANNAPro', marginBottom:20}}>
                숨기기 목록
            </Text>
            <View style={{flex:1}}>
              <FlatList
                data={hideItem}
                keyExtractor={(item, index) => index.toString()}

                renderItem={({item}) => 
                  <View style={{width:fontSizeFlex(250),flexDirection:'row' }}>
                      <View style={{flex:2, justifyContent:'center'}} >
                        <Text
                          allowFontScaling={false} 
                          style={{ fontSize:fontSizeFlex(23),fontFamily:'BMHANNAPro'}} 

                        >
                          {item}
                        </Text>
                      </View>
                      <Pressable style={{flex:1}} onPress={()=>deleteHideBrand(item)}>
                        <AntDesign name="closecircleo" size={fontSizeFlex(20)} color="black"  />
                      </Pressable>
                  </View>
                }
              />
            </View>
            <View style={{marginTop:10}}>
              <Pressable
                style={[styles.button, styles.buttonClose,{paddingHorizontal:30}]}
                onPress={() => setHideListVisible(false)}
              >
                <Text allowFontScaling={false} style={styles.textStyle}>닫기</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    )
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
          <HideList/>
          <View style={{flex: 7 }}>
          <SearchBar
            placeholder="어떤 브랜드를 찾으시나요?"
            onChangeText={setSearchText}
            value={searchText}
            allowFontScaling={false} 
            containerStyle={{
              backgroundColor:'#8A0602',
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
            onPress={()=>setHideListVisible(true)}
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
            <Text allowFontScaling={false} style={styles.modalText}>{"앱을 종료하시겠습니까??"}</Text>          
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
              <Text allowFontScaling={false} style={styles.textStyle}>종료</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose,{paddingHorizontal:30}]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text allowFontScaling={false} style={styles.textStyle}>취소</Text>
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
      <ContentsTab searchText={searchText} setSearchText={setSearchText} hideItem={hideItem} setHideItem={setHideItem} fadeAnim={fadeAnim} isHide={isHide} />
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
    flex:1,
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
  hideModalView: {
    width:fontSizeFlex(250),
    flex:1,
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



