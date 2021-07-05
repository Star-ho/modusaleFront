import * as React from 'react';
import { View,  StyleSheet, RefreshControl, FlatList, TouchableOpacity } from 'react-native';
import SaleListItem from './saleListItem';

function Contents({ViewInfo,cate,refreshing, onRefresh}) {
  let data
  if(cate){
    data=[...ViewInfo].filter(v=>v[3]==cate)
  }else{
    data=[...ViewInfo]
  }
  let len=data.length
  data.splice(data.length*Math.random(),0,'ad')
  if(len>20){
    data.splice(data.length*Math.random(),0,'ad')
  }
  if(len>40){
    data.splice(data.length*Math.random(),0,'ad')
  }
  data.push('null')
  data.push('null')


  return (    
    <View style={{flex:1,height:100}}>
      <FlatList
        disableVirtualization={false} 
        refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />} 
        data={data}
        style={{zIndex:-1}}
        renderItem={({item}) => 
        <View>
          <SaleListItem val={item} cate={cate} />
        </View>
      }
      keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
} 

const equalComparison = (prevProps, nextProps) =>
  JSON.stringify(prevProps.ViewInfo) == JSON.stringify(nextProps.ViewInfo)

export default React.memo(Contents, equalComparison);


