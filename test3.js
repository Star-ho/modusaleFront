//val 값 [ 브랜드명, 출처(요기요, 배민), 이미지, 분류, 할인금액 ] 

import React from 'react';
import {View, Text, StyleSheet, Modal, Pressable, Image, TouchableOpacity} from 'react-native';

const SaleListItem = ({val,cate}) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  if(val[3]==cate||!cate){
    return (
      <View style={{flex:1}}>
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
              <Text style={styles.modalText}>{val[1]+"로 이동하시겠습니까"}</Text>
              <View style={{flexDirection:'row'}}>
              <Pressable
                style={[styles.button, styles.buttonClose,{marginRight:10}]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>이동하기</Text>
              </Pressable>
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
                <Text style={styles.sourceText}>{ val[1] }</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
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