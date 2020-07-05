import React, { Component } from "react";
import { View, Animated, StyleSheet, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import SubButton from "./subButton";

class CircleMenu extends Component {
  state = {
    valueMode: 0,
  };
  buttonSize = new Animated.Value(1);
  mode = new Animated.Value(0);

  handlePress = () => {
    Animated.sequence([
      Animated.timing(this.buttonSize, {
        toValue: 0.95,
        duration: 200,
      }),
      Animated.timing(this.buttonSize, {
        toValue: 1,
      }),
      Animated.timing(this.mode, {
        toValue: this.mode._value === 0 ? 1 : 0,
        duration: 300,
      }),
    ]).start();
    this.setState({ valueMode: this.state.valueMode === 0 ? 1 : 0 });
  };

  rendersubButtons = () => {
    const { items } = this.props;

    return (
      items.length > 0 &&
      items.map((item, index) => {
        return (
          <SubButton
            key={item.name}
            item={item}
            mode={this.mode}
            itemIndex={index}
          />
        );
      })
    );
  };

  render() {
    const sizeStyle = {
      transform: [{ scale: this.buttonSize }],
    };

    return (
      <View
        style={{
          position: "relative",
        }}
      >
        {this.rendersubButtons()}
        <Animated.View style={[styles.menuButton, sizeStyle]}>
          <TouchableHighlight
            onPress={this.handlePress}
            underlayColor="#565555"
            style={styles.menuButton}
          >
            <Animated.View>
              <Icon
                name={this.state.valueMode === 0 ? "bars" : "times"}
                size={24}
                color="#fff"
              />
            </Animated.View>
          </TouchableHighlight>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuButton: {
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default CircleMenu;
