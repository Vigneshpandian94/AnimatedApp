import React, { useState, useRef } from "react";
import { View, Text, TouchableWithoutFeedback, Animated, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const HeartItem = ({ id }) => {
  const [isHeartFilled, setHeartFilled] = useState(false);
  const [isStarVisible, setStarVisible] = useState(false);
  const [isStarFilled, setStarFilled] = useState(false);

  const shakeAnim = useRef(new Animated.Value(0)).current;

  // Shake Animation Function
  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 1, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -1, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 1, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  // Handle Heart Click
  // Handle Heart Click
const handleHeartPress = () => {
  const nextState = !isHeartFilled;
  setHeartFilled(nextState);
  if (nextState) {
    setStarVisible(true);
  } else {
    setStarFilled(false); // reset star when heart is unselected
    setStarVisible(false);
  }
  triggerShake();
};


  // Handle Star Click
 // Handle Star Click
const handleStarPress = () => {
  setStarFilled(prev => !prev);

  // Optional delay before hiding the star
  setTimeout(() => {
    setStarVisible(false);
  }, 500);
  triggerShake();
};


  return (
    <View style={styles.itemContainer}>
      {/* Heart Icon */}
      <TouchableWithoutFeedback onPress={handleHeartPress}>
        <Animated.View
          style={[
            styles.heartContainer,
            { borderColor: isHeartFilled ? "green" : "#D3D3D3" },
            { transform: [{ translateX: shakeAnim }] },
          ]}
        >
          <Svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill={isHeartFilled ? "green" : "none"}
            stroke="green"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 4.06 13.5 5.09C14.09 4.06 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 13.5 15 21 15 21H12Z" />
          </Svg>
          {isStarFilled && (
            <View style={styles.starInHeart}>
              <Svg width="15" height="15" viewBox="0 0 24 24" fill="green" stroke="green" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </Svg>
            </View>
          )}
        </Animated.View>
      </TouchableWithoutFeedback>

      {/* Star Icon with Shaking Animation */}
      {isStarVisible && (
        <TouchableWithoutFeedback onPress={handleStarPress}>
          <Animated.View
            style={[
              styles.starWrapper,
              { transform: [{ translateX: shakeAnim }] },
            ]}
          >
            <View style={styles.starContainer}>
              <Svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill={isStarFilled ? "green" : "none"}
                stroke="green"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <Path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </Svg>
              <Text style={styles.clientText}>Clients</Text>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const HeartList = () => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4].map((id) => (
        <HeartItem key={id} id={id} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 50,
  },
  itemContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  heartContainer: {
    width: 35,
    height: 35,
    borderRadius: 30,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  starWrapper: {
    position: "absolute",
    left: -35,
    top: 2,
    alignItems: "center",
  },
  starContainer: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    backgroundColor: "#90EE90",
  },
  clientText: {
    fontSize: 4,
    fontWeight: "bold",
    marginTop: 5,
  },
  starInHeart: {
    position: "absolute",
    right: -8,
    top: "70%",
    transform: [{ translateY: -8 }],
  },
});

export default HeartList;
