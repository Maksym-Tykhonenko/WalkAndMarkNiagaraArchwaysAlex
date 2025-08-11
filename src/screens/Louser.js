import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import AppBackground from '../components/AppBackground';

const Louser = () => {
  const appearingAnim = useRef(new Animated.Value(0)).current;
  const appearingSecondAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 5500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(appearingSecondAnim, {
        toValue: 1,
        duration: 6500,
        useNativeDriver: true,
      }).start();
      //setLouderIsEnded(true);
    }, 500);
  }, []);

  return (
    <AppBackground style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Animated.Image
        source={require('../assets/images/loader.png')}
        style={{
          //...props.style,
          opacity: appearingSecondAnim,
          width: 300,
          height: 300,
          position: 'absolute',
        }}
      />
    </AppBackground>
  );
};

export default Louser;
