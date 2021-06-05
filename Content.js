import * as React from 'react';
import { Text, View, ScrollView, SafeAreaView, StyleSheet, Button } from 'react-native';
import SaleList from './saleList';
import SaleListItem from './saleListItem';


function Contents({ViewInfo,cate}) {
    return (
      <View style={styles.card}>
        <ScrollView contentContainerStyle={styles.listContainer}>
          {ViewInfo.map( (info,index) => (
            <SaleListItem key={index} val={info} cate={cate} />
            ))}
          <View style={{height:100}}></View>
        </ScrollView>
      </View>
    );
  } 

  const styles = StyleSheet.create({
    container: {
      flex:13,
    },
    card: {
      flex:13,
    },
    menuScrollBar:{
    },
    menuBarTab:{
      width: 130,
      borderWidth: 0.5,
    },
    listContainer: {
      alignItems: 'center',
    },

});
export default Contents;

