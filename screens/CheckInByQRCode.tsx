import React from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import styles from '../styling/styles';

class CheckInByQRCode extends React.Component {
    constructor(props) {
        super(props);
        const initalState = {
            numPeople: '',
            num: 0,
            errorNumPeople: ''

        }
        this.state = initalState;
    }

    numUp() {
        this.setState({ num: this.state.num + 1 })
    }

    numDown() {
        if (this.state.num != 0) {
            this.setState({ num: this.state.num - 1 })
        }
    }

    render() {
        return (
            <View style={styles.homeContainer}>
                <IconButton
                    style={styles.closeButton}
                    icon="close"
                    size={35}
                    color={'black'}
                    onPress={() => { this.props.navigation.replace("Home") }}
                ></IconButton>

                <View style={styles.checkInContainer}>
                    <Text style={styles.checkInTitle}> Check-in </Text>
                    <TextInput
                        style={styles.signUpTextInput}
                        label="Number of People In Party"
                        mode="outlined"
                        theme={{ colors: { primary: 'blue' } }}
                        placeholder="0"
                        keyboardType="number-pad"
                        onChangeText={(numPeople) => this.setState({ numPeople: numPeople.replace(/[a-zA-z!@#$%^&*()_=+;.,><?/'|-]/gi, '') })}
                        value={this.state.numPeople}
                        onBlur={() => {
                            if (this.state.numPeople == "") {
                                this.setState(() => ({ errorNumPeople: "Required" }))
                            }
                        }}
                        onFocus={() => {
                            this.setState(() => ({ errorNumPeople: "" }))
                        }}
                    />
                    <Text style={{ color: 'red' }}>{this.state.errorNumPeople}</Text>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <TouchableOpacity
                            style={styles.NumIncButton}
                            onPress={() => this.numDown()} >
                            <Text style={{ color: "white", alignSelf: "center" }}>-</Text>
                        </TouchableOpacity>
                        <Text style={{ marginTop: 10 }}>{this.state.num}</Text>
                        <TouchableOpacity
                            style={styles.NumIncButton}
                            onPress={() => this.numUp()} >
                            <Text style={{ color: "white", alignSelf: "center" }}>+</Text>
                        </TouchableOpacity>



                    </View>

                    <View style={{ marginTop: 100 }}>
                        <TouchableOpacity
                            style={styles.ViewQRCodebutton}
                            onPress={() => this.props.navigation.replace("Home")}
                            disabled={this.state.numPeople == ""}
                        /*{
                            Alert.alert("Checked In!", "",
                                [{
                                    text: "Dismiss"
                                }
                                ]);
                        }*/
                        //disabled={this.checkForm()}
                        >
                            <Text style={{ color: '#fafafa', alignSelf: 'center' }}> Scan QR Code</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View >
        )
    }
}

export default CheckInByQRCode;