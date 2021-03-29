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
			errorPref: '',

			emailToBackend: '',
			firstNameToBackend: '',
			lastNameToBackend: '',
			phoneNumToBackend: '',
			contactPrefToBackend: '',

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

		// Format the phone number by adding two dashes
		let formattedPhone = response["phone_num"].slice(0, 3) + "-" + response["phone_num"].slice(3, 6) + "-" + response["phone_num"].slice(6, response["phone_num"].length);

		// Set the current/old values from the backend 
		// Since it is possible that a user doesn't change anything, set the to-be-sent values to the old values by default
		this.setState(() => ({ email: response["user"]["email"], emailToBackend: response["user"]["email"], validEmail: true }))
		this.setState(() => ({ firstname: response["first_name"], firstNameToBackend: response["first_name"] }))
		this.setState(() => ({ lastname: response["last_name"], lastNameToBackend: response["last_name"] }))
		this.setState(() => ({ phoneNumber: formattedPhone, phoneNumToBackend: formattedPhone, validPhone: true }))

		// Format the contact preference
		if (response["contact_pref"] == "E") {
			this.setState(() => ({ contactPref: "email", contactPrefToBackend: "email" }))
		} else if (response["contact_pref"] == "P") {
			this.setState(() => ({ contactPref: "phone", contactPrefToBackend: "phone" }))
		}
	};

	// Verify that all the fields are valid
	checkForm() {
		let decision = false;

		if (!this.state.validEmail || !this.state.validPhone || this.state.errorPref != "") {
			decision = false
		} else {
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
									onBlur={() => {

										// If the new email has been entered, check whether the email has the correct form or not
										if (this.state.newEmail != "") {
											var errorMessage = Validation.validateEmailAddress(this.state.newEmail);

											if (errorMessage == "") { //no issue
												this.setState({ validEmail: true, emailToBackend: this.state.newEmail });
											} else { // issue with the email
												this.setState({ errorEmail: errorMessage, validEmail: false });
											}
										} else { //if email has not been modifeid, use the old value
											this.setState({ emailToBackend: this.state.email })
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
									onBlur={() => { // If the field is left blank, use the old value
										if (this.state.newFirstName == "") {
											this.setState({ firstNameToBackend: this.state.firstname })
										} else {
											this.setState({ firstNameToBackend: this.state.newFirstName })
										}
									}}
								/>
								<View style={{ marginTop: 10 }} />

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
									onBlur={() => { // If the field is left blank, use the old value
										if (this.state.newLastName == "") {
											this.setState({ lastNameToBackend: this.state.lastname })
										} else {
											this.setState({ lastNameToBackend: this.state.newLastName })
										}
									}}
								/>
								<View style={{ marginTop: 10 }} />

								<Text style={styles.editProfileLabels}>PHONE NUMBER</Text>
								<TextInput	//Text input 
									style={styles.signUpTextInput}
									mode="outlined"
									placeholder={this.state.phoneNumber}
									keyboardType="number-pad"
									maxLength={12}
									theme={{ colors: { primary: '#002970' } }}
									onChangeText={newPhoneNumber => this.setState(() => ({ newPhoneNumber: Validation.validatePhoneNumber(newPhoneNumber) }))}
									value={this.state.newPhoneNumber}
									onBlur={() => {
										if (this.state.newPhoneNumber != "") {
											// Check if an error message needs to be displayed
											let errorMessage = Validation.printPhoneNumErrorMessage(this.state.newPhoneNumber);

											if (errorMessage == "") { // no issue
												this.setState({ phoneNumToBackend: this.state.newPhoneNumber, validPhone: true });
											} else { // issue with the phone number
												this.setState({ errorPhoneNumber: errorMessage, validPhone: false });
											}
										} else { //if no new phone number is entered, use the old value
											this.setState({ phoneNumToBackend: this.state.phoneNumber, validPhone: true })
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
											// if nothing is selected, display an error message
											if (this.state.contactPref == null) {
												this.setState(() => ({ errorPref: "Required" }))
											} else { //if something is selected, set the value
												this.setState({ errorPref: "", contactPrefToBackend: this.state.contactPref })
											}
										}}
										onOpen={() => { // do not display an error message when it is focused
											this.setState(() => ({ errorPref: "" }))
										}}

									/>
								</View>
								<Text style={styles.errorMessage}>{this.state.errorPref}</Text>

								<View style={{ marginTop: 50 }} />
								<TouchableOpacity	//confirm button for Edit Profile
									style={styles.button}
									onPress={async () => {

										if (this.checkForm()) { // Success

											// Format the contact prefrence for the backend
											var contactPforC = '';
											if (this.state.contactPrefToBackend == "email") {
												contactPforC = 'E';
											} else {
												contactPforC = 'P';
											}

											let link = `${serverAddress}/checkin/customer/` + this.props.route.params.receivedUserInfo["id"] + "/";
											let linkEmail = `${serverAddress}/checkin/change_email/` + this.props.route.params.receivedUserInfo["id"] + "/";

											let response = await fetch(link, {
												method: 'PUT',
												headers: {
													Authorization: 'Bearer ' + this.props.route.params.receivedUserInfo["access"],
													Accept: 'application/json',
													'Content-Type': 'application/json'
												},
												body: JSON.stringify({
													first_name: this.state.firstNameToBackend,
													last_name: this.state.lastNameToBackend,
													phone_num: this.state.phoneNumToBackend.replace(/-/gi, ''),
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
													email: this.state.emailToBackend
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
										} else { // Error Message due to invalid inputs
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
