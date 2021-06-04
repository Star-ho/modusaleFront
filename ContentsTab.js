import * as React from 'react';
import { Text, View,SafeAreaView, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Contents from "./Content.js"

const Tab = createMaterialTopTabNavigator();

function ContentsTab ({filter, sortValue}){ 
  const [allInfo, setAllInfo] = React.useState([]);
  const [ViewInfo, setViewInfo] = React.useState([]);
  let category=["치킨","피자","한식","양식","기타"]
  let error=false
  
  React.useEffect(()=>{
      fetch("http://192.168.1.171:3000?ver=0.91").then(res=>res.json())
      .then(res=>{
        if(!res.error){
        let arr=[]
        for(let i of Object.entries(res)){
          arr.push( [ [ i[0] ], i[1][0], i[1][1], i[1][2], i[1][3] ]  )
        }
        arr.sort((a,b)=>( `${a[0]}`.localeCompare(`${b[0]}`)) )
        //console.log(arr)
        setAllInfo([...arr])
        setViewInfo([...arr])
        category=[...new Set( arr.map( v=> v[3] ) )]
        }else{
          error=true 
        }
      })
    
  },[])
  React.useEffect(()=>{
    let temp
    if(sortValue==1){
      temp=ViewInfo.slice().sort((a,b)=>( `${a[0]}`.localeCompare(`${b[0]}`)) )
    }else if(sortValue==2){
      temp= ViewInfo.slice().sort((a,b)=>( `${b[0]}`.localeCompare(`${a[0]}`)) ) 
    }else if(sortValue==3){
      temp= ViewInfo.slice().sort((a,b)=>( a[4]-b[4] ) ) 
    }else{
      temp= ViewInfo.slice().sort((a,b)=>( b[4]-a[4] ) ) 
    }
    setViewInfo(temp)
  },[sortValue])
  
  React.useEffect(()=>{
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
    setViewInfo(temp)
  },[filter.yogiyoSelected,filter.baeminSelected,filter.coupangSelected])


  return (
    <View style={styles.container}>
      <NavigationContainer style={{flex:3}}  >
        <Tab.Navigator style={{flex:4}} >
          <Tab.Screen 
            name="전체" 
            children={ () => <Contents ViewInfo={ViewInfo}  /> }
          />
          {category.map( (cate,index) => {
              let data = allInfo.filter(v=>v[3]==cate);
              return <Tab.Screen 
              name={cate}
              key={index}
              children={ () => <Contents ViewInfo={ViewInfo}  /> }
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
  card: {
    flex:13,
    backgroundColor: '#abcd',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  menuScrollBar:{
  },
  menuBarTab:{
    width: 130,
    borderWidth: 0.5,
  },

});

export default ContentsTab;