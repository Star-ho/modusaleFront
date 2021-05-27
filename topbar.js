import * as React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MenuDrawer from 'react-native-side-drawer'

// export default class TopBar extends React.Component {
//   render() {
//     return (
//       <View style={{ flex:1, flexDirection: 'row'}}>
//         <Ionicons name="menu-outline" size={50} />
//         <View style={{flex: 1, height: 50, }}>
//           <Text>현재 사용하는것들</Text>
//         </View>
//       </View>
//     )
//   }
// }

export default class TopBar extends React.Component {
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
    return (
      <TouchableOpacity onPress={this.toggleOpen} style={styles.animatedBox}>
        <Text>Close</Text>
      </TouchableOpacity>
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
        >
          <View style={{ flex:1, flexDirection: 'row'}}>
            <Ionicons name="menu-outline" size={50} onPress={this.toggleOpen}/>
            <View style={{flex: 1, height: 50, }}>
              <Text>현재 사용하는것들</Text>
            </View>
          </View>
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
    backgroundColor: "#38C8EC",
    padding: 10
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F04812'
  }
})

