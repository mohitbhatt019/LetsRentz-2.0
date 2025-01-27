import { View, Text, Image, TextInput } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
    const navigation = useNavigation();
  return (
    <View className="bg-white h-full w-full">
      <StatusBar style='light' />
      {/* Background Image */}
      <Image className="h-full w-full absolute" source={require('../assets/images/background.png')} />
    
      {/* Lights */}
      <View className="flex-row justify-around w-full absolute">
        <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className="h-[225] w-[90]" source={require('../assets/images/light.png')} />
        <Animated.Image entering={FadeInUp.delay(200).duration(400).springify()} className="h-[160] w-[65]" source={require('../assets/images/light.png')} />
      </View>

      {/* Title and form */}
      <View className="h-full w-full flex justify-around pt-52">
        {/* Title */}
        <View className="flex items-center mb-10">
          <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-bold tracking-wider text-5xl">
             Signup
            </Animated.Text>
        </View>

        {/* Form */}
        <View className="flex items-center mx-4 space-y-8">
          <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
            <TextInput 
              placeholder='Username' 
              placeholderTextColor={'gray'} 
              className="text-lg"
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
            <TextInput 
              placeholder='Email' 
              placeholderTextColor={'gray'} 
              className="text-lg"
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
            <TextInput 
              placeholder='Password' 
              placeholderTextColor={'gray'} 
              secureTextEntry 
              className="text-lg"
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="w-full">
            <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                <Text className="text-xl font-bold text-white text-center">SignUp</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} className="flex-row justify-center">
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={()=>navigation.push('Login')}>
                <Text className="text-sky-600">Login</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
