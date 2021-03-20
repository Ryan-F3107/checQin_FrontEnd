import React from 'react';
import styles from '../styling/styles';
import styleMenu from '../styling/optionStyling';
import { View, Text, TouchableOpacity } from 'react-native'
import { TextInput, IconButton } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import signUpDefaultstyleForPicker from '../styling/signUpDefaultPicker';

class EditProfile extends React.Component {
	constructor(props) {
		super(props)
		this.getInfo();
		const initialState = {
			email: '',
			newEmail: '',
			name: '',
			newName: '',
			phoneNumber: '',
			newPhoneNumber: '',
			contactPref: '',
			errorPref: ''
		}	//end of initial state
		this.state = initialState;
	}

	async getInfo() {
		var link = 'http://127.0.0.1:8000/checkin/customer/' + this.props.route.params.receivedUserInfo["id"] + "/";

		let response = await fetch(link, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
		})
		response = await response.json();
		console.log("Response from edit profile: ", response);
		this.setState(() => ({ email: response["user"]["email"] }))
		this.setState(() => ({ name: response["first_name"] }))
		this.setState(() => ({ phoneNumber: response["phone_num"] }))
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
						theme={{ colors: { primary: 'blue' } }}
						onChangeText={newEmail => this.setState(() => ({ newEmail: newEmail }))}
						value={this.state.newEmail}
					//onFocus={ }
					/>

					<Text style={styles.editProfileLabels}>NAME</Text>
					<TextInput	//Text input for name - maybe it's better to separte it to first name and last name
						style={styles.signUpTextInput}
						//label="Name"
						mode="outlined"
						placeholder={this.state.name}
						theme={{ colors: { primary: 'blue' } }}
						onChangeText={newName => this.setState(() => ({ newName: newName }))}
						value={this.state.newName}
					/>

					<Text style={styles.editProfileLabels}>PHONE NUMBER</Text>
					<TextInput	//Text input 
						style={styles.signUpTextInput}
						//label="Phone Number"
						mode="outlined"
						placeholder={this.state.phoneNumber}
						theme={{ colors: { primary: 'blue' } }}
						onChangeText={newPhoneNumber => this.setState(() => ({ newPhoneNumber: newPhoneNumber }))}
						value={this.state.newPhoneNumber}
					/>
					<View style={styles.viewAndroidOnly}>
						<Text style={{ marginTop: 20, fontSize: 15, marginBottom: -10, color: '#04074d' }}>CONTACT PREFERENCE</Text>
						<RNPickerSelect
							onValueChange={(contactPref) => this.setState({ contactPref: contactPref })}
							placeholder={{ label: "Select a contact preference", value: '' }}
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

					<View style={{	//Styling for Confirm button
						position: (Platform.OS === 'ios') ? "absolute" : "relative",
						bottom: (Platform.OS === 'ios') ? 210 : -30,
						alignSelf: 'center'
					}}>
						<TouchableOpacity	//confirm button for Edit Profile
							style={styles.button}
							onPress={async () => {
								var link = 'http://127.0.0.1:8000/checkin/customer/' + this.props.route.params.receivedUserInfo["id"] + "/";

								let response = await fetch(link, {
									method: 'PUT',
									headers: {
										Accept: 'application/json',
										'Content-Type': 'application/json'
									},
									body: JSON.stringify({
										first_name: this.state.newName,
										phone_num: this.state.newPhoneNumber,
									})
								})



								console.log("Profile edited");
								this.props.navigation.goBack();
								//this.props.navigation.navigate('ConfirmationScreen', { accountType: this.props.route.params.accountType })
							}}	//confirmation splash screen
						>
							<Text style={{ color: '#fafafa', alignSelf: 'center' }}>Save</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}
}

export default EditProfile;