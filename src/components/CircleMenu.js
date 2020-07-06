import React, { Component } from "react";
import {
  Animated,
  StyleSheet,
  TouchableHighlight,
  PanResponder,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import SubButton from "./subButton";

class CircleMenu extends Component {
  state = {
    valueMode: 0,
    coordinates: { x: 0, y: 0 },
    isOpenMenu: false,
  };
  buttonSize = new Animated.Value(1);
  mode = new Animated.Value(0);
  pan = new Animated.ValueXY();
  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      return true;
    },

    onMoveShouldSetPanResponder: (event, gesture) => {
      const { dx, dy } = gesture;
      return (dx > 2 || dx < -2 || dy > 2 || dy < -2) && !this.state.isOpenMenu;
    },

    onPanResponderGrant: () => {
      this.pan.setOffset({
        x: this.pan.x._value,
        y: this.pan.y._value,
      });
    },

    onPanResponderMove: (event, gesture) => {
      this.pan.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (event, gesture) => {
      const { moveX, moveY } = gesture;
      const halfScreenWidth = Dimensions.get("window").width / 2;
      const halfScreenHeight = Dimensions.get("window").height / 2;

      let xPoint = halfScreenWidth - 30;
      const yPoint = moveY - halfScreenHeight - 30;

      if (moveX < halfScreenWidth) {
        xPoint = -xPoint;
      }

      this.pan.flattenOffset();
      this.pan.setValue({ x: xPoint, y: yPoint });
    },
  });

  handlePress = () => {
    Animated.parallel([
      Animated.spring(this.pan, {
        toValue: { x: 0, y: 0 },
      }),
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
          duration: 200,
        }),
      ]),
    ]).start(() => {
      this.setState((prevState) => {
        return {
          valueMode: prevState.valueMode === 0 ? 1 : 0,
          isOpenMenu: !prevState.isOpenMenu,
        };
      });
    });
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

    const buttonMovement = {
      transform: [{ translateX: this.pan.x, translateY: this.pan.y }],
    };

    return (
      <Animated.View
        style={[
          {
            position: "relative",
          },
          this.pan.getLayout(),
        ]}
      >
        {this.rendersubButtons()}
        <Animated.View
          style={[styles.menuButton, sizeStyle]}
          {...this.panResponder.panHandlers}
        >
          <TouchableHighlight
            style={styles.menuButton}
            underlayColor="#ccc"
            onPress={this.handlePress}
          >
            <Animated.View>
              <Icon
                name={this.state.valueMode ? "times" : "bars"}
                size={24}
                color="#fff"
              />
            </Animated.View>
          </TouchableHighlight>
        </Animated.View>
      </Animated.View>
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
    zIndex: 10000,
  },
});

export default CircleMenu;
