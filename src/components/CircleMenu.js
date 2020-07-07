import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Animated,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  PanResponder,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import SubButton from "./subButton";

const CircleMenu = (props) => {
  const [modeValue, setModeValue] = useState(0);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const buttonSize = useRef(new Animated.Value(1)).current;
  const mode = useRef(new Animated.Value(0)).current;
  const pan = useRef(
    new Animated.ValueXY({
      x: Dimensions.get("window").width / 2 - 30,
      y: -Dimensions.get("window").width + 100,
    })
  ).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        return true;
      },

      onMoveShouldSetPanResponder: (event, gesture) => {
        const { dx, dy } = gesture;
        return (dx > 2 || dx < -2 || dy > 2 || dy < -2) && mode._value === 0;
      },

      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },

      onPanResponderMove: (event, gesture) => {
        pan.setValue({ x: gesture.dx, y: gesture.dy });
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

        setModeValue(0);
        setCoordinates({ x: xPoint, y: yPoint });
        mode._value = 0;

        pan.flattenOffset();
        Animated.spring(pan, {
          toValue: { x: xPoint, y: yPoint },
        }).start(() => {
          pan.setValue({ x: xPoint, y: yPoint });
        });
      },
    })
  ).current;

  useEffect(() => {
    setCoordinates({
      x: Dimensions.get("window").width / 2 - 30,
      y: -Dimensions.get("window").width + 100,
    });
  }, []);

  const handleClose = () => {
    setModeValue(0);
    Animated.sequence([
      Animated.timing(buttonSize, {
        toValue: 0.95,
        duration: 200,
      }),
      Animated.timing(buttonSize, {
        toValue: 1,
      }),
      Animated.timing(mode, {
        toValue: 0,
        duration: 200,
      }),
      Animated.spring(pan, {
        toValue: { x: coordinates.x, y: coordinates.y },
      }),
    ]).start();
  };

  const handlePress = () => {
    if (modeValue === 0) {
      setModeValue(1);
      Animated.parallel([
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
        }),
        Animated.sequence([
          Animated.timing(buttonSize, {
            toValue: 0.95,
            duration: 200,
          }),
          Animated.timing(buttonSize, {
            toValue: 1,
          }),
          Animated.timing(mode, {
            toValue: 1,
            duration: 200,
          }),
        ]),
      ]).start();
    } else {
      handleClose();
    }
  };

  const rendersubButtons = () => {
    const { items } = props;

    return (
      items.length > 0 &&
      items.map((item, index) => {
        return (
          <SubButton
            key={item.name}
            item={item}
            mode={mode}
            itemIndex={index}
          />
        );
      })
    );
  };

  const sizeStyle = {
    transform: [{ scale: buttonSize }],
  };

  const buttonMovement = {
    transform: [{ translateX: pan.x, translateY: pan.y }],
  };

  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.View
          style={[
            {
              position: "relative",
            },
            pan.getLayout(),
          ]}
        >
          {rendersubButtons()}
          <Animated.View
            style={[styles.menuButton, sizeStyle]}
            {...panResponder.panHandlers}
          >
            <TouchableHighlight
              style={styles.menuButton}
              underlayColor="#ccc"
              onPress={handlePress}
            >
              <Animated.View>
                <Icon
                  name={modeValue === 1 ? "times" : "bars"}
                  size={24}
                  color="#fff"
                />
              </Animated.View>
            </TouchableHighlight>
          </Animated.View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
