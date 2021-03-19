import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';
import styles from '../styling/styles';

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);
        //this.getInfo();
        const initalState = {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            errorEmail: '',
            errorOldPW: '',
            errorNewPassword: '',
            errorConfirmNewPassword: ''
        }
        this.state = initalState;
    }


    // verify that all the required fields are filled in
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
                        label="CURRENT PASSWORD"
                        mode="outlined"
                        placeholder="Enter current password"
                        autoCapitalize='none'
                        secureTextEntry={true}
                        theme={{ colors: { primary: '#04074d' } }}
                        onChangeText={oldPassword => this.setState(() => ({ oldPassword: oldPassword }))}
                        value={this.state.oldPassword}
                        onBlur={() => {

                            if (this.state.oldPassword == "") {
                                this.setState(() => ({ errorOldPassword: "Required" }))
                            } else if (this.state.oldPassword.length < 8) {
                                this.setState(() => ({ errorOldPassword: "Must be at least 8 characters long" }))
                            }
                        }}
                        onFocus={() => {
                            this.setState(() => ({ errorOldPassword: "" }))
                        }}
                    />
                    <Text style={styles.errorMessage}>{this.state.errorNewPassword}</Text>

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

                            onPress={async () => {
                                //console.log("C: ", this.props.route.params.receivedEmail);
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
                                //console.log("Authorization: ", 'Bearer ' + this.props.route.params.receivedUserInfo["access"]);
                                //console.log("OLD: ", this.state.oldPassword);
                                response = await response.status;
                                console.log("response ", response);


                                //if successful 200, if not 400

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
                                //this.props.navigation.goBack();
                            }}
                            disabled={this.checkForm()}
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