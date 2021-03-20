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

                {/*Close Button*/}
                <IconButton
                    style={styles.closeButton}
                    icon="close"
                    size={35}
                    color={'black'}
                    onPress={() => {
                        this.props.navigation.goBack()
                    }}
                ></IconButton>


                <View style={styles.checkInContainer}>
                    <Text style={styles.checkInTitle}> Check-in </Text>

                    {/*Select the number of people who came with the customer. 
                      At most 6 people, including the customer is allowed*/}
                    <View style={styles.viewAndroidOnly}>
                        <Text style={{ marginTop: 5, marginBottom: -5, color: '#04074d' }}>NUMBER OF PEOPLE</Text>
                        <Text style={{ marginTop: 5, marginBottom: -8, color: '#04074d', fontSize: 11 }}>including yourself</Text>
                        <RNPickerSelect
                            onValueChange={(numPeople) => this.setState({ numPeople: numPeople })}
                            placeholder={{ label: "Select the number", value: '' }}
                            useNativeAndroidPickerStyle={false}
                            items={[
                                { label: "1", value: '1' },
                                { label: "2", value: '2' },
                                { label: "3", value: '3' },
                                { label: "4", value: '4' },
                                { label: "5", value: '5' },
                                { label: "6", value: '6' }]}
                            style={signUpDefaultstyleForPicker}
                            onClose={() => { // If the field is left blank, show an error message 
                                if (this.state.numPeople == "") {
                                    this.setState(() => ({ errorNumPeople: "Required" }));
                                } else {
                                    this.setState(() => ({ errorNumPeople: "" }));
                                }
                            }}
                            onOpen={() => { // When the field is tapped, remove the error message
                                this.setState(() => ({ errorNumPeople: "" }));
                            }}

                        />
                    </View>
                    <Text style={styles.errorMessage}>{this.state.errorNumPeople}</Text>

                    <View style={{ marginTop: 100 }}>
                        {/* Scan QR Code button*/}
                        <TouchableOpacity
                            style={styles.ViewQRCodebutton}
                            disabled={this.state.numPeople == ""}
                            onPress={() => this.props.navigation.goBack()}
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