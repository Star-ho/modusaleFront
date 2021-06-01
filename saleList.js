import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import SaleListItem from './saleListItem';


const SaleList = ({infos,filter}) => {
  return (
    <View style={{flex:1}}>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {infos.map( (info,index) => (
          <SaleListItem key={index} val={info} filter={filter} />
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