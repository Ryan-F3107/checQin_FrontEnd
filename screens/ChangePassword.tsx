import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';
import styles from '../styling/styles';

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);
        const initalState = {
            email: '',
            newPassword: '',
            confirmNewPassword: '',
            errorEmail: '',
            errorNewPassword: '',
            errorConfirmNewPassword: ''
        }
        this.state = initalState;
    }
    render() {
        return (
            <View style={styles.homeContainer}>
                <IconButton
                    style={styles.closeButton}
                    icon="close"
                    size={35}
                    color={'black'}
                    onPress={() => {
                        if (this.props.route.params.accountType == "customer") {
                            this.props.navigation.goBack();
                            //this.props.navigation.replace('Home', { myemail: this.props.route.params.email });

                        } else if (this.props.route.params.accountType == "business") {
                            this.props.navigation.goBack();
                            //this.props.navigation.replace('HomeBusiness');
                        }
                    }}
                ></IconButton>

                <View style={{
                    flex: 1,

                    paddingHorizontal: 70,
                    //paddingLeft: 70,
                    backgroundColor: '#fafafa'
                }}>
                    <Text style={{
                        fontSize: 30,
                        paddingTop: 10,
                    }}> Change Password </Text>
                    <View style={{ marginTop: 50 }}></View>
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
                                //console.log("C: ", this.props.route.params.receivedEmail);
                                /*let response = await fetch('http://127.0.0.1:8000/checkin/business/myemail@example.com/', {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        user: {
                                            password: this.state.confirmNewPassword
                                        }
                                    })



                                    
                                }
                                )*/
                                showMessage({
                                    message: "Password changed!",
                                    type: "success",
                                    autoHide: true,
                                    duration: 700,
                                    backgroundColor: "#04074d",
                                    description: "Password",
                                    color: "#fafafa",
                                    icon: "success"
                                });
                                this.props.navigation.goBack();
                            }}
                        //disabled={this.checkForm()}
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