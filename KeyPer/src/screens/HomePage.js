import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React,{useState} from 'react';
import { StyleSheet, Alert,Text,View } from 'react-native';
import {baseURL} from '../axios_inst';
import { Button, Divider,Card, Title, Paragraph,Provider,Portal,Modal,TextInput,TouchableRipple } from 'react-native-paper';
import NumericInput from 'react-native-numeric-input'
function HomePage({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [email,setEmail]=useState(null);
  const [timeLimit, setTimeLimit] = useState(null);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const handleCreateUserKey=()=>{
  AsyncStorage.getItem("auth_token").then(
   auth_token=>{
    axios.get(baseURL+"api/generate_key/",{
      headers: {
        'Authorization': `token ${auth_token}`
      }
    }).then(
      res=>{
        console.log(res)
      }
    )
    .catch(err=>{
      console.log(err)
    })
    console.log(auth_token)
    
   }
  )}


  const CreateShareKey=()=>{
    hideModal()
    console.log("hello")
    if(email){
      AsyncStorage.getItem("auth_token").then(auth_token=>{
        axios.post(baseURL+"api/create_share_key/",{
         "to_user" :String(email),
         "time_limit":timeLimit
        },{
          headers: {
            'Authorization': `token ${auth_token}`
          }
          // TODO check email is valid or not 
        }).then(res=>{
          console.log(res.status);
        })
        .catch(err=>{
          console.log(err)
        })
})

    }
    else{
      Alert.alert("Enter A email")
    }
   

  }


  const DeleteUserKey=()=>{
    AsyncStorage.getItem("auth_token").then(auth_token=>{
      axios.get(baseURL+"api/delete_userkey/",{
        headers: {
          'Authorization': `token ${auth_token}`
        }
      })
      .then(res=>{
        console.log(res.status);
      })
      .catch(err=>{
        console.log(err)
      })
    })
  }
   
   
    return (
      <Provider>
     <View style={styles.container}> 


      <Portal>
        <Modal visible={visible} onDismiss={hideModal}  contentContainerStyle={containerStyle}>
        <TextInput
         label="enter a email"
         mode="outlined"
         onChangeText={text => setEmail(text)}>
         </TextInput>
         <NumericInput 
            value={timeLimit} 
            minValue={5}
            maxValue={60}
            onChange={value => setTimeLimit(value)} 
            onLimitReached={(isMax,msg) => console.log(isMax,msg)}
            totalWidth={100} 
            totalHeight={50} 
            iconSize={10}
            step={15}
            valueType='real'
             
            textColor='#B0228C' 
            iconStyle={{ color: 'white' }} 
            rightButtonBackgroundColor='#EA3788' 
            leftButtonBackgroundColor='#E56B70'/>
        <Button style={styles.cardCenter} onPress={CreateShareKey}>Doe</Button>
        </Modal>
      </Portal>
    

    <Card>
      <Card.Content >
        <Title style={styles.cardCenter} >GENERATE USER KEY{'\n'}</Title>
        <Paragraph>Generate and delete digital Key for personal usage these key have no time limit{"\n"}</Paragraph>
        <Button icon="key"  style={styles.cardCenter} color="yellow" mode="contained" onPress={handleCreateUserKey}>
            Generate User Key
          </Button>
          <Button icon="delete" color="red" style={styles.second_button} mode="contained"  onPress={DeleteUserKey}>
            Delete user key
          </Button>
      </Card.Content>
    </Card>
    <Divider style={{marginBottom:"5%"}}/>
    
    <Card >
    <TouchableRipple
      onPress={()=>{navigation.navigate("SharedKey")}}
      rippleColor="rgba(1, 1, 0, 0.32)"
      >
      <Card.Content >
        <Title style={styles.cardCenter} >CREATE A SHARE KEY{'\n'}</Title>
        <Paragraph >Create a Share key that could shared with anyone with time limit{"\n"}</Paragraph>
        <Button icon="share-all"  style={styles.cardCenter} color="pink" mode="contained" onPress={showModal}>
            Assign share key
          </Button>
          {/* <Button icon="delete" color="red" style={styles.second_button} mode="contained"  onPress={() => console.log('Pressed')}>
            delete share key
          </Button> */}
      </Card.Content>
      </TouchableRipple>
    </Card>
    
     </View>
     </Provider>
    )
}






export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cardCenter:{
      alignSelf:"center"
    },
    second_button:{
      alignSelf:"center",
      marginTop:"10%"
    },
    
  });

export default HomePage;