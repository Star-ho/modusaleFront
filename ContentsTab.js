import * as React from 'react';
import { Text, View,SafeAreaView, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Contents from "./Content.js"

const Tab = createMaterialTopTabNavigator();

function ContentsTab ({filter, sortValue}){ 
  const [allInfo, setAllInfo] = React.useState([]);
  let category=["치킨","피자","한식","양식","기타"]
  let etc
  React.useEffect(()=>{
    if(allInfo.length==0){
      fetch("http://192.168.1.171:3000").then(res=>res.json())
      .then(res=>{
        let arr=[]
        for(let i of Object.entries(res)){
          
          arr.push( [ [ i[0] ], i[1][0], i[1][1], i[1][2], i[1][3] ]  )
        }

        arr.sort((a,b)=>( b[4]-a[4] ) )

        //console.log(arr)

        setAllInfo([...arr])
        category=[...new Set( arr.map( v=> v[3] ) )]
      })
    etc = allInfo.filter(v=>v[3]!="치킨"&&v[3]!="피자");
    }else{
      // if(sortValue==1){
      //   setAllInfo( allInfo.slice().sort((a,b)=>( `${a[0]}`.localeCompare(`${b[0]}`)) ) )
      // }else if(sortValue==2){
      //   setAllInfo( allInfo.slice().sort((a,b)=>( `${b[0]}`.localeCompare(`${a[0]}`)) ) )
      // }else if(sortValue==3){
      //   setAllInfo( allInfo.slice().sort((a,b)=>( a[4]-b[4] ) ) )
      // }else{
      //   setAllInfo( allInfo.slice().sort((a,b)=>( b[4]-a[4] ) ) )
      // }
    }
  })


  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer style={{flex:3}}  >
        <Tab.Navigator style={{flex:4}} >
          <Tab.Screen 
            name="전체" 
            children={ () => <Contents allInfo={allInfo} filter={filter} setAllInfo={setAllInfo} sortValue={sortValue} /> }
          />
          {category.map( (cate,index) => {
              let data = allInfo.filter(v=>v[3]==cate);
              return <Tab.Screen 
              name={cate}
              key={index}
              children={ () => <Contents allInfo={data} filter={filter} setAllInfo={setAllInfo} sortValue={sortValue} /> }
              />
            }
          )}

        </Tab.Navigator>

      </NavigationContainer>
    </SafeAreaView>
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