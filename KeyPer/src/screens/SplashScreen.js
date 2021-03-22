import React,{PureComponent} from "react";
import { StyleSheet, Text, SafeAreaView,Image } from "react-native";
import {ActivityIndicator,Colors,Headline} from 'react-native-paper';

import logo from "../assets/logo_react.png";


const SplashScreen=()=>{
    return(
        <SafeAreaView style={styles.container}>
            <Image style={styles.icon} source={logo}/>
            <Headline style={styles.text}>KeyPer 🔑</Headline>
            <ActivityIndicator animating={true} color={Colors.purple500} />
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1, 
        flexDirection:"column",
        alignItems:"center",
        top:"38%",
        
    },
    icon:{
        width: 150,
        height: 150,   
    },
    text:{
        fontSize:20
    }
  
})
 
export default SplashScreen;
