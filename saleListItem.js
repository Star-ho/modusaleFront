//val 값 [ 브랜드명, 출처(요기요, 배민), 이미지, 분류, 할인금액 ] 
import React from 'react';
import { View, Linking, Text, StyleSheet, Modal, Pressable, Image } from 'react-native';
import {
  AdMobBanner,
  //setTestDeviceIDAsync
} from "expo-ads-admob";

const SaleListItem = ({val,cate}) => {

  const [modalVisible, setModalVisible] = React.useState(false);
  const baeminURL = "baemin://";
  const yogiyoURL = "yogiyoapp://open";
  const coupangURL = "coupangeats://";
  const wemeURL = "cupping://doCommand";
  let resourceApp
  let playStoreLink
  let redirectURL
  const uriScheme=val[5]
  //테스트 앱 test app
//   React.useEffect(() => {
//     setTestDeviceIDAsync("testdevice");
//  }, []);
  if(val=='ad')  {
    return(        <View style={styles.adView}>
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
  const LinkingAPP=({source,url})=>{
    //console.log(uriScheme)
    //console.log(val)
    if(source=='yogiyo'){
      redirectURL=yogiyoURL
      playStoreLink="market://details?id=com.fineapp.yogiyo"
    }else if(source=='baemin'){
      redirectURL=baeminURL
      playStoreLink="market://details?id=com.sampleapp"
    }else if(source=='coupang'){
      redirectURL=coupangURL
      playStoreLink="market://details?id=com.coupang.mobile.eats"
    }else if(source=='wemef'){
      redirectURL=wemeURL
      playStoreLink="market://details?id=com.wemakeprice.cupping"
    }

    const handlePress = React.useCallback(async () => {
      try{
        await Linking.openURL(uriScheme);
      }catch{
        try{
          await Linking.openURL(redirectURL);
        }catch{
          await Linking.openURL(playStoreLink);
        }
      }

    }, [redirectURL]);
    return ( 
    <Pressable
      style={[styles.button, styles.buttonClose,{marginRight:10,paddingHorizontal:20}]}
      onPress={() => handlePress()}
    >
      <Text style={styles.textStyle}>이동하기</Text>
    </Pressable>)
  }
  function BrandName({val}){
    if(val[1]=='yogiyo'){
      return (
        <View style={{flexDirection:'row',flex:1,marginTop:2}} >
            <Image style={styles.brandlogo} source={require('./assets/yogiyo_logo.png')} />
            <Text style={styles.sourceText}>  요기요</Text>
        </View>
      )
    }else if(val[1]=='baemin'){
      return (
        <View style={{flexDirection:'row',flex:1,marginTop:2}} >
          <Image style={styles.brandlogo} source={require('./assets/bamin_logo.png')} />
          <Text style={styles.sourceText}>  배달의민족</Text>
        </View>
        )
    }else if(val[1]=='coupang'){
      return (
        <View style={{flexDirection:'row',flex:1,marginTop:2}} >
          <Image style={styles.brandlogo} source={require('./assets/coupang_logo.png')} />
          <Text style={styles.sourceText}>  쿠팡잇츠</Text>
        </View>
      )
    }else if(val[1]=='wemef'){
      return (
        <View style={{flexDirection:'row',flex:1,marginTop:2}} >
          <Image style={styles.brandlogo} source={require('./assets/wemef_logo.png')} />
          <Text style={styles.sourceText}>  위메프오</Text>
        </View>
      )
    }
  
  }
  function ItemName({val}){
    if(val[1]=='coupang'){
      return (
        <View style={{flex:1, flexDirection:'row'}}>
          <Text>
            <Text style={styles.brandText}>{ val[0] }</Text>
            <Text style={styles.addtionalText}>(한정수량)</Text>
          </Text>
        </View>
      )
    }else{
      return (
        <View style={{flex:1}}>
          <Text style={styles.brandText}>{ val[0] }</Text>
        </View>
      )
    }

  }

      return (
        <View style={{flexDirection:'row',height:90}}>
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
              <Text style={styles.modalText}>{resourceApp+"앱으로 이동하시겠습니까?"}</Text>          

          <AdMobBanner
            bannerSize="mediumRectangle"
            adUnitID="ca-app-pub-5926200986625193/7250011193" 
            servePersonalizedAds={true}
            onDidFailToReceiveAdWithError={(e) => console.log(e)}
            />
              <View style={{flexDirection:'row',marginTop:10}}>
              <LinkingAPP source={val[1]} url={val[5]} />
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

        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={{flex:1}}
          >
            <View style={styles.container}>
              <HaveImage ImageName={val[2]}/>
              <View style={{flex:1, marginLeft:10}}>
                <View style={{flex:0.5}}>
                  <BrandName val={val} />
                </View>
                <ItemName val={val}/>
                <View style={{flex:1,flexDirection:'row'}}>
                <Text style={styles.priceText}>{ "최대 " }</Text><Text style={styles.price}>{ val[4] }</Text><Text style={styles.priceText}>{"원 할인" }</Text></View>
              </View>
            </View>
        </Pressable>
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
    backgroundColor:'white',
    flexDirection: 'row',
    padding:10,
    borderBottomColor: '#990200',
    borderBottomWidth: 1,

  },
  brandText: {
    flex: 6,
    fontWeight: '500',
    fontSize: 23,
  },
  addtionalText: {
    flex: 5,
    fontWeight: '300',
    fontSize: 10,
  },
  priceText: {
    fontWeight: '500',
    fontSize: 12,
  },
  price: {
    fontWeight: '500',
    fontSize: 12,
    color:'#C10000'
  },
  logo: {
    width: 70,
    height: 70,
  },
  brandlogo:{
    width: 10,
    height: 10,
    marginTop:2
  },
  sourceText: {
    flex: 2,
    fontWeight: '500',
    fontSize: 10,
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
  },
  adView:{
    borderBottomColor: '#990200',
    borderBottomWidth: 1,
  },
  nullView:{
    height:60
  }
});

export default SaleListItem;