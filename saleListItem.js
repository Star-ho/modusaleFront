import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const SaleListItem = ({brand, name, discountAmount}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.circle} />
      </TouchableOpacity>
      <Text style={[styles.text, styles.strikeText]}>{brand} {name} {discountAmount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex: 5,
    fontWeight: '500',
    fontSize: 18,
    marginVertical: 20,
    width: 100,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: 'blue',
    borderWidth: 2,
    marginRight: 20,
    marginLeft: 20,
  },
});

export default SaleListItem;