import React, { useState } from 'react';
import styles from '../styling/styles';
import styleMenu from '../styling/optionStyling';
import { Text, View, TouchableOpacity } from 'react-native';
import { IconButton, TextInput, Checkbox } from 'react-native-paper';
import { HOST_ADDRESS } from './connectToBackend';

//useState() needs to be invoked within class or function

class DeleteAccount extends React.Component {
    // const [checkedYesBox, setYesBox] = useState(false);
    // const [checkedNoBox, setNoBox] = useState(false);

    constructor(props) {
        super(props)
        const initialState = {
            password: '',
            errorPassword: ''
            // checkedNoBox:useState(false),
            // setNoBox:useState(false),
            // checkedYesBox:useState(false),
            // setYesBox:useState(false)
        }

        this.state = initialState;
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
                        this.props.navigation.goBack()
                    }}
                ></IconButton>
                <View style={styleMenu.optionScreen}>
                    <Text style={styleMenu.optionTitle}>
                        Delete Account
                    </Text>
                    <Text>Are you sure that you want to delete your account?</Text>
                    {/* <View style={{ flexDirection: "row", marginBottom: 5 }}> // I keep getting invalid Hook call for useState()
                        <Checkbox.Android   //Check box for Yes
                            color='#fcba03'
                            status={this.state.checkedYesBox ? 'checked' : 'unchecked'}
                            onPress={() => { this.state.setYesBox(!this.state.checkedYesBox) }}
                        />
                        <Text>Yes</Text>
                    
                        <Checkbox.Android   //CheckBox for No
                            color='#fcba03'
                            status={checkedNoBox ? 'checked' : 'unchecked'}
                            onPress={() => { this.state.setNoBox(!this.state.checkedNoBox) }}
                        />
                        <Text>No</Text>
                    </View> */}
                    <Text>Please enter your password to confirm:</Text>
                    <TextInput	//Text input for confirm password
                        style={styles.signUpTextInput}
                        label="CONFIRM PASSWORD"
                        mode="outlined"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        theme={{ colors: { primary: '#0a0540' } }}
                        onChangeText={password => this.setState(() => ({ password: password }))}
                        value={this.state.password}
                        onBlur={() => {
                            if (this.state.password == "") {
                                this.setState(() => ({ errorPassword: "Required" }));
                            }
                        }}
                        onFocus={() => { // When the field is tapped, remove the error message
                            this.setState(() => ({ errorPassword: "" }));
                        }}
                    />
                    <Text style={styles.errorMessage}>{this.state.errorPassword}</Text>
                    <View style={{	//Styling for Confirm button
                        position: (Platform.OS === 'ios') ? "absolute" : "relative",
                        bottom: (Platform.OS === 'ios') ? 210 : -30,
                        alignSelf: 'center'
                    }}>
                        <TouchableOpacity	//confirm button for Edit Profile
                            style={styles.button}
                            onPress={async () => {
                                var link = `${HOST_ADDRESS}/checkin/customer/` + this.props.route.params.receivedUserInfo["id"] + "/";
                                let response = await fetch(link, {
                                    method: 'DELETE',
                                    headers: {
                                        Authorization: 'Bearer ' + this.props.route.params.receivedUserInfo["access"],
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                })
                                var responseCode = await response.status;






                                console.log("Profile deleted");
                                this.props.navigation.navigate('Start')
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
export default DeleteAccount;