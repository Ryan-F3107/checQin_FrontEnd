import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';
import styles from '../styling/styles';

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);
        const initalState = {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            errorEmail: '',
            errorOldPassword: '',
            errorNewPassword: '',
            errorConfirmNewPassword: ''
        }
        this.state = initalState;
    }


    // Verify that all the required fields are filled in
    checkForm() {
        let decision = false;

        if (this.state.newPassword.length < 8 || this.state.confirmNewPassword != this.state.newPassword) {
            decision = true
        }
        else {
            decision = false
        }
        return decision

    }

    render() {
        return (
            <View style={styles.homeContainer}>

                {/*Close Button*/}
                <IconButton
                    style={styles.closeButton}
                    icon="close"
                    size={35}
                    color={'black'}
                    onPress={() => {
                        this.setState(() => ({ oldPassword: '' }));
                        this.setState(() => ({ newPassword: '' }));
                        this.setState(() => ({ confirmNewPassword: '' }));
                        if (this.props.route.params.accountType == "customer") {
                            this.props.navigation.goBack();
                        } else if (this.props.route.params.accountType == "business") {
                            this.props.navigation.goBack();
                        }
                    }}
                ></IconButton>

                <View style={{
                    flex: 1,
                    paddingHorizontal: 70,
                    backgroundColor: '#fafafa'
                }}>
                    <Text style={{
                        fontSize: 30,
                        paddingTop: 10,
                    }}> Change Password </Text>
                    <View style={{ marginTop: 50 }}></View>

                    {/*Current Password. This is to verify whether the user is the right user or not.*/}
                    <TextInput
                        style={styles.textInputPassword}
                        label="CURRENT PASSWORD"
                        mode="outlined"
                        placeholder="Enter current password"
                        autoCapitalize='none'
                        secureTextEntry={true}
                        theme={{ colors: { primary: '#0a0540' } }}
                        onChangeText={oldPassword => this.setState(() => ({ oldPassword: oldPassword }))}
                        value={this.state.oldPassword}
                        onBlur={() => {
                            if (this.state.oldPassword == "") { // If the field is left blank, or has an invalid password, show an error message 
                                this.setState(() => ({ errorOldPassword: "Required" }));
                            } else if (this.state.oldPassword.length < 8) {
                                this.setState(() => ({ errorOldPassword: "Must be at least 8 characters long" }));
                            }
                        }}
                        onFocus={() => { // When the field is tapped, remove the error message
                            this.setState(() => ({ errorOldPassword: "" }))
                        }}
                    />
                    <Text style={styles.errorMessage}>{this.state.errorOldPassword}</Text>

                    {/*New Password. Must be at least 8 characters long*/}
                    <TextInput
                        style={styles.textInputPassword}
                        label="NEW PASSWORD"
                        mode="outlined"
                        placeholder="Enter new password"
                        autoCapitalize='none'
                        secureTextEntry={true}
                        theme={{ colors: { primary: '#0a0540' } }}
                        onChangeText={newPassword => this.setState(() => ({ newPassword: newPassword }))}
                        value={this.state.newPassword}
                        onBlur={() => { // If the field is left blank, or has an invalid password, show an error message 
                            if (this.state.newPassword == "") {
                                this.setState(() => ({ errorNewPassword: "Required" }));
                                this.setState(() => ({ confirmNewPassword: '' }));
                            } else if (this.state.newPassword.length < 8) {
                                this.setState(() => ({ errorNewPassword: "Must be at least 8 characters long" }));
                            }
                        }}
                        onFocus={() => { // When the field is tapped, remove the error message
                            this.setState(() => ({ errorNewPassword: "" }));
                        }}
                    />
                    <Text style={styles.errorMessage}>{this.state.errorNewPassword}</Text>

                    {/*Re-enter the password*/}
                    <TextInput
                        style={styles.textInputConfirmPassword}
                        label="CONFIRM PASSWORD"
                        mode="outlined"
                        autoCapitalize='none'
                        secureTextEntry={true}
                        theme={{ colors: { primary: '#0a0540' } }}
                        disabled={this.state.newPassword.length < 8}
                        onChangeText={confirmNewPassword => this.setState(() => ({ confirmNewPassword: confirmNewPassword }))}
                        value={this.state.confirmNewPassword}
                        onBlur={() => { // If the field is left blank or if the new password & the re-entered password don't match, show an error message 
                            if (this.state.confirmNewPassword == "") {
                                this.setState(() => ({ errorConfirmPassword: "Required" }));
                            } else if (this.state.newPassword != this.state.confirmNewPassword) {
                                this.setState(() => ({ errorConfirmNewPassword: "Paswords do not match" }));
                            }
                        }}
                        onFocus={() => { // When the field is tapped, remove the error message
                            this.setState(() => ({ errorConfirmNewPassword: "" }))
                        }}
                    />
                    <Text style={styles.errorMessage}>{this.state.errorConfirmNewPassword}</Text>

                    {/*Place the button correctly based on the platform*/}
                    <View style={{
                        position: (Platform.OS === 'ios') ? "absolute" : "relative",
                        bottom: (Platform.OS === 'ios') ? 300 : -10,
                        alignSelf: 'center'
                    }}>
                        {/*When the "Confirm" button is clicked, 
                            send the new & confirmed password to the backend, where it sends back a code to notify whether the change was successful or not*/}
                        <TouchableOpacity
                            style={styles.button}
                            disabled={this.checkForm()}
                            onPress={async () => {
                                var link = 'http://127.0.0.1:8000/checkin/change_password/' + this.props.route.params.receivedUserInfo["id"] + "/";
                                let response = await fetch(link, {
                                    method: 'PUT',
                                    headers: {
                                        Authorization: 'Bearer ' + this.props.route.params.receivedUserInfo["access"],
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({

                                        old_password: this.state.oldPassword,
                                        new_password: this.state.confirmNewPassword
                                    })
                                }
                                )
                                response = await response.status;

                                // Password has been successfully changed
                                // Display the flash message at the top
                                if (response == "200") {
                                    showMessage({
                                        message: "Password changed!",
                                        type: "success",
                                        autoHide: true,
                                        duration: 700,
                                        backgroundColor: "345",
                                        color: "#fafafa",
                                        icon: "success"
                                    });
                                    this.setState(() => ({ oldPassword: '' }));
                                    this.setState(() => ({ newPassword: '' }));
                                    this.setState(() => ({ confirmNewPassword: '' }));
                                    this.props.navigation.goBack();
                                } else {
                                    showMessage({
                                        message: "Error: Password could not be changed. Please re-check your current password and try again.",
                                        type: "danger",
                                        autoHide: true,
                                        duration: 2000,
                                        backgroundColor: "#ff504a",
                                        color: "#fafafa",
                                        icon: "danger"
                                    });
                                }
                            }}
                        >

                            <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Confirm</Text>

                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        )
    }
}

export default ChangePassword;