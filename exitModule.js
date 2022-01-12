import { View, Text, StyleSheet, Image, SafeAreaView, BackHandler, Modal,Pressable,FlatList,Animated, Platform } from 'react-native';
import {
    AdMobBanner,
    setTestDeviceIDAsync
  } from "expo-ads-admob";
import { fontSizeFlex,heightSize } from "./fontSizeFlex.js";


export function ExitModule({modalVisible,setModalVisible}){
    const closeApp=()=>{
        BackHandler.exitApp()
        setModalVisible(!modalVisible)
    }
    
    return (
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
    )
}

const styles = StyleSheet.create({
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
  
  
  
  