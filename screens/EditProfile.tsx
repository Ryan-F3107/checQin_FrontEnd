import React from 'react';
import styles from '../styling/styles';
import styleMenu from '../styling/optionStyling';
import { View, Text, TouchableOpacity } from 'react-native'
import { TextInput, IconButton } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import signUpDefaultstyleForPicker from '../styling/signUpDefaultPicker';
import { HOST_ADDRESS } from './connectToBackend';
import Validation from '../functions/Validation';	// To validate PhoneNumber

class EditProfile extends React.Component {
	constructor(props) {
		super(props)
		this.getInfo();
		const initialState = {
			email: '',
			newEmail: '',
			firstname: '',
			newFirstName: '',
			lastname: '',
			newLastName: '',
			phoneNumber: '',
			newPhoneNumber: '',
			validPhone: '',
			errorPhoneNumber: '',
			contactPref: '',
			errorPref: ''
		}	//end of initial state
		this.state = initialState;
	}

	async getInfo() {
		var link = `${HOST_ADDRESS}/checkin/customer/` + this.props.route.params.receivedUserInfo["id"] + "/";

		let response = await fetch(link, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + this.props.route.params.receivedUserInfo["access"],
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
		})
		response = await response.json();
		console.log("Response from edit profile: ", response);
		this.setState(() => ({ email: response["user"]["email"] }))
		this.setState(() => ({ firstname: response["first_name"] }))
		this.setState(() => ({ phoneNumber: response["phone_num"] }))
		if (response["contact_pref"] == "E") {
			this.setState(() => ({ contactPref: "email" }))
		} else if (response["contact_pref"] == "P") {
			this.setState(() => ({ contactPref: "phone" }))
		}


	};

	render() {
		return (
			<View style={styles.homeContainer}>
				<IconButton	//Adding the exit icon to the top-right corner
					style={styles.closeButton}
					icon="close"
					size={35}
					color={'black'}
					onPress={() => {
						if (this.props.route.params.accountType == "customer") {
							this.props.navigation.goBack();
							//this.props.navigation.replace('Home');

						} else if (this.props.route.params.accountType == "business") {
							this.props.navigation.goBack();
							//this.props.navigation.replace('HomeBusiness');
						}
					}}
				></IconButton>
				<View style={styleMenu.optionScreen}>
					<Text
						style={styleMenu.optionTitle}>
						Edit Profile
					</Text>

					<Text style={styles.editProfileLabels}>EMAIL</Text>
					<TextInput	//Text Input for email

						style={styles.signUpTextInput}
						mode="outlined"
						placeholder={this.state.email}
						autoCapitalize="none"
						theme={{ colors: { primary: '#002970' } }}
						//* Check verify that the entered email is valid 
						onChangeText={newEmail => this.setState(() => ({ newEmail: newEmail }))}
						value={this.state.newEmail}
						onBlur={() => { // Check if the email has the correct form. If not, display an error message
							var errorMessage = Validation.validateEmailAddress(this.state.newEmail);
							if (errorMessage == "") {
								this.setState({ validEmail: true });
							} else {
								this.setState({ errorEmail: errorMessage, validEmail: false });
							}
						}}
						onFocus={() => { // When the field is tapped, remove the error message
							this.setState(() => ({ errorEmail: "" }));
						}}
					//onFocus={ }
					/>

					<Text style={styles.editProfileLabels}>FIRST NAME</Text>
					<TextInput
						style={styles.signUpTextInput}
						//label="Name"
						mode="outlined"
						placeholder={this.state.firstname}
						theme={{ colors: { primary: '#002970' } }}
						onChangeText={newFirstName => this.setState(() => ({ newFirstName: newFirstName }))}
						value={this.state.newFirstName}
					/>

					<Text style={styles.editProfileLabels}>LAST NAME</Text>
					<TextInput
						style={styles.signUpTextInput}
						//label="Name"
						mode="outlined"
						placeholder={this.state.lastname}
						theme={{ colors: { primary: '#002970' } }}
						onChangeText={newLastName => this.setState(() => ({ newLastName: newLastName }))}
						value={this.state.newLastName}
					/>

					<Text style={styles.editProfileLabels}>PHONE NUMBER</Text>
					<TextInput	//Text input 
						style={styles.signUpTextInput}
						//label="Phone Number"
						mode="outlined"
						placeholder={this.state.phoneNumber}
						keyboardType="number-pad"
						theme={{ colors: { primary: '#002970' } }}
						onChangeText={newPhoneNumber => this.setState(() => ({ newPhoneNumber: Validation.validatePhoneNumber(newPhoneNumber) }))}
						value={this.state.newPhoneNumber}
						onBlur={() => {
							// Check if an error message needs to be displayed
							let errorMessage = Validation.printPhoneNumErrorMessage(this.state.newPhoneNumber);
							if (errorMessage == "") {
								this.setState({ validPhone: true });
							} else {
								this.setState({ errorPhoneNumber: errorMessage, validPhone: false });
							}
						}}
						onFocus={() => { // When the field is tapped, remove the error message
							this.setState(() => ({ errorPhoneNumber: "" }));
						}}
					/>
					<View style={styles.viewAndroidOnly}>
						<Text style={{ fontSize: 15, marginBottom: -10, color: '#002970' }}>CONTACT PREFERENCE</Text>
						<RNPickerSelect
							value={this.state.contactPref}
							onValueChange={(contactPref) => this.setState({ contactPref: contactPref })}
							useNativeAndroidPickerStyle={false}
							items={[
								{ label: "Email", value: 'email' },
								{ label: "Phone", value: 'phone' }]}
							style={signUpDefaultstyleForPicker}
							onClose={() => {
								if (this.state.contactPref == "") {
									console.log(this.state.contactPref)
									this.setState(() => ({ errorPref: "Required" }))
								} else {
									this.setState(() => ({ errorPref: "" }))
								}
							}}
							onOpen={() => {
								this.setState(() => ({ errorPref: "" }))
							}}

						/>
					</View>
					<Text style={styles.errorMessage}>{this.state.errorPref}</Text>

					<View style={{ marginTop: 50 }} />
					<TouchableOpacity	//confirm button for Edit Profile
						style={styles.button}
						onPress={async () => {
							var link = `${HOST_ADDRESS}/checkin/customer/` + this.props.route.params.receivedUserInfo["id"] + "/";
							var linkEmail = `${HOST_ADDRESS}/checkin/change_email/` + this.props.route.params.receivedUserInfo["id"] + "/";

							let response = await fetch(link, {
								method: 'PUT',
								headers: {
									Accept: 'application/json',
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({
									first_name: this.state.newFirstName,
									phone_num: this.state.newPhoneNumber,
								})
							})

							let responseEmail = await fetch(linkEmail, {
								method: 'PUT',
								headers: {
									Authorization: 'Bearer ' + this.props.route.params.receivedUserInfo["access"],
									Accept: 'application/json',
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({
									email: this.state.newEmail
								})
							})


							//console.log("Profile edited: ", responseEmail);
							this.props.navigation.goBack();

							//I don't think we have this screen anymore. import {showMessage} from 'react-native-flash-message'
							//Then, show a flash message instead. The similar thing has been done in ChangePassword
							//this.props.navigation.navigate('ConfirmationScreen', { accountType: this.props.route.params.accountType })
						}}	//confirmation splash screen
					>
						<Text style={{ color: '#fafafa', alignSelf: 'center' }}>Save</Text>
					</TouchableOpacity>

				</View>
			</View>
		)
	}
}

export default EditProfile;
