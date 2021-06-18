import * as React from 'react';
import { Text, View, ScrollView, SafeAreaView, StyleSheet, Button, RefreshControl } from 'react-native';
import SaleListItem from './saleListItem';
import {
  AdMobBanner,
} from "expo-ads-admob";

function Contents({ViewInfo,cate,refreshing, onRefresh}) {
  
    return (
      <ScrollView 
        style={{backgroundColor:"#fff"}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}
        >
        <View style={styles.card}>
          <View style={styles.adView}>
            <AdMobBanner
                bannerSize="smartBanner"
                adUnitID="ca-app-pub-5926200986625193/7250011193" 
                servePersonalizedAds={true}
                onDidFailToReceiveAdWithError={(e) => console.log(e)}
                />
          </View>
          {ViewInfo.map( (info,index) => (
            <SaleListItem key={index} index={index} val={info} cate={cate} />
            ))}
          <View style={{height:100}}></View>
        </View>
      </ScrollView>
    );
  } 

  const styles = StyleSheet.create({
    card: {
      flex:13,
    },
    listContainer: {
    },
    adView:{
      borderBottomColor: 'black',
      borderBottomWidth: 1,
    }

});
export default Contents;

