import * as React from 'react';
import { View,  StyleSheet, RefreshControl, FlatList, TouchableOpacity } from 'react-native';
import SaleListItem from './saleListItem';

function Contents({ViewInfo,cate,refreshing, setRefreshing}) {
  let data
  if(cate){
    data=[...ViewInfo].filter(v=>v[3]==cate)
  }else{
    data=[...ViewInfo]
  }
  const [tabRefreshing,tabOnRefresh]=React.useState(false)
  const onTabRefresh = React.useCallback(() => {
    tabOnRefresh(true);
    setRefreshing(!refreshing)
    setTimeout(()=>{tabOnRefresh(false)},1500)
    
  }, []);
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
    <View style={{flex:1}}>
      <FlatList
        disableVirtualization={false} 
        refreshControl={
            <RefreshControl
              refreshing={tabRefreshing}
              onRefresh={onTabRefresh}
            />} 
        data={data}
        
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


