
//npx babel-node --presets @babel/env index.js
//npm run android

import * as React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, CheckBox, SafeAreaView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MenuDrawer from 'react-native-side-drawer'
import ContentsTab from './ContentsTab.js'
import DropDownPicker from 'react-native-dropdown-picker';
import DrawerIcon from "./DrawerIconSet.js"

export default function App (){
  const filter={yogiyo:yogiyoSelected,baemin:baeminSelected,   coupang:coupangSelected}
  const [yogiyoSelected, setyogiyoSelection] = React.useState(true);
  const [baeminSelected, setbaeminSelection] = React.useState(true);
  const [coupangSelected, setcoupangSelection] = React.useState(true);
  const [drawerState, setdrawerState] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [sortValue, setsortValue] = React.useState(1);
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
    },
    {
      value: '4',
      icon: () => <DrawerIcon val={4} />
    }
  ]);

  const toggleOpen = () => {
    setdrawerState(true);
  };

  const drawerClose = () => {
    setdrawerState(false);
  };

  const drawerContent = () => {
    return (  
        <View style={{flex:1,backgroundColor:'white'}}>
          <TouchableOpacity onPress={drawerClose} style={{flex:1 }} >
            <Text>Close</Text>
          </TouchableOpacity>
          <View style={{flex:1, flexDirection:'row'}}>
            <CheckBox
              value={yogiyoSelected}
              onValueChange={setyogiyoSelection}
              style={styles.checkbox}
            /><Text style={{flex:3, paddingTop:6}} >요기요</Text>
          </View>
          <View style={{flex:1, flexDirection:'row'}}>
            <CheckBox
              value={baeminSelected}
              onValueChange={setbaeminSelection}
              style={styles.checkbox}
            /><Text style={{flex:3, paddingTop:6 }} >배달의민족</Text>
          </View>
          <View style={{flex:1, flexDirection:'row'}}>
            <CheckBox
              value={coupangSelected}
              onValueChange={setcoupangSelection}
              style={styles.checkbox}
            /><Text style={{flex:3, paddingTop:6 }} >쿠팡잇츠</Text>
          </View>
          <View style={{flex:13}}></View>
        </View>
      
    );
  };
    return (
      <SafeAreaView style={{flex:1, marginTop:30}}>
        <MenuDrawer
          open={drawerState}
          drawerContent={drawerContent()}
          drawerPercentage={45}
          animationTime={250}
          overlay={true}
          opacity={0}
        >
          <View style={{ flex:1, flexDirection: 'row'}}>
            <Ionicons name="menu-outline" size={50} onPress={toggleOpen}/>
            <View style={{flex: 5, height: 50, }}>
            </View>
            <DropDownPicker
              open={open}
              value={sortValue}
              items={items}
              setOpen={setOpen}
              setValue={setsortValue}
              setItems={setItems}
              containerStyle={{flex:2}}
              placeholder="정렬"
              arrowIconStyle={{
                width: 10,
                height: 10
              }}
              textStyle={{
                textAlign:"center"
              }}
            />  
          </View>
          {/* <ContentsTab filter={filter} sortValue={sortValue} /> */}
        </MenuDrawer>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    zIndex: 0
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F04812'
  },  
  checkbox: {
    flex:1
  },
  logo: {
    width: 66,
    height: 58,
  },
})

