import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import SaleListItem from './saleListItem';


const SaleList = ({infos}) => {
  return (
    <View style={{flex:1}}>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {infos.map( (info,index) => (
          <SaleListItem key={index} {...info} />
          ))}
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