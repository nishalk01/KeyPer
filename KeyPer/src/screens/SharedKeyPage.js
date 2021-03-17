import React,{useEffect,useState} from 'react'
import {Paragraph,Title,Card,TouchableRipple,Button,Divider} from 'react-native-paper';
import {Alert, View,Modal,Text} from 'react-native';
import NumericInput from 'react-native-numeric-input'
import axios from 'axios';
import { baseURL } from '../axios_inst';
import { styles } from './HomePage'
import AsyncStorage from '@react-native-async-storage/async-storage';

function SharedKeyPage() {
  const [keys,setKey]=useState([]);
  const [showUpdate,setShowUpdate]=useState(false);
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

  const update_modal=()=>{
    setShowUpdate(!showUpdate)
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
      <Divider/>
     {showUpdate?
     (
     <View style={{ alignItems:"center"}}>
       <Paragraph style={{ marginTop:"8%" }}>Change SharedKey time Limit by setting the NumericInput</Paragraph>
       
     <NumericInput 
      value={2} 
      minValue={5}
      maxValue={60}
      onChange={value => console.log(value)} 
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
     <View style={{ flexDirection:"row",marginTop:"10%" }}>
     <Button mode="contained" color="red" onPress={()=>setShowUpdate(false)} >CANCEL</Button>
     <Button mode="contained" style={{ marginLeft:"10%" }} onPress={()=>console.log("hello")} >CHANGE</Button>
     </View>
      </View>)
     
     :null}

      
    </>
    
      )

    })
  ):null

    return (
        <Card>
      <Card.Content >
        <Title  style={styles.cardCenter}>ALTER SHARED KEY{'\n'}</Title>
        <Button  mode="outlined" onPress={()=>{update_modal()}}>UPDATE</Button>
        <Paragraph>Delete shared key here {"\n"}</Paragraph>
     {SharedKeyList}
     
      </Card.Content>
    </Card>
    )
}
         
export default SharedKeyPage