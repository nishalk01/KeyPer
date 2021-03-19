import React,{useEffect} from 'react';
import { Text, View } from 'react-native';
import {Avatar,List,Paragraph,Caption,Title,Divider,TouchableRipple}  from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from '../axios_inst';


function Profile() {
    useEffect(() => {
        AsyncStorage.getItem("auth_token").then(auth_token=>{
            axios.get(baseURL+"api_profile/user_details/",{
                headers: {
                  'Authorization': `token ${auth_token}`
                }

              })
              .then(res=>{
                  console.log(res.data);
              })
              .catch(err=>{
                  console.log(err)
              })
        })
        
    }, [])


    return (
        <View>
      <Avatar.Text style={styles.avatar} label="N" size={150} />
      <Divider/>
      {/* Username */}
      <TouchableRipple
      onPress={()=>{console.log("pressed")}}
      rippleColor="rgba(0, 0, 0, .32)"
     >
      <List.Item
        title={<Paragraph>Name</Paragraph>}
        description={<Text ><Title>Nishal<Text>{'\n'}</Text></Title><Caption>This is your username</Caption></Text>}
        left={props=><List.Icon  icon="account"  size={30} />}
      />
       </TouchableRipple>
      <Divider/>
      {/* Email */}
      <TouchableRipple
      onPress={()=>{console.log("pressed")}}
      rippleColor="rgba(0, 0, 0, .32)"
     >
      <List.Item 
        title={<Paragraph>Email</Paragraph>}
        description={<Text><Title>nishal@gmail.com<Text>{'\n'}</Text></Title><Caption>This is your email</Caption></Text>}
        left={props=><List.Icon  icon="email"  size={30} />}
      />
      </TouchableRipple>
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
