import React from 'react';
import { View, TouchableOpacity, Text, Image, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import styles from '../styling/styles';
import { HOST_ADDRESS } from './connectToBackend';
import { showMessage } from 'react-native-flash-message';

//backend code: 401 = bad, 200 = successful (we will try)

class Login extends React.Component {
	constructor(props) {
		super(props)

		const initialState = {
			email: '',
			password: '',
			errorEM: '',
			errorPW: ''
		}
		this.state = initialState;
	}

	render() {
		return (
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ flex: 1 }}
			>

				<View style={styles.container}>
					<View style={styles.startContainer2}>
						<Image
							source={require('../logo/colourL_2.png')}
							style={{ width: 250, height: 250, marginTop: 50, marginBottom: 30, resizeMode: 'contain' }} />
					</View>
					<ScrollView showsVerticalScrollIndicator={false}>
						<TextInput
							style={styles.signUpTextInput}
							label="Email"
							mode="outlined"
							autoCapitalize='none'
							theme={{ colors: { primary: '#0a0540' } }}
							onChangeText={email => this.setState(() => ({ email: email }))}
							value={this.state.email}
							onBlur={() => {
								if (this.state.email == "") {
									this.setState(() => ({ errorEM: "Email required" }));
								}
							}}
							onFocus={() => { // When the field is tapped, remove the error message
								this.setState(() => ({ errorEM: "" }));
							}}
						/>
						<Text style={styles.errorMessage}>{this.state.errorEM}</Text>

						<View style={{ margin: 1 }} />

						<TextInput
							style={styles.signUpTextInput}
							label="Password"
							secureTextEntry={true}
							mode="outlined"
							theme={{ colors: { primary: '#0a0540' } }}
							onChangeText={password => this.setState(() => ({ password: password }))}
							value={this.state.password}
							onBlur={() => {
								if (this.state.password == "") {
									this.setState(() => ({ errorPW: "Password required" }));
								}
							}}
							onFocus={() => { // When the field is tapped, remove the error message
								this.setState(() => ({ errorPW: "" }));
							}}
						/>
						<Text style={styles.errorMessage}>{this.state.errorPW}</Text>

						<View style={{ margin: 8 }} />

						<TouchableOpacity
							style={styles.button}

							onPress={async () => {
								let response = await fetch(`${HOST_ADDRESS}/api/token/`, {
									method: 'POST',
									headers: {
										//Authorization: 'Bearer ' + this.props.route.params.receivedUserInfo["access"],
										Accept: 'application/json',
										'Content-Type': 'application/json'
									},
									body: JSON.stringify({
										email: this.state.email,
										password: this.state.password
									})
								});
								let json = await response.json();
								let responseCode = await response.status;

								if (responseCode == "200") {
									//Flash message
									showMessage({
										message: "Welcome!",
										type: "success",
										autoHide: true,
										duration: 2000,
										backgroundColor: "#0a0540",
										color: "#fafafa",
										icon: "success"
									});

									if (json["is_customer"]) {
										this.props.navigation.navigate('Home', {
											userInfo: json
										})
									} else {
										this.props.navigation.navigate('HomeBusiness', {
											userInfo: json
										})
									}

								} else {
									//Flash message
									showMessage({
										message: "Error: Incomplete/ Invalid. Please try again.",
										type: "danger",
										autoHide: true,
										duration: 2500,
										backgroundColor: "#ff504a",
										color: "#fafafa",
										icon: "danger"
									});
								}
							}}
						>
							<Text style={{ color: '#fafafa', alignSelf: 'center' }}>Login</Text>
						</TouchableOpacity>
					</ScrollView>
				</View >
			</KeyboardAvoidingView >









		)
	}
}   //end of class

export default Login;