//val 값 [ 브랜드명, 출처(요기요, 배민), 이미지, 분류, 할인금액 ] 

import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { fontSizeFlex,heightSize } from "./fontSizeFlex.js";
import {
  AdMobBanner,
  //setTestDeviceIDAsync
} from "expo-ads-admob";


const SaleListItem = ({val,setRedirectModalVisible, setModalVal,fadeAnim, isHide}) => {
  const [loaded] = useFonts({
    BMHANNAPro: require('./assets/fonts/BMJUA_ttf.ttf'),
  });

  
  let resourceApp

  //테스트 앱 test app
//   React.useEffect(() => {
//     setTestDeviceIDAsync("testdevice");
//  }, []);
  if(val=='ad')  {
    return( <View style={styles.adView}>
      <AdMobBanner
        bannerSize="smartBanner"
        adUnitID="ca-app-pub-5926200986625193/7250011193" 
        servePersonalizedAds={true}
        onDidFailToReceiveAdWithError={(e) => console.log(e)}
      />
  </View>)
  }

  if(val=='null')  {
    return(  <View style={styles.nullView}>

  </View>)
  }
  if(val[1]=='yogiyo'){
    resourceApp='요기요'
  }else if(val[1]=='baemin'){
    resourceApp='배달의민족'
  }else if(val[1]=='coupang'){
    resourceApp='쿠팡이츠'
  }else if(val[1]=='wemef'){
    resourceApp='위메프오'
  }

  function BrandName({val}){
    if(val[1]=='yogiyo'){
      return (
        <View style={{flexDirection:'row',marginBottom:1}} >
            <Image style={styles.brandlogo} source={require('./assets/yogiyo_logo.png')} />
            <Text allowFontScaling={false} style={styles.sourceText}>  요기요</Text>
        </View>
      )
    }else if(val[1]=='baemin'){
      return (
        <View style={{flexDirection:'row',marginBottom:1}} >
          <Image style={styles.brandlogo} source={require('./assets/bamin_logo.png')} />
          <Text allowFontScaling={false} style={styles.sourceText}>  배달의민족</Text>
        </View>
        )
    }else if(val[1]=='coupang'){
      return (
        <View style={{flexDirection:'row',marginBottom:1}} >
          <Image style={styles.brandlogo} source={require('./assets/coupang_logo.png')} />
          <Text allowFontScaling={false}  style={styles.sourceText}>  쿠팡잇츠</Text>
        </View>
      )
    }else if(val[1]=='wemef'){
      return (
        <View style={{flexDirection:'row',marginBottom:1}} >
          <Image style={styles.brandlogo} source={require('./assets/wemef_logo.png')} />
          <Text allowFontScaling={false} style={styles.sourceText}>  위메프오</Text>
        </View>
      )
    }
  }

  function itemButtonClick(){
    setModalVal([resourceApp,val[1],val[5]])
    setRedirectModalVisible(true)
  }

  const BrandNameText=()=>{
    if(val[0].length<10){
      return <Text allowFontScaling={false} style={styles.brandText}>{ val[0] }</Text>
    }else{
      return <Text allowFontScaling={false} style={styles.longbrandText}>{ val[0] }</Text>
    }
  }
  const pushHide=()=>{
    if(!isHide){
      console.log(val[0],1)
    }
  }
  return (
    <View style={{flexDirection:'row',height:90, borderBottomColor: '#f4e5e5', backgroundColor:'white',
    borderBottomWidth: 1,}}>
      {/* 클릭 */}
      <Pressable
        onPress={itemButtonClick}
        style={{flex:1}}
        >
          <View style={styles.container}>
            <HaveImage ImageName={val[2]}/>
            <View style={{flex:1, marginLeft:10}}>
              <View style={{flex:0.5,flexDirection:'column-reverse'}}>
                <BrandName val={val}  />
              </View>
              <View style={{height:30}}>
                <BrandNameText/>
              </View>
              <View style={{flex:0.5,flexDirection:'row'}}>
                <Text allowFontScaling={false}  style={styles.priceText}>{ "최대 " }</Text><Text allowFontScaling={false} style={styles.price}>{ val[4] }</Text><Text allowFontScaling={false}  style={styles.priceText}>{"원 할인" }</Text>
              </View>
            </View>
          </View>
      </Pressable>
      {/* 브랜드 숨기기 */}
      <Animated.View style={[{flex:0.23},{opacity:fadeAnim}]}>
        <Pressable
          onPress={() => pushHide()}
          style={{flex:1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:'white'}}
        >
          <View style={{
            flex: 1,
            backgroundColor:'white',
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Text allowFontScaling={false} style={{fontSize: fontSizeFlex(17),fontFamily:'BMHANNAPro'}} >숨기기</Text>
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const HaveImage = ({ImageName}) => { 
  if(ImageName!='없음'){
    return <Image 
    style={styles.logo}
    source={{
      uri: `https://sailmoa.com/${ImageName}`,
    }}
    />
  }
  return <Image 
    style={styles.logo}
    source={{
      uri: "https://sailmoa.com/undefined.png",
    }}
    />
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding:5,
  },
  brandText: {
    flex: 6,
    fontSize: fontSizeFlex(26),
    fontFamily:'BMHANNAPro'
  },
  longbrandText: {
    flex: 6,
    fontSize: fontSizeFlex(23),
    fontFamily:'BMHANNAPro'
  },
  priceText: {
    fontWeight: '500',
    fontSize: fontSizeFlex(12.5),//12,
    fontFamily:'BMHANNAPro'
  },
  price: {
    fontWeight: '500',
    fontSize: fontSizeFlex(12.5),//12,
    color:'#C10000',
    fontFamily:'BMHANNAPro'
  },
  logo: {
    marginVertical:5,
    width: heightSize(60),
    height: heightSize(60),
  },
  brandlogo:{
    width: heightSize(9),
    height: heightSize(9),
    marginTop:1
  },
  sourceText: {
    flex: 2,
    fontWeight: '500',
    fontSize: fontSizeFlex(9),//9.5,
    fontFamily:'BMHANNAPro',
    marginTop:1,
    marginLeft:-2
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
    fontSize: fontSizeFlex(16),//20,
  },
  adView:{
    borderBottomColor: '#f4e5e5',
    borderBottomWidth: 1,
  },
  nullView:{
    height:60
  }
});

export default SaleListItem;