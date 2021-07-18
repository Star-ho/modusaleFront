import * as React from 'react';
import { View,  StyleSheet, RefreshControl, FlatList, TouchableOpacity } from 'react-native';
import SaleListItem from './saleListItem';

function Contents({ViewInfo,cate,refeshData,redirectModalVisible,setRedirectModalVisible, setModalVal,fadeAnim,isHide}) {
  let data
  if(cate){
    data=[...ViewInfo].filter(v=>v[3]==cate)
  }else{
    data=[...ViewInfo]
  }
  const [tabRefreshing,tabOnRefresh]=React.useState(false)
    
  const onTabRefresh = React.useCallback(() => {
    tabOnRefresh(true);
    setTimeout(()=>{tabOnRefresh(false)},1500)
  }, []);

  let len=data.length
  if(len<7){
    data.push('ad')
  }
  if(len>7){
    data.splice(7*Math.random(),0,'ad')
  }
  if(len>14){
    data.splice(7*Math.random()+7,0,'ad')
  }
  if(len>21){
    data.splice(7*Math.random()+14,0,'ad')
  }
  if(len>28){
    data.splice(7*Math.random()+21,0,'ad')
  }
  if(len>35){
    data.splice(7*Math.random()+28,0,'ad')
  }
  if(len>42){
    data.splice(7*Math.random()+35,0,'ad')
  }
  if(len>49){
    data.splice(7*Math.random()+42,0,'ad')
  }
  data.push('null')
  data.push('null')


  return (    
    <View style={{flex:1}}>
      <FlatList
        disableVirtualization={true} 
        refreshControl={
            <RefreshControl
              refreshing={tabRefreshing}
              onRefresh={refeshData}
            />} 
        data={data}
        
        renderItem={({item}) => 
        <View>
          <SaleListItem val={item} cate={cate} redirectModalVisible={redirectModalVisible} setRedirectModalVisible={setRedirectModalVisible} setModalVal={setModalVal} fadeAnim={fadeAnim} isHide={isHide} />
        </View>
      }
      keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
} 

const equalComparison = (prevProps, nextProps) =>{
  return JSON.stringify(prevProps.ViewInfo) === JSON.stringify(nextProps.ViewInfo)
}

export default React.memo(Contents, equalComparison);



