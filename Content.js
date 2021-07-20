import * as React from 'react';
import { View, RefreshControl, FlatList, } from 'react-native';
import SaleListItem from './saleListItem';

function Contents({ViewInfo,setViewInfo,cate,refeshData,redirectModalVisible,setRedirectModalVisible, setModalVal,fadeAnim,isHide,hideItem,setHideItem}) {
  let data
  if(cate){
    data=[...ViewInfo].filter(v=>v[3]==cate).filter(v=>!hideItem.includes(v[0]))
  }else{
    data=[...ViewInfo].filter(v=>!hideItem.includes(v[0]))
    
  }
  const [tabRefreshing,tabOnRefresh]=React.useState(false)

  if(data.length>6){
    for(let i =0;i<data.length;i+=7){
      data.splice(7*Math.random()+i,0,'ad')
    }
  }else{
    data.push('ad')
  }
  data.push('null')
  data.push('null')


  return (    
    <View style={{flex:1}}>
      <FlatList
        removeClippedSubviews={true}
        initialNumToRender={7}
        windowSize={7}
        keyExtractor={(_, index) => index.toString()}
        refreshControl={
            <RefreshControl
              refreshing={tabRefreshing}
              onRefresh={refeshData}
            />} 
        data={data}
        
        renderItem={({item}) => 
        <View>
          <SaleListItem val={item} cate={cate} redirectModalVisible={redirectModalVisible} setRedirectModalVisible={setRedirectModalVisible} setModalVal={setModalVal} fadeAnim={fadeAnim} isHide={isHide} hideItem={hideItem} setHideItem={setHideItem} ViewInfo={ViewInfo} setViewInfo={setViewInfo} />
        </View>
      }
      
      />
    </View>
  );
} 

const equalComparison = (prevProps, nextProps) =>{
  return ((JSON.stringify(prevProps.ViewInfo) === JSON.stringify(nextProps.ViewInfo))&&(JSON.stringify(prevProps.isHide) === JSON.stringify(nextProps.isHide)) )
}

export default React.memo(Contents, equalComparison);



