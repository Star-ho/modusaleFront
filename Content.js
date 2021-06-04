import * as React from 'react';
import { Text, View,SafeAreaView, StyleSheet, Button } from 'react-native';
import SaleList from './saleList';



function Contents({ViewInfo,filter}) {
    return (
      <View style={styles.card}>
        <SaleList ViewInfo={ViewInfo} filter={filter} />
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

});
export default Contents;

