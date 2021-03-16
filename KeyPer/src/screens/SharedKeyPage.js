import React,{useEffect,useState} from 'react'
import {Paragraph,Title,Card,TouchableRipple,Button} from 'react-native-paper';
import {Alert, View,Modal} from 'react-native';
import NumericInput from 'react-native-numeric-input'
import axios from 'axios';
import { baseURL } from '../axios_inst';
import { styles } from './HomePage'
import AsyncStorage from '@react-native-async-storage/async-storage';

function SharedKeyPage() {
  const [keys,setKey]=useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("auth_token").then(auth_token=>{
      axios.get(baseURL+"api/get_sharekeys/",{
        headers: {
          'Authorization': `token ${auth_token}`
        }
      }).then(res=>{
        setKey(res.data);
      })
      .catch(err=>{
        console.log(err);
      })
    })
   
    
  }, [])


  const getKeyToDel=(sharedkey)=>{
    Alert.alert(  
      'Delete Shared Key?',  
      'Are you sure you want to delete this shareKey',  
      [  
          {  
              text: 'Cancel',   
              style: 'cancel',  
          },  
          {
            text: 'OK',
            onPress: () => {
              // TODO make a axios request to delete the key
              const newList = keys.filter((item) => item.unique_shared_key !== sharedkey);
              setKey(newList);
            }
          },  
      ]  
  );
  }

  

  const SharedKeyList=keys.length?(
    keys.map(key=>{
      return(
       <>
        <Card key={key.unique_shared_key}>
          <TouchableRipple
      onPress={()=>{getKeyToDel(key.unique_shared_key)}}
      rippleColor="rgba(1, 1, 0, 0.32)"
      >
        <Card.Content>
          <Title>{key.to_name}</Title>
          <Paragraph>Assigned time limit for {key.unique_shared_key} is {'\n'} {key.time_till_expiration} minutes</Paragraph>
        </Card.Content>
        </TouchableRipple>
      </Card>
      <Button key={key.to_name} onPress={()=>{update_modal(key.unique_shared_key)}}>UPDATE</Button>
    </>
    
      )

    })
  ):null

    return (
        <Card>
      <Card.Content >
        <Title  style={styles.cardCenter}>ALTER SHARED KEY{'\n'}</Title>
        <Paragraph>Delete shared key here {"\n"}</Paragraph>
     {SharedKeyList}
     
      </Card.Content>
    </Card>
    )
}
         
export default SharedKeyPage