import React from 'react';
import { Text, View, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { IconButton, TextInput, Divider } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';
import styles from '../styling/styles';
import { ScrollView } from 'react-native-gesture-handler';
import { serverAddress } from './connectToBackend';

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);
        const initalState = {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',

            errorOldPassword: '',
            errorNewPassword: '',
            errorConfirmNewPassword: ''
        }
        this.state = initalState;
    }


    // Verify that all the required fields are filled in
    checkForm() {
        let decision = false;

        if (this.state.oldPassword == "" || this.state.newPassword.length < 8 || this.state.confirmNewPassword != this.state.newPassword) {
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

                    {/*Close Button*/}
                    <IconButton
                        style={styles.closeButton}
                        icon="close"
                        size={35}
                        color={'black'}
                        onPress={() => {
                            this.setState({ oldPassword: '', newPassword: '', confirmNewPassword: '' });

                            if (this.props.route.params.accountType == "customer") {
                                this.props.navigation.goBack();
                                this.setState({
                                    oldPassword: '',
                                    newPassword: '',
                                    confirmNewPassword: '',
                                    errorOldPassword: '',
                                    errorNewPassword: '',
                                    errorConfirmNewPassword: ''
                                })
                            } else if (this.props.route.params.accountType == "business") {
                                this.props.navigation.goBack();
                            }
                        }}
                    ></IconButton>

                    <Text
                        style={{
                            fontSize: 30,
                            paddingHorizontal: Platform.OS === "ios" ? 70 : 50
                        }}
                    >
                        Change Password
                    </Text>

                    <ScrollView>

                        <View style={{
                            flex: 1,
                            paddingHorizontal: Platform.OS === "ios" ? 70 : 50,
                            backgroundColor: '#fafafa'
                        }}>


                            <View style={{ marginTop: 30 }}
                            />
                            <Text
                                style={{ marginTop: 5, marginBottom: -5 }}
                            > * Please enter your current password {"\n"} to verify your identity.
                            </Text>

                            {/*Current Password. This is to verify whether the user is the right user or not.*/}
                            <TextInput
                                style={styles.textInputPassword}
                                label="CURRENT PASSWORD"
                                mode="outlined"
                                placeholder="Enter current password"
                                autoCapitalize='none'
                                spellCheck={false}
                                secureTextEntry={true}
                                theme={{ colors: { primary: '#0a0540' } }}
                                onChangeText={oldPassword => this.setState({ oldPassword: oldPassword })}
                                value={this.state.oldPassword}
                                onBlur={() => { // If the field is left blank, show an error message 
                                    if (this.state.oldPassword == "") {
                                        this.setState({ errorOldPassword: "Required" });
                                    }
                                }}
                                onFocus={() => { // When the field is tapped, remove the error message
                                    this.setState({ errorOldPassword: "" });
                                }}
                            />
                            <Text style={styles.errorMessage}>{this.state.errorOldPassword}</Text>

                            <Divider style={{ borderBottomWidth: 1.5, borderColor: 'grey', width: 300, alignSelf: 'center', marginTop: 30, marginBottom: 15 }} />

                            {/*New Password. Must be at least 8 characters long*/}
                            <TextInput
                                style={styles.textInputPassword}
                                label="NEW PASSWORD"
                                mode="outlined"
                                placeholder="Enter new password"
                                autoCapitalize='none'
                                secureTextEntry={true}
                                theme={{ colors: { primary: '#0a0540' } }}
                                onChangeText={newPassword => this.setState({ newPassword: newPassword })}
                                value={this.state.newPassword}
                                onBlur={() => { // If the field is left blank, or has an invalid password, show an error message 
                                    if (this.state.newPassword == "") {
                                        this.setState({ errorNewPassword: "Required", confirmNewPassword: '' });
                                    } else if (this.state.newPassword.length < 8) {
                                        this.setState({ errorNewPassword: "Must be at least 8 characters long" });
                                    }
                                }}
                                onFocus={() => { // When the field is tapped, remove the error message
                                    this.setState({ errorNewPassword: "" });
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
                                onChangeText={confirmNewPassword => this.setState({ confirmNewPassword: confirmNewPassword })}
                                value={this.state.confirmNewPassword}
                                onBlur={() => { // If the field is left blank or if the new password & the re-entered password don't match, show an error message 
                                    if (this.state.confirmNewPassword == "") {
                                        this.setState({ errorConfirmPassword: "Required" });
                                    } else if (this.state.newPassword != this.state.confirmNewPassword) {
                                        this.setState({ errorConfirmNewPassword: "Paswords do not match" });
                                    }
                                }}
                                onFocus={() => { // When the field is tapped, remove the error message
                                    this.setState({ errorConfirmNewPassword: "" })
                                }}
                            />
                            <Text style={styles.errorMessage}>{this.state.errorConfirmNewPassword}</Text>

                            {/*Place the button correctly based on the platform*/}
                            <View style={{
                                marginBottom: 50
                            }} />
                            {/*When the "Confirm" button is clicked, 
                            send the new & confirmed password to the backend, where it sends back a code to notify whether the change was successful or not*/}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={async () => {

                                    if (this.checkForm()) {

                                        var link = `${serverAddress}/checkin/change_password/` + this.props.route.params.receivedUserInfo["id"] + "/";

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
                                        if (response == 200) {
                                            showMessage({
                                                message: "Password changed!",
                                                type: "success",
                                                autoHide: true,
                                                duration: 2000,
                                                backgroundColor: "#0a0540",
                                                color: "#fafafa",
                                                icon: "success"
                                            });
                                            this.setState({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
                                            this.props.navigation.goBack();

                                        } else { // Error status code from the backend
                                            showMessage({
                                                message: `Error: Password could not be changed. ${'\n'}${'\n'}Please double-check your current password and try again.`,
                                                type: "danger",
                                                autoHide: true,
                                                duration: 2500,
                                                backgroundColor: "#ff504a",
                                                color: "#fafafa",
                                                icon: "danger"
                                            });
                                        }
                                    } else { // Textfield is incomplete
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

                                <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Confirm</Text>

                            </TouchableOpacity>


                        </View>
                    </ScrollView>
                </View>


            </KeyboardAvoidingView>




        )
    }
}

export default ChangePassword;