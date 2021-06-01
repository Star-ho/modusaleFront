//npx babel-node --presets @babel/env index.js
//npm run android

import React,{useState} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, CheckBox} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MenuDrawer from 'react-native-side-drawer'
import ContentsTab from './ContentsTab.js'
import DropDownPicker from 'react-native-dropdown-picker';
import DrawerIcon from "./DrawerIconSet.js"

export default function App (){
  const [yogiyoSelected, setyogiyoSelection] = useState(true);
  const [baeminSelected, setbaeminSelection] = useState(true);
  const [coupangSelected, setcoupangSelection] = useState(true);
  const [drawerState, setdrawerState] = useState(false);
  const filter={yogiyo:yogiyoSelected,baemin:baeminSelected,coupang:coupangSelected}
  const [open, setOpen] = useState(false);
  const [sortValue, setsortValue] = useState(1);
  const [items, setItems] = useState([
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
    setdrawerState(!drawerState);
  };

  const drawerClose = () => {
    setdrawerState(false);
  };

  const drawerContent = () => {
    return (  
        <View style={{flex:1,backgroundColor:'white'}}>
          <View style={styles.animatedBox}>
            <TouchableOpacity onPress={toggleOpen} style={{flex:1 }} >
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
            <View style={{flex:15}}></View>
            </View>
        </View>
      
    );
  };
    return (
      <View style={{flex:1, marginTop:30}}>
        <MenuDrawer
          open={drawerState} 
          drawerContent={drawerContent()}
          drawerPercentage={45}
          animationTime={250}
          overlay={true}
          opacity={0.4}
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
          <ContentsTab filter={filter} sortValue={sortValue}/>
        </MenuDrawer>
      </View>
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
  animatedBox: {
    flex: 1,
    padding: 10,
    borderColor:'#000', 
    backgroundColor: "#1234",
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

