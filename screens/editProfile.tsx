import React from 'react';
import styles from '../styling/styles';
import styleMenu from '../styling/optionStyling';
import {View, Text, TouchableOpacity} from 'react-native'
import { TextInput,IconButton } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import signUpDefaultstyleForPicker from '../styling/signUpDefaultPicker';

class EditProfile extends React.Component{
    constructor(props){
        super(props)
        const initialState = {
            email:'',
            name:'',
            phoneNumber:'',
            contactPref:'',
			errorPref: ''
        }	//end of initial state
        this.state = initialState;
    }
    render(){
        return(
            <View style = {styles.homeContainer}>
                <IconButton	//Adding the exit icon to the top-right corner
                    style={styles.closeButton}
                    icon="close"
                    size={35}
                    color={'black'}
                    onPress={() => {
                        if (this.props.route.params.accountType == "customer") {
                            this.props.navigation.replace('Home');

                        } else if (this.props.route.params.accountType == "business") {
                            this.props.navigation.replace('HomeBusiness');
                        }
                    }}
                ></IconButton>
                <View style = {styleMenu.optionScreen}>
									<Text style={styleMenu.optionTitle}>
											Edit Profile
									</Text>
									<TextInput	//Text Input for email
											style={styles.signUpTextInput}
											label="Email"
											mode="outlined"
											theme={{colors:{primary:'blue'}}}
											onChangeText = {email => this.setState(()=>({email: email}))}
											value={this.state.email}
									/>
									<TextInput	//Text input for name
											style={styles.signUpTextInput}
											label="Name"
											mode="outlined"
											theme={{colors:{primary:'blue'}}}
											onChangeText = {name => this.setState(()=>({name: name}))}
											value={this.state.name}
									/>
									<TextInput	//Text input
											style={styles.signUpTextInput}
											label="Phone Number"
											mode="outlined"
											theme={{colors:{primary:'blue'}}}
											onChangeText = {name => this.setState(()=>({name: name}))}
											value={this.state.phoneNumber}
									/>
									<View style={styles.viewAndroidOnly}>
									<Text style={{ marginTop: 5, marginBottom: -10, color: '#04074d' }}>CONTACT PREFERENCE</Text>
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
												onPress={ () => { 
														console.log("Profile edited");
														this.props.navigation.navigate('ConfirmationScreen', { accountType: this.props.route.params.accountType }) }}	//confirmation splash screen
										>
												<Text style={{ color: '#fafafa', alignSelf: 'center' }}>Confirm</Text>
										</TouchableOpacity>
									</View>
                </View>      
            </View>
        )
    }
}

export default EditProfile;