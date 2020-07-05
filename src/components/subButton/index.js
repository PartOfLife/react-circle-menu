import React, { Component } from "react";
import { View, Animated, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

class SubButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item, mode, itemIndex } = this.props;
    const buttonX = mode.interpolate({
      inputRange: [0, 1],
      outputRange: [
        0,
        (itemIndex == 0 && -100) || (itemIndex == 2 && 100) || 0,
      ],
    });

    const buttonY = mode.interpolate({
      inputRange: [0, 1],
      outputRange: [
        0,
        (itemIndex == 1 && -100) || (itemIndex == 3 && 100) || 0,
      ],
    });

    const opacity = mode.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <View
        style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Animated.View
          style={{ left: buttonX, top: buttonY, opacity: opacity }}
        >
          <Animated.View
            style={[
              styles.secondaryButton,
              {
                backgroundColor: item.color ? item.color : "",
              },
            ]}
          >
            <Icon name={item.name} size={24} color="#fff" />
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  secondaryButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#298CFF",
  },
});

export default SubButton;
