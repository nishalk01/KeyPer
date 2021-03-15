import React,{useEffect,useState} from 'react'
import {Paragraph,Title,Card} from 'react-native-paper';
import axios from 'axios';
import { baseURL } from '../axios_inst';
import { styles } from './HomePage'
import AsyncStorage from '@react-native-async-storage/async-storage';

function SharedKeyPage() {
  const [keys,setKey]=useState([]);

  useEffect(() => {
    AsyncStorage.getItem("auth_token").then(auth_token=>{
      axios.get(baseURL+"api/get_sharekeys/",{
        headers: {
          'Authorization': `token ${auth_token}`
        }
      }).then(res=>{
        setKey(res.data);
        console.log(res.data)
      })
      .catch(err=>{
        console.log(err);
      })
    })
   
    
  }, [])

  const SharedKeyList=keys.length?(
    keys.map(key=>{
      return(
        <Card key={key.to}>
        <Card.Content>
          <Title>{key.to_name}</Title>
          <Paragraph>Assigned time limit for {key.unique_shared_key} is {'\n'} {key.time_till_expiration} minutes</Paragraph>

        </Card.Content>
      </Card>
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