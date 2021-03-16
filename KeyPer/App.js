import React,{useEffect} from 'react';
import {View} from 'react-native';
import { NavigationContainer,
  DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import AsyncStorage from '@react-native-async-storage/async-storage';




import { Provider as PaperProvider ,
  DefaultTheme as PaperDefaultTheme} from 'react-native-paper';




// custom  screen imports
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomePage from './src/screens/HomePage';
import AppBar from './src/components/AppBar';
import Profile from './src/screens/Profile';
import  SharedKeyPage from "./src/screens/SharedKeyPage";

import { navigationRef,navigate } from './src/RootNavigation';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();


const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
};





const App=()=> {
  useEffect(() => {
    AsyncStorage.getItem("auth_token").then(auth_token=>{
      if(auth_token!=null){
        navigate('MainApp',{screen:"Home"});
      }
      else{
        navigate("Login")
      }
    })
}, [])

const MainApp=()=>{
  return(
    <View style={{flex:1}}>
        <AppBar/>
        <Tab.Navigator>
          
        <Tab.Screen 
            options={{
              tabBarLabel: 'HOME',
            }}
            name="home"  
            component={HomePage} />
        <Tab.Screen
          options={{
            tabBarLabel:"PROFILE"
          }}
          name="profile"
          component={Profile} />

        </Tab.Navigator>
    </View>
  )
}





  return (
    <PaperProvider  theme={CombinedDefaultTheme}>
    <NavigationContainer ref={navigationRef} > 
       <Stack.Navigator initialRouteName="Login">
       <Stack.Screen name="MainApp" options={{ headerShown:false }} component={MainApp}/>
      <Stack.Screen name="Login"  options={{ headerShown:false}} component={LoginScreen}/>
      <Stack.Screen name="Register" options={{ headerShown:false }} component={RegisterScreen}/>
      <Stack.Screen name="ForgotPassword" options={{ headerShown:false }} component={ForgotPasswordScreen}/>
      <Stack.Screen name="SharedKey" options={{ headerShown:false }} component={SharedKeyPage}/>
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  )
}




export default App;
