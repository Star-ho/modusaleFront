import * as React from 'react';
import { Text, View, ScrollView, SafeAreaView, StyleSheet, Button } from 'react-native';
import SaleListItem from './saleListItem';
import {
  AdMobBanner,
} from "expo-ads-admob";

function Contents({ViewInfo,cate}) {
    return (
      <ScrollView style={{backgroundColor:"#fff"}}>
        <View style={styles.card}>
          <View style={styles.adView}>
            <AdMobBanner
                bannerSize="smartBanner"
                adUnitID="ca-app-pub-5926200986625193/9265914417" 
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

