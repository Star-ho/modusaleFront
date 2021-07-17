import * as React from 'react';
import {  Text, View, StyleSheet, AppState,TouchableOpacity, Dimensions  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Contents from "./Content.js"
import DropDownPicker from 'react-native-dropdown-picker';
import ErrorModal from './ErrorModal.js'
import DrawerIcon from './DrawerIconSet.js';
import { useFonts } from 'expo-font';
import { fontSizeFlex, heightSize } from "./fontSizeFlex.js";

const Tab = createMaterialTopTabNavigator();

function ContentsTab ({ searchText,setSearchText}){ 
  const [loaded] = useFonts({
    BMJUA_ttf: require('./assets/fonts/BMJUA_ttf.ttf'),
  });

  const [allInfo, setAllInfo] = React.useState([]);
  const [filterInfo, setFilterInfo] = React.useState([]);
  const [ViewInfo, setViewInfo] = React.useState([]);
  let category=["치킨","피자","한식","양식","기타","앱할인"]
  const [error,setError]=React.useState(false);

  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(appState.current);
  const [refreshing, setRefreshing] = React.useState(false);
  const [sortValue, setsortValue] = React.useState('1');

  const [yogiyoSelected, setyogiyoSelected] = React.useState(true);
  const [baeminSelected, setbaeminSelected] = React.useState(true);
  const [coupangSelected, setcoupangSelected] = React.useState(true);
  const [wemefSelected, setwemefSelected] = React.useState(true);
  const [flag, setFlag]=React.useState(1)
  const [open, setOpen]=React.useState(false)
  
  const [items, setItems] = React.useState([
    {
      value: '1',
      icon: () => <DrawerIcon val={1} />
    },
    {
      value: '2',
      icon: () => <DrawerIcon val={2} />
    },
    {
      value: '3',
      icon: () => <DrawerIcon val={3} />
    }
  ]);

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

  function sortData(){
    let temp=filterInfo.slice()
    if(sortValue==='1'){
      temp.sort((a,b)=>( `${a[0]}`.localeCompare(`${b[0]}`)) )
    }else if(sortValue==='2'){
      temp.sort((a,b)=>( `${b[0]}`.localeCompare(`${a[0]}`)) ) 
    }else{
      temp.sort((a,b)=>( b[4]-a[4] ) ) 
    }
    setFilterInfo(temp)
    setViewInfo(temp)
  }

  function filteringData(){
    let temp=allInfo.slice()
    if(!yogiyoSelected){
      temp=temp.filter(v=>v[1]!='yogiyo')
    }
    if(!baeminSelected){
      temp=temp.filter(v=>v[1]!='baemin')
    }
    if(!coupangSelected){
      temp=temp.filter(v=>v[1]!='coupang')
    }
    if(!wemefSelected){
      temp=temp.filter(v=>v[1]!='wemef')
    }
    if(sortValue==='1'){
      temp.sort((a,b)=>( `${a[0]}`.localeCompare(`${b[0]}`)) )
    }else if(sortValue==='2'){
      temp.sort((a,b)=>( `${b[0]}`.localeCompare(`${a[0]}`)) ) 
    }else{
      temp.sort((a,b)=>( b[4]-a[4] ) ) 
    }
    setFilterInfo(temp)
    setViewInfo(temp)

  }

  
  function controllData(){
    fetch("http://sailmoa.com/?ver=0.91").then(res=>res.json())
    .then(res=>{
      if(!res.error){
      let arr=[]
      for(let i of Object.entries(res)){
        arr.push( [ i[1][0].toUpperCase(), i[1][1], i[1][2], i[1][3], i[1][4], i[1][5] ]  )
      }
      //console.log(arr)
      arr.sort((a,b)=>( `${a[0]}`.localeCompare(`${b[0]}`)) )
      setAllInfo(arr)
      setFilterInfo(arr)
      setViewInfo(arr)
      setSearchText('')
      if(flag!=1){
        filteringData()
      }else{
        setFlag(2)
      }
      }else{
        setError(true)
      }
    })
  }

  //검색어입력
  React.useEffect(() => {
      let res=filterInfo.filter(v=>v[0].toLowerCase().includes(searchText.toLowerCase()))
      setViewInfo(res)
  }, [searchText]);

  React.useEffect(()=>{
    controllData()
  },[appStateVisible,refreshing])

  React.useEffect(()=>{
    sortData()
  },[sortValue])
  
  React.useEffect(()=>{
    filteringData()
  },[yogiyoSelected,baeminSelected,coupangSelected,wemefSelected,allInfo,refreshing,appStateVisible])

  if(error){
    return (
      <ErrorModal/>
    )
  }


  const filterApp=(appname)=>{
    if(appname=='baemin'){
      setbaeminSelected(!baeminSelected)
    }
    if(appname=='yogiyo'){
      setyogiyoSelected(!yogiyoSelected)
    }
    if(appname=='wemef'){
      setwemefSelected(!wemefSelected)
    }
    if(appname=='coupang'){
      setcoupangSelected(!coupangSelected)
    }
  }

  const AppButton=({appname})=>{
    if(appname=='baemin'){
      if(baeminSelected){
        return (<TouchableOpacity
          onPress={()=>filterApp(appname)}
          style={styles[appname]}>
          <Text allowFontScaling={false} style={styles.buttonText}>배달의민족</Text>
        </TouchableOpacity>)
      }else{
        return (<TouchableOpacity
          onPress={()=>filterApp(appname)}
          style={styles[appname]}>
          <Text allowFontScaling={false} style={styles.delButtonText}>배달의민족</Text>
        </TouchableOpacity>)
      }
    }else if(appname=='yogiyo'){
      if(yogiyoSelected){
        return (<TouchableOpacity
          onPress={()=>filterApp(appname)}
          style={styles[appname]}>
          <Text allowFontScaling={false} style={styles.buttonText}>요기요</Text>
        </TouchableOpacity>)
      }else{
        return (<TouchableOpacity
          onPress={()=>filterApp(appname)}
          style={styles[appname]}>
          <Text allowFontScaling={false} style={styles.delButtonText}>요기요</Text>
        </TouchableOpacity>)
      }
    }else if(appname=='wemef'){
      if(wemefSelected){
        return (<TouchableOpacity
          onPress={()=>filterApp(appname)}
          style={styles[appname]}>
          <Text allowFontScaling={false} style={styles.buttonText}>위메프오</Text>
        </TouchableOpacity>)
      }else{
        return (<TouchableOpacity
          onPress={()=>filterApp(appname)}
          style={styles[appname]}>
          <Text allowFontScaling={false} style={styles.delButtonText}>위메프오</Text>
        </TouchableOpacity>)
      }
    }else{
      if(coupangSelected){
        return (<TouchableOpacity
          onPress={()=>filterApp(appname)}
          style={styles[appname]}>
          <Text allowFontScaling={false} style={styles.buttonText}>쿠팡잇츠</Text>
        </TouchableOpacity>)
      }else{
        return (<TouchableOpacity
          onPress={()=>filterApp(appname)}
          style={styles[appname]}>
          <Text allowFontScaling={false} style={styles.delButtonText}>쿠팡잇츠</Text>
        </TouchableOpacity>)
      }
    }
  }

  const TobUnderBar=({sortValue})=>{
    return(
    <View style={{height:heightSize(33), borderBottomWidth:1, borderBottomColor: '#990200',flexDirection:'row',backgroundColor:'white',zIndex:9999}}>
        <View style={{flexDirection:'row',flex:3}}>
          <AppButton appname='baemin'/>
          <AppButton appname='yogiyo'/>
          <AppButton appname='coupang'/>
          <AppButton appname='wemef'/>
        </View>

          <View style={{flex: 1.7,flexDirection:'row-reverse'}}> 
              <DropDownPicker
                open={open}
                value={sortValue}
                items={items}
                setOpen={setOpen}
                showArrowIcon={false}
                style={{height:32,width:heightSize(80) }}
                containerStyle={{width:heightSize(80),margin:4}}
                zIndex={100}
                setValue={setsortValue}
                setItems={setItems}
                listItemContainerStyle={{height:40}}
                bottomOffset={100}
                listMode='MODAL'
                placeholder="이름순"
                allowFontScaling={false} 
                textStyle={{
                  color:'black',
                }}
                labelStyle={{
                  fontSize:fontSizeFlex(13)
                }}
              />  
          </View>
      </View>)
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator  
            screenOptions={{
              tabBarScrollEnabled:true,
              tabBarActiveTintColor: "#990200",
              tabBarInactiveTintColor: "lightgray",
              tabBarLabelStyle: {
                fontSize: fontSizeFlex(13),//15,
                fontFamily: "BMJUA_ttf",
                padding:0,
                margin:0,
                width:fontSizeFlex(100)
              },
              tabBarIndicatorStyle: {
                borderBottomColor: "#990200",
                borderBottomWidth: 2,
              },

              tabBarStyle: {
                backgroundColor: "white",
              },
              tabBarItemStyle:{
                width:fontSizeFlex(60)
              },

            }}
        >
          <Tab.Screen 
            name="전체" 
            children={ () => <View style={{flex:1}}><TobUnderBar sortValue={sortValue} /><Contents ViewInfo={ViewInfo} refreshing={refreshing} setRefreshing={setRefreshing} /></View> }
          />
           {category.map( (cate,index) => {
              return <Tab.Screen 
                name={cate}
                key={index}
              children={ () => <View style={{flex:1}} ><TobUnderBar sortValue={sortValue} /><Contents ViewInfo={ViewInfo} cate={cate}   refreshing={refreshing} setRefreshing={setRefreshing}
              /></View> }
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
    width:Dimensions.get('screen').width 
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
    fontSize: 13.5,//20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: fontSizeFlex(19),//30,
    marginBottom: 15,
    textAlign: "center"
  },
  buttonText:{
    fontSize: fontSizeFlex(11),//12,
  },
  delButtonText:{
    fontSize: fontSizeFlex(11),//12,
    color:'gray',
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid'
  },
  coupang:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 50,
    marginHorizontal:1,
    marginVertical:3,
    borderWidth:1
  },
  wemef:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 50,
    marginHorizontal:1,
    marginVertical:3,
    borderWidth:1
  },
  yogiyo:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 50,
    marginHorizontal:1,
    marginVertical:3,
    borderWidth:1
  },
  baemin:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 50,
    marginHorizontal:1,
    marginVertical:3,
    borderWidth:1
  }

});

export default ContentsTab;