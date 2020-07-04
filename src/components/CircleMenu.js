import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet, PanResponder } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const CircleMenu = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { items } = props;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
    }).start();
  }, []);

  const renderItems = () => {
    return (
      items.length > 0 &&
      items.map((item) => {
        return (
          <View
            style={[
              styles.iconBox,
              { backgroundColor: item.color ? item.color : "" },
            ]}
          >
            <Icon name={item.name} size={20} color="#fff" />
          </View>
        );
      })
    );
  };

  return (
    <Animated.View style={{ ...props.style, opacity: fadeAnim }}>
      <View style={styles.iconBox}>
        <Icon name="bars" size={20} color="black" />
      </View>
      {renderItems()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  iconBox: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    // backgroudColor: "white",
    elevation: 10,
  },
});

export default CircleMenu;
