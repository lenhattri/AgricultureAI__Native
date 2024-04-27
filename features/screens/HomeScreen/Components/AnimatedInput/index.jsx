import React, { useState } from 'react';
import { Animated, TextInput, TouchableOpacity, Easing, StyleSheet } from 'react-native';
import { AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const AnimatedInput = ({ isLoading, handleGenerate, switchThread, setPromptInput, promptInput }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [widthAnim] = useState(new Animated.Value(0));

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(widthAnim, {
      toValue: 1,
      duration: 1000, // Increase duration for smoother animation
      useNativeDriver: false,
      easing: Easing.inOut(Easing.ease), // Add easing for smoother animation
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(widthAnim, {
      toValue: 0,
      duration: 1000, // Increase duration for smoother animation
      useNativeDriver: false,
      easing: Easing.inOut(Easing.ease), // Add easing for smoother animation
    }).start();
  };

  return (
    <Animated.View style={{ flexDirection: 'row', flex: 1, width: widthAnim.interpolate({ inputRange: [0, 1], outputRange: ['80%', '100%'] }) }}>
      {!isFocused && (
        <TouchableOpacity onPress={switchThread}>
          <AntDesign name="pluscircleo" size={30} color='white' />
        </TouchableOpacity>
      )}
      <TextInput
        style={{ flex: 1, color: 'white', backgroundColor: 'black' }}
        placeholder="Nhập tin nhắn tại đây..."
        placeholderTextColor='gray'
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={promptInput}
        onChangeText={setPromptInput}
        styles = {styles.input}
      />
      <TouchableOpacity onPress={handleGenerate}>
        {isLoading ? (
          <MaterialCommunityIcons name="loading" size={30} color='white' />
        ) : (
          <MaterialCommunityIcons name="send" size={30} color={promptInput ? 'blue' : 'white'} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
    input: {
     backgroundColor: "white"
   },
 //...
 });
export default AnimatedInput;
