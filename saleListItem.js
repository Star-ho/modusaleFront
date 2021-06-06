//val 값 [ 브랜드명, 출처(요기요, 배민), 이미지, 분류, 할인금액 ] 

import React from 'react';
import { View, Linking, Text, StyleSheet, Modal, Pressable, Image, Alert } from 'react-native';

const SaleListItem = ({val,cate}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const baeminURL = "baemin://";
  const yogiyoURL = "yogiyoapp://open";
  const coupangURL = "coupangeats://";
  const wemeURL = "cupping://doCommand";
  let resourceApp
  let playStoreLink

  if(val[1]=='yogiyo'){
    resourceApp='요기요'
  }else if(val[1]=='baemin'){
    resourceApp='배달의민족'
  }else if(val[1]=='coupang'){
    resourceApp='쿠팡잇츠'
  }else if(val[1]=='wemef'){
    resourceApp='위메프오앱'
  }

  const LinkingAPP=({url})=>{
    if(url=='yogiyo'){
      redirectURL=yogiyoURL
      playStoreLink="market://details?id=com.fineapp.yogiyo"
    }else if(url=='baemin'){
      redirectURL=baeminURL
      playStoreLink="market://details?id=com.sampleapp"
    }else if(url=='coupang'){
      redirectURL=coupangURL
      playStoreLink="market://details?id=com.coupang.mobile.eats"
    }else if(url=='wemef'){
      redirectURL=wemeURL
      playStoreLink="market://details?id=com.wemakeprice.cupping"
    }
    const handlePress = React.useCallback(async () => {
      try{
        await Linking.openURL(redirectURL);
      }catch{
        await Linking.openURL(playStoreLink);
      }

    }, [redirectURL]);
    return ( 
    <Pressable
      style={[styles.button, styles.buttonClose,{marginRight:10}]}
      onPress={() => handlePress()}
    >
      <Text style={styles.textStyle}>이동하기</Text>
    </Pressable>)
  }

  if(val[3]==cate||!cate){
    return (
        <View style={{flex:1,flexDirection:'row'}}>
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
              <View style={{flexDirection:'row'}}>
              <LinkingAPP url={val[1]}/>
              <Pressable
                style={[styles.button, styles.buttonClose]}
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
                <Text style={styles.sourceText}>{ resourceApp }</Text>
                <Text style={styles.brandText}>{ val[0] }</Text>
                <Text style={styles.priceText}>{ "최대 " +val[4]+"원 할인" }</Text>
              </View>
            </View>
        </Pressable>

            </View>
    );
  }else{
    return <View></View>
  }
};

const HaveImage = ({ImageName}) => { 
  if(ImageName!='없음'){
    return <Image 
    style={styles.logo}
    source={{
      uri: `http://192.168.1.171:3000/${ImageName}`,
    }}
    />
  }
  return <Image 
    style={styles.logo}
    source={{
      uri: "http://192.168.1.171:3000/undefiend.png",
    }}
    />
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding:10
  },
  sourceText: {
    flex: 2,
    fontWeight: '500',
    fontSize: 10,
  },
  brandText: {
    flex: 5,
    fontWeight: '500',
    fontSize: 18,
  },
  priceText: {
    flex: 2,
    fontWeight: '500',
    fontSize: 10,
  },
  logo: {
    width: 70,
    height: 70,
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
    textAlign: "center"
  }
});

export default SaleListItem;