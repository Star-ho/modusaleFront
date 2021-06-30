import * as React from 'react';
import { Text, View, ScrollView, SafeAreaView, StyleSheet, Button, RefreshControl, FlatList } from 'react-native';
import SaleListItem from './saleListItem';


function Contents({ViewInfo,cate,refreshing, onRefresh}) {
    return (    
    <View style={styles.container}>
      <FlatList
        disableVirtualization={false} 
        refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />} 
        data={['ad',...ViewInfo]}
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

  const styles = StyleSheet.create({
    card: {
      flex:13,
    },
    listContainer: {
    },


});
export default Contents;

