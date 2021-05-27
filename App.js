//npx babel-node --presets @babel/env index.js
//npm run android

import * as React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, CheckBox} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MenuDrawer from 'react-native-side-drawer'
import Contents from './Contents.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  drawerContent = () => {
    const [isSelected, setSelection] = useState(false);

    return (
      <View>
      <TouchableOpacity onPress={this.toggleOpen} style={styles.animatedBox}>
        <Text>Close</Text>
      </TouchableOpacity>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />
            <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
          </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={45}
          animationTime={250}
          overlay={true}
          opacity={0.4}
          style={{flex:1}}
        >
          <View style={{ flex:1, flexDirection: 'row'}}>
            <Ionicons name="menu-outline" size={50} onPress={this.toggleOpen}/>
            <View style={{flex: 16, height: 50, }}>
              <Text>현재 사용하는것들</Text>
            </View>
          </View>
          <Contents />
        </MenuDrawer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    zIndex: 0
  },
  animatedBox: {
    flex: 1,
    padding: 10
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F04812'
  },  
  checkbox: {
    alignSelf: "center",
  },
})

