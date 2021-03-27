import React from 'react';
import { View, TouchableOpacity, Text, Image, Platform, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import styles from '../styling/styles';
import { HOST_ADDRESS } from './connectToBackend';
import { showMessage } from 'react-native-flash-message';

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

	// Verify all the fields are filled in
	checkForm() {
		var decision = false;

		if (this.state.email == "" || this.state.password == "") {
			decision = false;
		} else {
			decision = true;
		}
		return decision;
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
							source={require('../logo/colourLogo.png')}
							style={{ width: 250, height: 250, marginTop: 100, marginBottom: 30, resizeMode: 'contain' }} />
					</View>

					{/* This to make sure that a text field is not covered by a keyboard*/}
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={{ padding: 50, paddingHorizontal: 40 }}>
							{/*Enter Email Address*/}
							<TextInput
								style={styles.signUpTextInput}
								label="Email"
								mode="outlined"
								autoCapitalize='none'
								theme={{ colors: { primary: '#0a0540' } }}
								onChangeText={email => this.setState(({ email: email }))}
								value={this.state.email}
								onBlur={() => {
									if (this.state.email == "") { //If the email is missing, display an error message
										this.setState(({ errorEM: "Required" }));
									}
								}}
								onFocus={() => { // When the field is tapped, remove the error message
									this.setState(({ errorEM: "" }));
								}}
							/>
							<Text style={styles.errorMessage}>{this.state.errorEM}</Text>

							<View style={{ margin: 1 }} />

							{/*Enter Password*/}
							<TextInput
								style={styles.signUpTextInput}
								label="Password"
								secureTextEntry={true}
								mode="outlined"
								autoCapitalize='none'
								theme={{ colors: { primary: '#0a0540' } }}
								onChangeText={password => this.setState(({ password: password }))}
								value={this.state.password}
								onBlur={() => {
									if (this.state.password == "") { //If the password is missing, display an error message
										this.setState(({ errorPW: "Required" }));
									}
								}}
								onFocus={() => { // When the field is tapped, remove the error message
									this.setState(({ errorPW: "" }));
								}}
							/>
							<Text style={styles.errorMessage}>{this.state.errorPW}</Text>

							<View style={{ margin: 8 }} />

							<TouchableOpacity
								style={styles.button}

								//Send entered info to the backend
								onPress={async () => {
									if (this.checkForm()) {
										let response = await fetch(`${HOST_ADDRESS}/api/token/`, {
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
										let responseCode = await response.status;

										if (responseCode == 200) {

											//Success Message
											showMessage({
												message: "Welcome!",
												type: "success",
												autoHide: true,
												duration: 2000,
												backgroundColor: "#0a0540",
												color: "#fafafa",
												icon: "success"
											});

											//Customer Home Screen
											if (json["is_customer"]) {
												this.props.navigation.navigate('Home', { userInfo: json })

											} else { //Business Home Screen
												this.props.navigation.navigate('HomeBusiness', { userInfo: json })
											}

										} else { //Error Message

											showMessage({
												message: `Error: Login Failed. ${'\n'}${'\n'}Please try again.`,
												type: "danger",
												autoHide: true,
												duration: 2500,
												backgroundColor: "#ff504a",
												color: "#fafafa",
												icon: "danger"
											});
										}
									} else {
										//Error Message
										showMessage({
											message: `Error: Incomplete. ${'\n'}${'\n'}Please fill in all the fields.`,
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
						</View>
					</ScrollView>
				</View >
			</KeyboardAvoidingView >
		)
	}
}   //end of class

export default Login;