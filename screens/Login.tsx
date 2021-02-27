import React from 'react';
import {View, TouchableOpacity,Text, Image} from 'react-native';
import {TextInput} from 'react-native-paper';
import styles from '../styling/styles';

class Login extends React.Component{
	constructor(props){
			super(props)
			const initialState ={
					email: '',
					password:'',
					errorEM:'',
					errorPW:''
			}
			this.state = initialState;
	}
	render(){
		return(
			<View style={styles.container}>
				<View style={styles.startContainer}>
				<Image
					source={require('../logo/logoPlaceholder.png')}
					style={{ width: 250, height: 250, marginTop: 150, marginBottom: 100, resizeMode: 'contain' }} />
				</View>
				<TextInput
					style={styles.signUpTextInput}	
					label="Email"
					mode="outlined"
					theme={{colors: {primary: 'blue'} }}
					onChangeText = {email => this.setState(()=> ({email: email}))}
					value={this.state.email}
					onBlur={() => {
            if (this.state.email == "") {
              this.setState(() => ({ errorEM: "Email required" }))
            }
          }}
				/>
				<Text style={{ color: 'red' }}>{this.state.errorEM}</Text>
				<TextInput
					style={styles.signUpTextInput}	
					label="Password"
					secureTextEntry={true}
					mode="outlined"
					theme={{colors: {primary: 'blue'} }}
					onChangeText = {password => this.setState(()=> ({password: password}))}
					value={this.state.password}
					onBlur={() => {
            if (this.state.password == "") {
              this.setState(() => ({ errorPW: "Password required" }))
            }
          }}
				/>
				<Text style={{ color: 'red' }}>{this.state.errorPW}</Text>
				<View style={{ marginTop: 10 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={ async () => { 
            	let response = await fetch('http://127.0.0.1:8000/api/token/', {
            		  method: 'POST',
					  headers: {
					    Accept: 'application/json',
					    'Content-Type': 'application/json'
					  },
					  body: JSON.stringify({
					    email: this.state.email,
					    password: this.state.password
					  })
					});
				let json = await response.json();
				console.log(json);
            	this.props.navigation.navigate('Home') }}
          >
            <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Login</Text>
          </TouchableOpacity>
				</View>
			</View>
				
		)
	}
}   //end of class

export default Login;