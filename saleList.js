import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import SaleListItem from './saleListItem';


const SaleList = ({ViewInfo}) => {
  return (
    <View style={{flex:1}}>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {ViewInfo.map( (info,index) => (
          <SaleListItem key={index} val={info} />
          ))}
        <View style={{height:100}}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    alignItems: 'center',
  },
});

export default SaleList;