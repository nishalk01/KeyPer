import axios from 'axios'
export const baseURL="http://192.168.0.108:8000/"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const axiosInstance= axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: AsyncStorage.getItem("auth_token") ?
        AsyncStorage.getItem("auth_token"):null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});