import  React from 'react';
import { Appbar } from 'react-native-paper';
import { Platform } from 'react-native';
import {navigate} from '../RootNavigation';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const AppBar = () => {
return(
    <Appbar.Header> 
        <Appbar.Action icon={MORE_ICON} onPress={() => {navigate("Login")}} />
       <Appbar.Content title="KeyPer" />
    </Appbar.Header>
)};

export default AppBar;