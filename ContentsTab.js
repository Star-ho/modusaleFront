import * as React from 'react';
import {  Modal, Pressable, Text, View, StyleSheet, Linking, AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Contents from "./Content.js"

const Tab = createMaterialTopTabNavigator({
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
});

function ContentsTab ({filter, sortValue}){ 
  const [allInfo, setAllInfo] = React.useState([]);
  const [ViewInfo, setViewInfo] = React.useState([]);
  let category=["치킨","피자","한식","양식","기타"]
  const [error,setError]=React.useState(false);

  const [modalVisible, setModalVisible] = React.useState(true);
  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(appState.current);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  const sortData=()=>{
    let temp=ViewInfo.slice()
    if(sortValue==1){
      temp.sort((a,b)=>( `${a[0]}`.localeCompare(`${b[0]}`)) )
    }else if(sortValue==2){
      temp.sort((a,b)=>( `${b[0]}`.localeCompare(`${a[0]}`)) ) 
    }else if(sortValue==3){
      temp.sort((a,b)=>( a[4]-b[4] ) ) 
    }else{
      temp.sort((a,b)=>( b[4]-a[4] ) ) 
    }
    setViewInfo(temp)
  }

  const filteringData=()=>{
    let temp=allInfo
    if(!filter.yogiyoSelected){
      temp=temp.filter(v=>v[1]!='yogiyo')
    }
    if(!filter.baeminSelected){
      temp=temp.filter(v=>v[1]!='baemin')
    }
    if(!filter.coupangSelected){
      temp=temp.filter(v=>v[1]!='coupang')
    }
    if(!filter.wemefSelected){
      temp=temp.filter(v=>v[1]!='wemef')
    }
    setViewInfo(temp)
  }

  const controllData=(isRefesh)=>{
    fetch("http://sailmoa.com/?ver=0.90").then(res=>res.json())
    .then(res=>{
      if(!res.error){
      let arr=[]
      for(let i of Object.entries(res)){
        arr.push( [ i[1][0], i[1][1], i[1][2], i[1][3], i[1][4], i[1][5] ]  )
      }
      arr.sort((a,b)=>( `${a[0]}`.localeCompare(`${b[0]}`)) )
      //console.log(arr)
      setAllInfo([...arr])

      let temp=[...arr].slice()
      if(!filter.yogiyoSelected){
        temp=temp.filter(v=>v[1]!='yogiyo')
      }
      if(!filter.baeminSelected){
        temp=temp.filter(v=>v[1]!='baemin')
      }
      if(!filter.coupangSelected){
        temp=temp.filter(v=>v[1]!='coupang')
      }
      if(!filter.wemefSelected){
        temp=temp.filter(v=>v[1]!='wemef')
      }

      if(sortValue==1){
        temp.sort((a,b)=>( `${a[0]}`.localeCompare(`${b[0]}`)) )
      }else if(sortValue==2){
        temp.sort((a,b)=>( `${b[0]}`.localeCompare(`${a[0]}`)) ) 
      }else if(sortValue==3){
        temp.sort((a,b)=>( a[4]-b[4] ) ) 
      }else{
        temp.sort((a,b)=>( b[4]-a[4] ) ) 
      }
      setViewInfo(temp)
      if(isRefesh){
        setRefreshing(false)
      }

      }else{
        setError(true)
      }
    })

  }

  React.useEffect(()=>{
    controllData(false)
  },[appStateVisible,refreshing])

  React.useEffect(()=>{
    sortData()
  },[sortValue,appStateVisible,refreshing])
  
  React.useEffect(()=>{
    filteringData()
  },[filter.yogiyoSelected,filter.baeminSelected,filter.coupangSelected,filter.wemefSelected,appStateVisible,refreshing])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    controllData(true)
  }, []);

  const ToPlayStore=()=>{
    const redirectURL = "market://details?id=com.fineapp.yogiyo"
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

  if(error){
    return (
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
    )
  }
  return (
    <View style={styles.container}>
      <NavigationContainer style={{flex:3}}  >
        <Tab.Navigator style={{flex:4}} >
          <Tab.Screen 
            name="전체" 
            children={ () => <Contents ViewInfo={ViewInfo} refreshing={refreshing} onRefresh={onRefresh} /> }
          />
          {category.map( (cate,index) => {
              let data = allInfo.filter(v=>v[3]==cate);
              return <Tab.Screen 
              name={cate}
              key={index}
              children={ () => <Contents ViewInfo={ViewInfo} cate={cate}   refreshing={refreshing} onRefresh={onRefresh}
              /> }
              />
            }
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex:13,
  },
  menuBarTab:{
    width: 130,
    borderWidth: 0.5,
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
    fontSize:20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize:30,
    marginBottom: 15,
    textAlign: "center"
  }
});

export default ContentsTab;