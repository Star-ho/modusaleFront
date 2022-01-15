import * as React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, BackHandler, Modal,Pressable,FlatList,Animated, Platform } from 'react-native';
import ContentsTab from './ContentsTab.js'
import { SearchBar } from 'react-native-elements';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as Location from "expo-location";
import { ExitModule } from  "./exitModule.js"
import { fontSizeFlex,heightSize } from "./fontSizeFlex.js";
import * as Facebook from 'expo-facebook';
import * as SQLite from 'expo-sqlite';
import { AntDesign } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app';
import AppLoading from 'expo-app-loading';
import { getAppDataRequest } from "./request.js"
import { 
  setTestDeviceIDAsync
} from "expo-ads-admob";
import ErrorModal from './ErrorModal.js'


const db = SQLite.openDatabase('hideDB.db');
Facebook.initializeAsync({appId:'1284519921980066'})

const firebaseConfig = {
  apiKey: 'AIzaSyAt6sBnM6zaeFzfEhhDI04G7GgnDfrtiO4',
  authDomain: 'salemoa-c979e.firebaseapp.com',
  databaseURL: 'https://salemoa-c979e.firebaseio.com',
  projectId: 'salemoa-c979e',
  storageBucket: 'salemoa-c979e.appspot.com',
  appId: 'iof.processTA',
};

initializeApp(firebaseConfig);

export default function App() {

 const [error,setError]=React.useState(false);

  const [searchText, setSearchText] = React.useState("");
  const [modalVisible,setModalVisible]=React.useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const [isHide, setIsHide] = React.useState(true)
  const [refreshing,setRfreshing]=React.useState(true)
  const [loaded] = useFonts({
    BMHANNAPro: require('./assets/fonts/BMJUA_ttf.ttf'),
  });
  const [hideListVisible,setHideListVisible]=React.useState(false)
  const createTable='CREATE TABLE IF NOT EXISTS hidetable(item TEXT PRIMARY KEY);'
  
  const [location, setLocation] = React.useState(null);
  const [resData, setRestData ]=React.useState([]);
  const [hideItem,setHideItem]=React.useState([]);

  //앱 시작
  React.useEffect(()=>{
    db.transaction((tx)=>{
      tx.executeSql(createTable);
      tx.executeSql('select * from hidetable',[],(_,{rows:{_array}})=>{
        _array=_array.map(v=>v.item)
        let temp=[..._array]
        temp.sort()
        setHideItem(temp)
      })
    })
    
    Location.requestForegroundPermissionsAsync().then(res=>{
      if(res?.status== 'granted'){
        Location.getCurrentPositionAsync({}).then(location=>{
          setLocation(location);
          getAppDataRequest(location).then(res=>{
            setRestData(res)
          })
        });
      }else{
        getAppDataRequest(null).then(res=>{
        setRestData(res)
        })
      }
    });
  },[])

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


  const deleteHideBrand=(item)=>{
    // console.log(item)
    db.transaction((tx)=>{
      tx.executeSql('delete from hidetable where item=?',[item])
      tx.executeSql('select * from hidetable',[],(_,{rows:{_array}})=>{
        _array=_array.map(v=>v.item)
        let temp=[..._array]
        temp.sort()
        setHideItem(temp)
      })
    })
  }

  const hideListClose=()=>{
    setRfreshing(!refreshing)
    setHideListVisible(false)
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

  if(resData.error){
    return <ErrorModal/>
  }

  if (resData.length==0) {
    return (
      <AppLoading/>
    ); 
  }

  return (
    <SafeAreaView style={styles.container}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={hideListVisible}
        onRequestClose={() => {
          hideListClose();
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
                  <View style={{width:fontSizeFlex(250),flexDirection:'row',marginVertical:fontSizeFlex(5) }}>
                      <View style={{flex:2, justifyContent:'center'}} >
                        {item.length<8?
                        <Text allowFontScaling={false} style={{ fontSize:fontSizeFlex(23),fontFamily:'BMHANNAPro'}}>{item}</Text>:
                        <Text allowFontScaling={false} style={{ fontSize:fontSizeFlex(17),fontFamily:'BMHANNAPro'}}>{item}</Text>
                        }
                          
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
    <ExitModule modalVisible={modalVisible} setModalVisible={setModalVisible}  />
    </Modal>
      <View style={{ flexDirection: 'row',backgroundColor:'#8A0602', height:heightSize(54)}}>
        <View style={{ flex:1.2 }}>
          <Image style={styles.logoImg} source={require('./assets/homelogo.png')} />
        </View>
        
        <View style={{flex:5}}>
          <View style={styles.SearchBar}>
            <SearchBar
              placeholder="어떤 브랜드를 찾으시나요?"
              onChangeText={item=>setSearchText(item)}
              value={searchText}
              allowFontScaling={false} 
              containerStyle={{backgroundColor:'#8A0602',
                borderBottomColor: 'transparent',
                borderTopColor: 'transparent',
                padding:heightSize(1),
                height:heightSize(40),
              }}
              placeholderTextColor="#5f5858"
              inputContainerStyle={{backgroundColor:'white',borderRadius:20,fontSize:heightSize(8) }}
              style={{backgroundColor:'white',fontSize:fontSizeFlex(12)}}
              cancelIcon ={true}
              onEndEditing={()=>{console.log(1)}}
            />
          </View>
          </View>
          {isHide?
            <Pressable 
              style={{flex:1.5,alignItems:'center',justifyContent:'center'}}
              onPress={fadeIn}
              >
              <Text 
                allowFontScaling={false} 
                style={styles.hide}
              >
                숨기기
              </Text>
            </Pressable>:
              <View style={{flex:2,flexDirection:'row'}}>
                <Pressable 
                style={{flex:1.5,alignContent:'center',justifyContent:'center',paddingLeft:fontSizeFlex(5)}}
                onPress={()=>setHideListVisible(true)}
              >
                <Text 
                  allowFontScaling={false} 
                  style={styles.hide}
                >
                  목록
                </Text>
              </Pressable>
              <Pressable 
              style={{flex:1.5,alignContent:'center',justifyContent:'center',paddingRight:fontSizeFlex(5)}}
              onPress={fadeOut}
              >
              <Text 
                allowFontScaling={false} 
                style={styles.hide}
              >
                취소
              </Text>
            </Pressable>
          </View>
          }
        </View>
      <ContentsTab searchText={searchText} location={location} refreshing={refreshing} setSearchText={setSearchText} hideItem={hideItem} setHideItem={setHideItem} fadeAnim={fadeAnim} isHide={isHide} resData={resData} />
    </SafeAreaView>
  );
}
let marginTop=0
let searchMargin=heightSize(1.75)
let logoMargin=heightSize(7)
let hideMarginTop=heightSize(0)
if(Platform.OS=="android"){
  marginTop=40
  searchMargin=heightSize(8)
  logoMargin=heightSize(8)
  hideMarginTop=heightSize(8)
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: marginTop,
    zIndex: 0,
  },
  SearchBar:{
    marginTop:searchMargin,
  },
  logoImg:{
    width:heightSize(40),height:heightSize(40),margin:logoMargin
  },
  hide:{
    color:'white',fontSize:fontSizeFlex(15),fontFamily:'BMHANNAPro',marginLeft:7,marginTop:hideMarginTop
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    
  },
  modalView: {
    flex:1,
    maxHeight:420,
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
    maxHeight:fontSizeFlex(400),
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



