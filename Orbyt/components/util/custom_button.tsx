import React from "react";
import { GestureResponderEvent, TouchableOpacity, ViewStyle, StyleSheet, Text, View } from "react-native";

interface CustomButtonProps {
  style?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
  children?: React.ReactNode;
}

export class CustomButton extends React.Component<CustomButtonProps> {
  render() {
    const { style, onPress, children } = this.props;
    return (
      <TouchableOpacity style={[style]} onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
}
