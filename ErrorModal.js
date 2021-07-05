import * as React from 'react';
import {  Modal, Pressable, Text, View, StyleSheet,Linking, Dimensions  } from 'react-native';

function ErrorModal (){ 
  const [modalVisible, setModalVisible] = React.useState(true);
  const ToPlayStore=()=>{
    const redirectURL = "market://details?id=iof.processTA"
    const handlePress = React.useCallback(async () => {
        await Linking.openURL(redirectURL);
    }, [redirectURL]);
    return ( 
    <Pressable
      style={[styles.button, styles.buttonClose,{marginRight:10}]}
      onPress={() => handlePress()}
    >
      <Text style={styles.textStyle}>업데이트 하기</Text>
    </Pressable>)
  }

    return (
    <View style={{backgroundColor:'white',position:'absolute', width:Dimensions.get('screen').width, height:Dimensions.get('screen').height
}}>
        <View style={styles.centeredView}>
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
                <Text style={styles.modalText}>업데이트가 필요합니다!</Text>
                <ToPlayStore/>
                </View>
            </View>
            </Modal>
            <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
            >
            <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
        </View>
    </View>
    )
  }


const styles = StyleSheet.create({
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
    fontSize:20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize:30,
    marginBottom: 15,
    textAlign: "center"
  },
  bottunText:{
    fontSize:12
    ,textDecorationLine: 'line-through', textDecorationStyle: 'solid'
  }
});

export default ErrorModal;