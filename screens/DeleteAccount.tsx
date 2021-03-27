import React from 'react';
import styles from '../styling/styles';
import styleMenu from '../styling/optionStyling';
import { Text, View, TouchableOpacity } from 'react-native';
import { IconButton, TextInput, Checkbox, Divider } from 'react-native-paper';
import { HOST_ADDRESS } from './connectToBackend';
import { showMessage } from 'react-native-flash-message';

class DeleteAccount extends React.Component {

    constructor(props) {
        super(props)
        const initialState = {
            password: '',
            errorPassword: '',
            isChecked: false
        }

        this.state = initialState;
    }

    // Verify that all the required fields are filled in
    checkForm() {
        let decision = false;

        if (!this.state.isChecked) {
            decision = false;
        } else if (this.state.isChecked && this.state.password == '') {
            decision = false;
        } else {
            decision = true;
        }
        return decision;

    }

    render() {
        return (

            <View style={styles.homeContainer}>
                <IconButton	//Adding the exit icon to the top-right corner
                    style={styles.closeButton}
                    icon="close"
                    size={35}
                    color={'black'}
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}
                ></IconButton>
                <View style={styleMenu.optionScreen}>
                    <Text style={styleMenu.optionTitle}>
                        Delete Account
                    </Text>
                    <View style={{ paddingHorizontal: 40 }}>
                        {/*Check box. Whether a customer has an account with checQin or not*/}
                        <View style={styles.checkDeleteAcct}>
                            <Checkbox.Android
                                value={this.state.isChecked}
                                color='#fcba03'
                                status={this.state.isChecked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    this.setState({ isChecked: !this.state.isChecked }),
                                        this.setState({ errorPassword: "" })
                                }}
                                onPressOut={() => this.setState({ errorPassword: "" })}
                            />
                            <Text style={styles.checkInCustomerText}> Are you sure that you want to delete {'\n'}your account? </Text>
                        </View>

                        <Divider style={{ borderBottomWidth: 1.5, borderColor: 'grey', width: 350, alignSelf: 'center', marginTop: 20, marginBottom: 30 }} />

                        {/*Password*/}
                        <Text>Please enter your password to confirm</Text>
                        <TextInput	//Text input for confirm password
                            style={styles.signUpTextInput}
                            label="CONFIRM PASSWORD"
                            mode="outlined"
                            autoCapitalize="none"
                            disabled={this.state.isChecked == false}
                            spellCheck={false}
                            secureTextEntry={true}
                            theme={{ colors: { primary: '#0a0540' } }}
                            onChangeText={password => this.setState(({ password: password }))}
                            value={this.state.password}
                            onBlur={() => {
                                if (this.state.isChecked != false) {
                                    if (this.state.password == "") {
                                        this.setState(({ errorPassword: "Required" }));
                                    }
                                }
                            }}
                            onFocus={() => { // When the field is tapped, remove the error message
                                this.setState(({ errorPassword: "" }));
                            }}
                        />
                        <Text style={styles.errorMessage}>{this.state.errorPassword}</Text>

                        <View style={{	//Styling for Confirm button
                            marginBottom: 100,
                            alignSelf: 'center'
                        }} />
                        <TouchableOpacity	//confirm button for Delete Account
                            style={styles.button}
                            onPress={async () => {

                                if (this.checkForm()) { // If the form is valid, try to delete the user by sending a request to the backend
                                    //The default link goes to the customer delete account in the backend
                                    var link = `${HOST_ADDRESS}/checkin/customer/` + this.props.route.params.receivedUserInfo["id"] + "/";

                                    //If the account type is business, go to the business delete account in the backend
                                    if (this.props.route.params.accountType == "business") {
                                        link = `${HOST_ADDRESS}/checkin/business/` + this.props.route.params.receivedUserInfo["id"] + "/";
                                    }

                                    let response = await fetch(link, {
                                        method: 'DELETE',
                                        headers: {
                                            Authorization: 'Bearer ' + this.props.route.params.receivedUserInfo["access"],
                                            Accept: 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            password: this.state.password
                                        })
                                    })

                                    var responseCode = await response.status; // response code

                                    if (responseCode == 200) { // Success
                                        showMessage({
                                            message: "Account Deleted!",
                                            type: "success",
                                            autoHide: true,
                                            duration: 2000,
                                            backgroundColor: "#0a0540",
                                            color: "#fafafa",
                                            icon: "success"
                                        });
                                        this.props.navigation.popToTop();

                                    } else { //Error
                                        showMessage({
                                            message: `Error: Account delete failed. ${'\n'}${'\n'}Please try again.`,
                                            type: "danger",
                                            autoHide: true,
                                            duration: 2500,
                                            backgroundColor: "#ff504a",
                                            color: "#fafafa",
                                            icon: "danger"
                                        });
                                    }
                                } else { // this.checkForm() == false
                                    showMessage({
                                        message: `Error: Invalid. ${'\n'}${'\n'}Please enter your current password.`,
                                        type: "danger",
                                        autoHide: true,
                                        duration: 2500,
                                        backgroundColor: "#ff504a",
                                        color: "#fafafa",
                                        icon: "danger"
                                    });
                                }
                            }
                            }
                        >
                            <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
export default DeleteAccount;