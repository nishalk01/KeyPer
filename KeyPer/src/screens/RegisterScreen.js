import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ToastAndroid } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

import { theme } from '../core/theme';
import { axiosInstance } from '../axios_inst';
import { checkifempty, ValidateEmail } from '../utils';


const RegisterScreen = ({ navigation }) => {
  const [username,setUserName]=useState("");
  const [password1,setPassword1]=useState("");
  const [password2,setPassword2]=useState("");
  const [email,setEmail]=useState("");
  const [loading,setLoading]=useState(false);
  const [errorUsername,setErrorUserName]=useState({
       error:true,
       errorText:""
  })
  const [errorEmail,setErrorEmail]=useState({
    error:false,
    errorText:""
})
const [errorPassword1,setErrorPassword1]=useState({
  error:false,
  errorText:""
})
const [errorPassword2,setErrorPassword2]=useState({
  error:false,
  errorText:""
})

const showToastWithGravityAndOffset = (message) => {
  ToastAndroid.showWithGravityAndOffset(
    String(message),
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50
  );
};



  const handleSubmit=()=>{
   const  email_valid=ValidateEmail(email)
    console.log(email_valid);
    
    //check if empty
   const  username_empty=checkifempty(username);
    const email_empty=checkifempty(email);
    const password1_empty=checkifempty(password1);
   const  password2_empty=checkifempty(password2);

    

    if(email_empty && username_empty && password1_empty && password2_empty){ //check if any field is empty
     
      if(email_valid){ //check if email is valid
        //TODO check for password valid length
        if(password1===password2){//check if password match
          setLoading(true)
          setErrorEmail({
            error:false,
            errorText:""
        })
        setErrorPassword1({
          error:false,
          errorText:""
      })
      setErrorPassword2({
        error:false,
        errorText:""
     })
    setErrorUserName({
      error:false,
      errorText:""
     })

          axiosInstance.post("dj-rest-auth/registration/",{
            "username":username,
            "email":email,
            "password1":password1,
            "password2":password2
            })
            .then(res=>{
              setLoading(false);
              console.log(res.data.detail);
              setEmail("");
              setPassword2("");
              setPassword1("");
              setUserName("");
              showToastWithGravityAndOffset(res.data.detail)
              navigation.navigate("Login");


            })
            .catch(err=>{
              setLoading(false);
              console.log(err.status)
              if(err.response.status==400){
              const response_error=err.response.data;
              if(response_error.email){
                setErrorEmail({
                  error:true,
                  errorText:response_error.email
                })
              }
              if(response_error.username){
                setErrorUserName({
                  error:true,
                  errorText:response_error.username
                })
              }
              }
            })
        }
        else{
          setErrorPassword1({
            error:true,
            errorText:"password do not match"
          })
        }//password match
      }
      else{
        setErrorEmail({
          error:true,
          errorText:"Email is not in proper format"
        })
      }//email not valid
    }
    else{
      
      if(!username_empty){
        setErrorUserName({
          error:true,
          errorText:"This field is required"
        })
      }
      else{
        setErrorUserName({
          error:false,
          errorText:""
        })
      }//user empty
  
      if(!email_empty){
        setErrorEmail({
          error:true,
          errorText:"This field is required"
        })
      }
      else{
        setErrorEmail({
          error:false,
          errorText:""
        })
      }//email empty
  
      if(!password1_empty){
        setErrorPassword1({
          error:true,
          errorText:"This field is required"
        })
      }
      else{
        setErrorPassword1({
          error:false,
          errorText:""
        })
      }//password1 empty

      if(!password2_empty){
        setErrorPassword2({
          error:true,
          errorText:"This field is required"
        })
      }
    
    else{
      setErrorPassword2({
        error:false,
        errorText:""
      })
    }//empty or not
    

  
  }
}
  

  return (
    <Background>
      

      <Logo />

      <Header>Create Account</Header>
     


      <TextInput
        label="Name"
        returnKeyType="next"
        value={username}
        onChangeText={text => setUserName(text)}
        error={errorUsername.error}
        errorText={errorUsername.errorText}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={text => setEmail(text)}
        error={errorEmail.error}
        errorText={errorEmail.errorText}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password1}
        onChangeText={text => setPassword1(text)}
        error={errorPassword1.error}
        errorText={errorPassword1.errorText}
        secureTextEntry
      />

     <TextInput
        label="Confirm password"
        returnKeyType="done"
        value={password2}
        onChangeText={text => setPassword2(text)}
        error={errorPassword2.error}
        errorText={errorPassword2.errorText}
        secureTextEntry
      />

      <Button mode="contained" loading={loading} onPress={handleSubmit} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
