import React from 'react';
import { Text, View, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../styling/styles';


class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        const initalState = {
            //isChecked: false,
            email: '',
            newPassword: '',
            confirmNewPassword: '',
            errorEmail: '',
            errorNewPassword: '',
            errorConfirmNewPassword: ''

        }
        this.state = initalState;
    }

    // Verify that all the required fields are filled in
    checkForm() {
        let decision = false;

        if (this.state.email == "" || this.state.newPassword.length < 8
            || this.state.confirmNewPassword != this.state.newPassword) {
            decision = true
        }
        else {
            decision = false
        }
        return decision

    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flexGrow: 1 }}
            >

                <View style={styles.container}>

                    <Text style={styles.titleBusiness}> Reset Password </Text>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        {/*Email Address*/}
                        <TextInput
                            style={styles.textInput}
                            label="EMAIL"
                            mode="outlined"
                            autoCapitalize='none'
                            placeholder="myemail@domain.com"
                            theme={{ colors: { primary: '#0a0540' } }}
                            onChangeText={email => this.setState(() => ({ email: email }))}
                            value={this.state.email}
                            onBlur={() => { // If the field is left blank, or has an invalid email address, show an error message
                                if (this.state.email == "") {
                                    this.setState(() => ({ errorEmail: "Required" }));
                                } else if (this.state.email.length <= 5 || /@\w+\.\w+/.test(this.state.email) == false) {
                                    this.setState(() => ({ errorEmail: "Invalid" }));
                                }
                            }}
                            onFocus={() => { // When the field is tapped, remove the error message
                                this.setState(() => ({ errorEmail: "" }));
                            }}
                        />
                        <Text style={styles.errorMessage}>{this.state.errorEmail}</Text>

                        <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: 'grey' }}></View>

                        {/*New Password*/}
                        <TextInput
                            style={styles.textInputPassword}
                            label="PASSWORD"
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
                                } else if (this.state.newPassword.length < 8) {
                                    this.setState(() => ({ errorNewPassword: "Must be at least 8 characters long" }));
                                }
                            }}
                            onFocus={() => { // When the field is tapped, remove the error message
                                this.setState(() => ({ errorNewPassword: "" }));
                            }}
                        />
                        <Text style={styles.errorMessage}>{this.state.errorNewPassword}</Text>

                        {/*Re-enter Password*/}
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
                            onBlur={() => { // If the field is left blank or if the password and re-entered password don't match, show an error message 
                                if (this.state.confirmNewPassword == "") {
                                    this.setState(() => ({ errorConfirmPassword: "Required" }));
                                } else if (this.state.newPassword != this.state.confirmNewPassword) {
                                    this.setState(() => ({ errorConfirmNewPassword: "Paswords do not match" }));
                                }
                            }}
                            onFocus={() => { // When the field is tapped, remove the error message
                                this.setState(() => ({ errorConfirmNewPassword: "" }));
                            }}
                        />
                        <Text style={styles.errorMessage}>{this.state.errorConfirmNewPassword}</Text>
                        <View style={{ marginBottom: 10 }} />
                        {/*Button to send?*/}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                showMessage({
                                    message: "Your password was reset successfully!",
                                    type: "success",
                                    autoHide: true,
                                    duration: 700,
                                    backgroundColor: "#0a0540",
                                    description: "Password",
                                    color: "#fafafa",
                                    icon: "success"
                                });

                                this.props.navigation.navigate('Login')
                            }}
                            disabled={this.checkForm()}
                        >
                            <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Confirm</Text>
                        </TouchableOpacity>

                    </ScrollView>


                </View>
            </KeyboardAvoidingView>



        )
    }
}

export default ResetPassword;