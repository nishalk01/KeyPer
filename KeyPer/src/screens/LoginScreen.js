import React, { memo,useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import {axiosInstance} from '../axios_inst';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(false);

  const handleSubmit=(e)=>{
    setLoading(true);
   axiosInstance.post("dj-rest-auth/login/",{
     "email":email,
     "password":password
   })
   .then(async res=>{
     await AsyncStorage.setItem("auth_token",res.data.key)
     setEmail("");
     setPassword("");
     setLoading(false);
     setError(false);
     //TODO add navigate to home here
   })
   .catch(err=>{
     setLoading(false)
     setError(true)

   })
  }
 

  return (
    <Background>
      
    

      <Logo />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={text => setEmail(text)}
        error={error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={text => setPassword(text)}
        error={error}
        errorText={error?("Unable to Login with provided credentials"):""}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={handleSubmit} loading={loading} >
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <Button onPress={()=>navigation.navigate('MainApp', { screen: 'Home' })}>Go to Home</Button>
      {/* <Text style={styles.label} onPress={()=>navigation.navigate('MainApp', { screen: 'Home' })} >  go to main </Text> */}
     
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
