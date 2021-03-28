import React from 'react';
import styles from '../../styling/styles';
import styleMenu from '../../styling/optionStyling';
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { TextInput, IconButton } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import signUpDefaultstyleForPicker from '../../styling/signUpDefaultPicker';
import { serverAddress } from '../connectToBackend';
import { ScrollView } from 'react-native-gesture-handler';
import Validation from '../../functions/Validation';	// To validate PhoneNumber
import { showMessage } from 'react-native-flash-message';


class EditProfile extends React.Component {
	constructor(props) {
		super(props)
		this.getInfo();
		const initialState = {
			email: '',
			newEmail: '',
			validEmail: '',

			firstname: '',
			newFirstName: '',
			errorFirstName: '',

			lastname: '',
			newLastName: '',
			errorLastName: '',

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
		var link = `${serverAddress}/checkin/customer/` + this.props.route.params.receivedUserInfo["id"] + "/";

		let response = await fetch(link, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + this.props.route.params.receivedUserInfo["access"],
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
		})
		response = await response.json();
		console.log(response);
		let formattedPhone = response["phone_num"].slice(0, 3) + "-" + response["phone_num"].slice(3, 6) + "-" + response["phone_num"].slice(6, response["phone_num"].length);
		this.setState(() => ({ email: response["user"]["email"] }))
		this.setState(() => ({ firstname: response["first_name"] }))
		this.setState(() => ({ lastname: response["last_name"] }))
		this.setState(() => ({ phoneNumber: formattedPhone }))
		if (response["contact_pref"] == "E") {
			this.setState(() => ({ contactPref: "email" }))
		} else if (response["contact_pref"] == "P") {
			this.setState(() => ({ contactPref: "phone" }))
		}


	};

	checkForm() {
		let decision = false;

		if (this.state.newEmail == "" || !this.state.validPhone
			|| this.state.newFirstName == "" || this.state.newLastName == "") {
			decision = false
		}
		else {
			decision = true
		}
		return decision
	}
	render() {
		return (
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ flex: 1 }}
			>
				<View style={styles.homeContainer}>
					<IconButton	//Adding the exit icon to the top-right corner
						style={styles.closeButton}
						icon="close"
						size={35}
						color={'black'}
						onPress={() => {
							if (this.props.route.params.accountType == "customer") {
								this.props.navigation.goBack();


							} else if (this.props.route.params.accountType == "business") {
								this.props.navigation.goBack();

							}
						}}
					></IconButton>
					<View style={styleMenu.optionScreen}>
						<Text
							style={styleMenu.optionTitle}>
							Edit Profile
						</Text>
						<ScrollView>
							<View style={{ paddingHorizontal: 50 }}>
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

										// If the new email has been entered, check whether the email has the correct form or not
										if (this.state.newEmail != "") {
											var errorMessage = Validation.validateEmailAddress(this.state.newEmail);
											if (errorMessage == "") {
												this.setState({ validEmail: true });
											} else {
												this.setState({ errorEmail: errorMessage, validEmail: false });
											}
										}
									}}
									onFocus={() => { // When the field is tapped, remove the error message
										this.setState(() => ({ errorEmail: "" }));
									}}
								/>
								<Text style={styles.errorMessage}>{this.state.errorEmail}</Text>

								<Text style={styles.editProfileLabels}>FIRST NAME</Text>
								<TextInput
									style={styles.signUpTextInput}
									//label="Name"
									mode="outlined"
									placeholder={this.state.firstname}
									spellCheck={false}
									theme={{ colors: { primary: '#002970' } }}
									onChangeText={newFirstName => this.setState(() => ({ newFirstName: newFirstName }))}
									value={this.state.newFirstName}
									onBlur={() => { // If the field is left blank, show an error message 
										if (this.state.newFirstName == "") {
											this.setState({ errorFirstName: "Required" });
										}
									}}
									onFocus={() => { // When the field is tapped, remove the error message
										this.setState({ errorFirstName: "" });
									}}
								/>
								<Text style={styles.errorMessage}>{this.state.errorFirstName}</Text>

								<Text style={styles.editProfileLabels}>LAST NAME</Text>
								<TextInput
									style={styles.signUpTextInput}
									//label="Name"
									mode="outlined"
									placeholder={this.state.lastname}
									spellCheck={false}
									theme={{ colors: { primary: '#002970' } }}
									onChangeText={newLastName => this.setState(() => ({ newLastName: newLastName }))}
									value={this.state.newLastName}
									onBlur={() => { // If the field is left blank, show an error message 
										if (this.state.newLastName == "") {
											this.setState({ errorLastName: "Required" });
										}
									}}
									onFocus={() => { // When the field is tapped, remove the error message
										this.setState({ errorLastName: "" });
									}}
								/>
								<Text style={styles.errorMessage}>{this.state.errorLastName}</Text>

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
								<Text style={styles.errorMessage}>{this.state.errorPhoneNumber}</Text>

								<View style={{ marginBottom: 20 }} />
								<Text style={styles.pickerTitle}>CONTACT PREFERENCE</Text>
								<View style={styles.viewAndroidOnly}>
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
										var contactPforC = '';
										if (this.state.contactPref == "email") {
											contactPforC = 'E';
										} else {
											contactPforC = 'P';
										}
										if (this.checkForm()) { // Success
											let link = `${serverAddress}/checkin/customer/` + this.props.route.params.receivedUserInfo["id"] + "/";
											let linkEmail = `${serverAddress}/checkin/change_email/` + this.props.route.params.receivedUserInfo["id"] + "/";
											console.log('first_name: ', this.state.newFirstName,
												'last_name: ', this.state.newLastName,
												'phone_num: ', this.state.newPhoneNumber.replace(/-/gi, ''),
												'contact_pref: ', contactPforC)
											let response = await fetch(link, {
												method: 'PUT',
												headers: {
													Authorization: 'Bearer ' + this.props.route.params.receivedUserInfo["access"],
													Accept: 'application/json',
													'Content-Type': 'application/json'
												},
												body: JSON.stringify({
													first_name: this.state.newFirstName,
													last_name: this.state.newLastName,
													phone_num: this.state.newPhoneNumber.replace(/-/gi, ''),
													contact_pref: contactPforC
												})
											})
											let responseUpdateCode = await response.status;

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
											let responseEmailCode = await responseEmail.status;

											if (responseEmailCode == 200 && responseUpdateCode == 200) {
												//remove all new fields
												this.setState({ newEmail: '', newFirstName: '', newLastName: '', newPhoneNumber: '', contactPref: '' });
												// Success Message
												showMessage({
													message: `Profile updated.`,
													type: "success",
													autoHide: true,
													duration: 2000,
													backgroundColor: "#0a0540",
													color: "#fafafa",
													icon: "success"
												});
												this.props.navigation.goBack();
											} else { // Error Message
												showMessage({
													message: `Error: Profile update failed. ${'\n'}${'\n'}Please try again.`,
													type: "danger",
													autoHide: true,
													duration: 2500,
													backgroundColor: "#ff504a",
													color: "#fafafa",
													icon: "danger"
												});
											}
										} else { // Error Message
											showMessage({
												message: `Error: Invalid Form. ${'\n'}${'\n'}Please fill in all the fields.`,
												type: "danger",
												autoHide: true,
												duration: 2500,
												backgroundColor: "#ff504a",
												color: "#fafafa",
												icon: "danger"
											});
										}	//end of outer if-else statement
									}}	//end of onPress function
								>
									<Text style={{ color: '#fafafa', alignSelf: 'center' }}>Save</Text>
								</TouchableOpacity>


							</View>
						</ScrollView>
					</View>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

export default EditProfile;
