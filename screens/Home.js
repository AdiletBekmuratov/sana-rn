import { View, Text } from 'react-native'
import React from 'react'
import tw from "twrnc";
import { Button } from 'react-native-paper';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function Home() {
	return (
		<View style={tw`h-full flex-1 px-5 justify-center bg-gray-100`}>
			<Text>Home</Text>
		</View>
	)
}