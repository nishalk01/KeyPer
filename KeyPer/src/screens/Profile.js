import React,{useState,useCallback} from 'react';
import { Text, View } from 'react-native';
import {Avatar,List,Paragraph,Caption,Title,Divider,TouchableRipple}  from 'react-native-paper';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native'
import { baseURL } from '../axios_inst';


function Profile() {
  const [userDetail,setUserDetail]=useState("");
  useFocusEffect(useCallback(() => {
        AsyncStorage.getItem("auth_token").then(auth_token=>{
            axios.get(baseURL+"api_profile/user_details/",{
                headers: {
                  'Authorization': `token ${auth_token}`
                }

              })
              .then(res=>{
    
                  setUserDetail(res.data)
              })
              .catch(err=>{
                  console.log(err)
              })
        })
        
    }, []))


    return (
        <View>
      <Avatar.Text style={styles.avatar} label="N" size={150} />
      
      <Divider/>
      {/* Username */}
     
      <List.Item
        title={<Paragraph>Name</Paragraph>}
        description={<Text ><Title>{ userDetail.username }<Text>{'\n'}</Text></Title><Caption>This is your username</Caption></Text>}
        left={props=><List.Icon  icon="account"  size={30} />}
      />
      
      <Divider/>
      {/* Email */}
     
      <List.Item 
        title={<Paragraph>Email</Paragraph>}
        description={<Text><Title>{ userDetail.email }<Text>{'\n'}</Text></Title><Caption>This is your email</Caption></Text>}
        left={props=><List.Icon  icon="email"  size={30} />}
      />
     
      <Divider/>


      {/* ShowQR */}
      <TouchableRipple
      onPress={()=>{console.log("pressed")}}
      rippleColor="rgba(0, 0, 0, .32)"
     >
      <List.Item 
      title={<Title>QRcode</Title>}
      left={props=><List.Icon  icon="qrcode"  size={30} />}
  />

    
      </TouchableRipple>
      <Divider/>

      
      </View>
    )
}

const styles={
    avatar:{
        marginTop:30,
        alignSelf:"center",
        marginBottom:30,
      },
}

export default Profile
