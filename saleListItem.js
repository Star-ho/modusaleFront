import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const SaleListItem = ({val}) => {

  
  return (
    <View style={styles.container}>
      <HaveImage ImageName={val[2]}/>
      <View style={{flex:1, marginLeft:10}}>
      <Text style={styles.sourceText}>{ val[1] }</Text>
      <Text style={styles.brandText}>{ val[0] }</Text>
      <Text style={styles.priceText}>{ "최대 " +val[4]+"원 할인" }</Text>
      </View>
    </View>
  );
};

const HaveImage = ({ImageName}) => { 
  if(ImageName!='없음'){
    return <Image 
    style={styles.logo}
    source={{
      uri: `http://192.168.1.171:3000/${ImageName}`,
    }}
    />
  }
  return <Image 
    style={styles.logo}
    source={{
      uri: "http://192.168.1.171:3000/yunansikdang.png",
    }}
    />
}
//val 값 [ 브랜드명, 출처(요기요, 배민), 이미지, 분류, 할인금액 ] 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding:10
  },
  sourceText: {
    flex: 2,
    fontWeight: '500',
    fontSize: 10,
  },
  brandText: {
    flex: 5,
    fontWeight: '500',
    fontSize: 18,
  },
  priceText: {
    flex: 2,
    fontWeight: '500',
    fontSize: 10,
  },
  logo: {
    width: 70,
    height: 70,
  },

});

export default SaleListItem;