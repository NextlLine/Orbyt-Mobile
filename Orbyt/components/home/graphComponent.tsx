import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Svg, { Line, Circle, Path } from 'react-native-svg';

export default function BasicChart() {

  return (
    <View style={styles.container}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  chartBackground: {
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 16,
  },
});
