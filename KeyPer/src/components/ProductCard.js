import  React from 'react';
import {Image} from 'react-native'
import { Avatar, Button, Card, Title, Paragraph,Divider,Text } from 'react-native-paper';
import { Rating, AirbnbRating } from 'react-native-ratings';

const ProductCard = (props) => {
  const ratingCompleted=(rating)=> {
    console.log("Rating is: " + rating)
  }
  // Image.getSize('https://elcopcbonline.com/var/photo/product/2000x4000/4/176/4.jpg', (width, height) => {console.log(height)});
  
  return(
  <Card onPress={()=>{console.log("u  ddclicked");    
}} style={{ marginBottom:20 }}>
    <Card.Content >
     
    </Card.Content >
    <Card.Cover  resizeMode={`cover`} style={{flexDirection: 'column',height:300}}  source={{ uri: props.product_image }} />
    <Card.Content >
    <Title>{props.product_name}</Title>
    <Text>{props.product_detail}</Text>
    <Title>Cost:<Text>{props.product_cost}</Text></Title>
<Rating
  showRating
  type='heart'
  startingValue={4}
  onFinishRating={ratingCompleted}
  style={{ paddingVertical: 10 }}
/>

</Card.Content>

    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
    <Divider />
  </Card>
)};

export default ProductCard;