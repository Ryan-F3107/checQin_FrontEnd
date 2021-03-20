import React from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import styles from '../../styling/styles';
import signUpDefaultstyleForPicker from '../../styling/signUpDefaultPicker';

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

    render() {
        return (
            <View style={styles.homeContainer}>
                <IconButton
                    style={styles.closeButton}
                    icon="close"
                    size={35}
                    color={'black'}
                    onPress={() => {
                        this.props.navigation.goBack()
                    }}//this.props.navigation.replace("Home") }}
                ></IconButton>

                <View style={styles.checkInContainer}>
                    <Text style={styles.checkInTitle}> Check-in </Text>
                    <TextInput
                        style={styles.signUpTextInput}
                        label="Number of People"
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

                    <View style={styles.viewAndroidOnly}>
                        <Text style={{ marginTop: 5, marginBottom: -10, color: '#04074d' }}>NUMBER OF PEOPLE</Text>
                        <RNPickerSelect
                            onValueChange={(numPeople) => this.setState({ numPeople: numPeople })}
                            placeholder={{ label: "Select a number of people", value: '' }}
                            useNativeAndroidPickerStyle={false}
                            items={[
                                { label: "1", value: '1' },
                                { label: "2", value: '2' },
                                { label: "3", value: '3' },
                                { label: "4", value: '4' },
                                { label: "5", value: '5' },
                                { label: "6", value: '6' }]}
                            style={signUpDefaultstyleForPicker}
                            onClose={() => {
                                if (this.state.numPeople == "") {
                                    this.setState(() => ({ errorNumPeople: "Required" }))
                                } else {
                                    this.setState(() => ({ errorNumPeople: "" }))
                                }
                            }}
                            onOpen={() => {
                                this.setState(() => ({ errorNumPeople: "" }))
                            }}

                        />
                    </View>
                    <Text style={styles.errorMessage}>{this.state.errorNumPeople}</Text>

                    <View style={{ marginTop: 100 }}>
                        <TouchableOpacity
                            style={styles.ViewQRCodebutton}
                            disabled={this.state.numPeople == ""}
                            onPress={() => this.props.navigation.goBack()}

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