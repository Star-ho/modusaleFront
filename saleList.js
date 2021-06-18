import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import SaleListItem from './saleListItem';
import {
  AdMobBanner,
} from "expo-ads-admob";

const SaleList = ({val,cate,index}) => {
  if(index==0){
    return (
      <View>
        <SaleListItem key={index} index={index} val={val} cate={cate} />
        <View style={styles.adView}>
        <AdMobBanner
            bannerSize="smartBanner"
            adUnitID="ca-app-pub-5926200986625193/7250011193" 
            onDidFailToReceiveAdWithError={(e) => console.log(e)}
            servePersonalizedAds={true}
            />
          </View>
      </View>
    );  
  }
  return (
    <View>
      <SaleListItem key={index} index={index} val={val} cate={cate} />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    alignItems: 'center',
  },
  adView:{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }
});

export default SaleList;