import * as React from 'react';
import { Text, View, ScrollView, SafeAreaView, StyleSheet, Button, RefreshControl, FlatList, TouchableOpacity } from 'react-native';
import SaleListItem from './saleListItem';
import DropDownPicker from 'react-native-dropdown-picker';
import DrawerIcon from "./DrawerIconSet.js"

function Contents({ViewInfo,cate,refreshing, sortValue,setsortValue, onRefresh}) {
  let data=[...ViewInfo]
  const buttonClickedHandler = () => {
    console.log('You have been clicked a button!');
    // do something
  };
  let len
  if(cate){
    len=data.filter(v=>v[3]==cate).length
  }else{
    len=data.length
  }
  data.splice(data.length*Math.random(),0,'ad')
  if(len>20){
    data.splice(data.length*Math.random(),0,'ad')
  }
  if(len>40){
    data.splice(data.length*Math.random(),0,'ad')
  }
  data.push('null')
  data.push('null')

  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([
    {
      value: '1',
      icon: () => <DrawerIcon val={1} />
    },
    {
      value: '2',
      icon: () => <DrawerIcon val={2} />
    },
    {
      value: '3',
      icon: () => <DrawerIcon val={3} />
    }
  ]);

  return (    
    <View style={styles.container}>
      <View style={{borderBottomWidth:1, borderBottomColor: '#990200'}}>
        <ScrollView
          style={{zIndex: 999}}
          horizontal={true}
          >
          <TouchableOpacity
            onPress={buttonClickedHandler}
            style={styles.brandButton}>
            <Text>배달의민족</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={buttonClickedHandler}
            style={styles.brandButton}>
            <Text>요기요</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={buttonClickedHandler}
            style={styles.brandButton}>
            <Text>쿠팡잇츠</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={buttonClickedHandler}
            style={styles.brandButton}>
            <Text>위메프오</Text>
          </TouchableOpacity>
{/*           
          <DropDownPicker
            open={open}
            value={sortValue}
            items={items}
            setOpen={setOpen}
            setValue={setsortValue}
            setItems={setItems}
            style={{height:45,marginTop:4,marginRight:3,inputAndroid: { color: 'black' }}}
            useNativeAndroidPickerStyle={false}
            dropDownContainerStyle={{ backgroundColor: 'white',zIndex: 1000, elevation: 1000 }}
            placeholder="정123렬"
            arrowIconStyle={{
              width: 10,
              height: 10
            }}
            textStyle={{
              textAlign:"center",
              color:'black'
            }}
          />   */}
        </ScrollView>
      </View>
      <FlatList
        disableVirtualization={false} 
        refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />} 
        data={data}
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
    brandButton:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 50,
      marginHorizontal:1,
      marginVertical:3
      
    }


});
export default Contents;

