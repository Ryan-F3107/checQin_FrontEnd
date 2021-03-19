import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';
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

    // verify that all the required fields are filled in
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

            <View style={styles.container}>
                <Text style={styles.titleBusiness}> Reset Password </Text>

                <TextInput
                    //Require Check from the backend
                    style={styles.resetPasswordTextInput}
                    label="EMAIL"
                    mode="outlined"
                    placeholder="Enter your email"
                    theme={{ colors: { primary: '#04074d' } }}
                    onChangeText={email => this.setState(() => ({ email: email }))}
                    value={this.state.email}
                    onBlur={() => {
                        if (this.state.email == "") {
                            this.setState(() => ({ errorEmail: "Required" }))
                        }
                    }}
                    onFocus={() => {
                        this.setState(() => ({ errorEmail: "" }))
                    }}
                />
                <Text style={styles.errorMessage}>{this.state.errorEmail}</Text>

                <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: 'grey' }}></View>

                <TextInput
                    style={styles.textInputPassword}
                    label="PASSWORD"
                    mode="outlined"
                    placeholder="Enter new password"
                    autoCapitalize='none'
                    secureTextEntry={true}
                    theme={{ colors: { primary: '#04074d' } }}
                    onChangeText={newPassword => this.setState(() => ({ newPassword: newPassword }))}
                    value={this.state.newPassword}
                    onBlur={() => {

                        if (this.state.newPassword == "") {
                            this.setState(() => ({ errorNewPassword: "Required" }))
                        } else if (this.state.newPassword.length < 8) {
                            this.setState(() => ({ errorNewPassword: "Must be at least 8 characters long" }))
                        }
                    }}
                    onFocus={() => {
                        this.setState(() => ({ errorNewPassword: "" }))
                    }}
                />
                <Text style={styles.errorMessage}>{this.state.errorNewPassword}</Text>


                <TextInput
                    style={styles.textInputConfirmPassword}
                    label="CONFIRM PASSWORD"
                    mode="outlined"
                    autoCapitalize='none'
                    secureTextEntry={true}
                    theme={{ colors: { primary: '#04074d' } }}
                    disabled={this.state.newPassword.length < 8}
                    onChangeText={confirmNewPassword => this.setState(() => ({ confirmNewPassword: confirmNewPassword }))}
                    value={this.state.confirmNewPassword}
                    onBlur={() => {

                        if (this.state.confirmNewPassword == "") {
                            this.setState(() => ({ errorConfirmPassword: "Required" }))
                        } else if (this.state.newPassword != this.state.confirmNewPassword) {
                            this.setState(() => ({ errorConfirmNewPassword: "Paswords do not match" }))
                        }
                    }}
                    onFocus={() => {
                        this.setState(() => ({ errorConfirmNewPassword: "" }))
                    }}
                />
                <Text style={styles.errorMessage}>{this.state.errorConfirmNewPassword}</Text>


                <View style={{
                    position: (Platform.OS === 'ios') ? "absolute" : "relative",
                    bottom: (Platform.OS === 'ios') ? 300 : -10,
                    alignSelf: 'center'
                }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            showMessage({
                                message: "Your password was reset successfully!",
                                type: "success",
                                autoHide: true,
                                duration: 700,
                                backgroundColor: "#04074d",
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
                </View>
            </View>

        )
    }
}

export default ResetPassword;