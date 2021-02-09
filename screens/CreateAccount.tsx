import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

class CreateAccount extends React.Component {

    constructor(props) {
        super(props);
        const initalState = {
            email: '',
            password: '',
            confirmPassword: '',
            errorEmail: '',
            errorPassword: '',
            errorConfirmPassword: '',
        }
        this.state = initalState;
    }

    checkForm() {
        let decision = false;

        if (this.state.email == "" || this.state.password.length < 9
            || this.state.confirmPassword != this.state.password) {
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
                <Text style={styles.title}> Create Account</Text>
                <TextInput
                    style={styles.textInput}
                    label="EMAIL"
                    mode="outlined"
                    autoCapitalize='none'
                    placeholder="myemail@domain.com"
                    theme={{ colors: { primary: 'blue' } }}
                    onChangeText={email => this.setState(() => ({ email: email }))}
                    value={this.state.email}
                    onBlur={() => {

                        if (this.state.email == "") {
                            this.setState(() => ({ errorEmail: "Required" }))
                        } else if (this.state.email.length <= 5 || !this.state.email.includes('@') || !this.state.email.includes('.')) {
                            this.setState(() => ({ errorEmail: "Invalid" }))
                        }
                    }}
                    onFocus={() => {
                        this.setState(() => ({ errorEmail: "" }))
                    }}
                />
                <Text style={{ color: 'red' }}>{this.state.errorEmail}</Text>

                <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: 'grey' }}></View>

                <TextInput
                    style={styles.textInputPassword}
                    label="PASSWORD"
                    mode="outlined"
                    autoCapitalize='none'
                    secureTextEntry={true}
                    theme={{ colors: { primary: 'blue' } }}
                    onChangeText={password => this.setState(() => ({ password: password }))}
                    value={this.state.password}
                    onBlur={() => {

                        if (this.state.password == "") {
                            this.setState(() => ({ errorPassword: "Required" }))
                        } else if (this.state.password.length < 9) {
                            this.setState(() => ({ errorPassword: "Must be at least 8 characters long" }))
                        }
                    }}
                    onFocus={() => {
                        this.setState(() => ({ errorPassword: "" }))
                    }}
                />
                <Text style={{ color: 'red' }}>{this.state.errorPassword}</Text>


                <TextInput
                    style={styles.textInput}
                    label="CONFIRM PASSWORD"
                    mode="outlined"
                    autoCapitalize='none'
                    secureTextEntry={true}
                    theme={{ colors: { primary: 'blue' } }}
                    disabled={this.state.password.length < 9}
                    onChangeText={confirmPassword => this.setState(() => ({ confirmPassword: confirmPassword }))}
                    value={this.state.confirmPassword}
                    onBlur={() => {

                        if (this.state.confirmPassword == "") {
                            this.setState(() => ({ errorConfirmPassword: "Required" }))
                        } else if (this.state.password != this.state.confirmPassword) {
                            this.setState(() => ({ errorConfirmPassword: "Paswords do not match" }))
                        }
                    }}
                    onFocus={() => {
                        this.setState(() => ({ errorConfirmPassword: "" }))
                    }}
                />
                <Text style={{ color: 'red' }}>{this.state.errorConfirmPassword}</Text>


                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { this.props.navigation.navigate('Terms_Conditions') }}
                //disabled={this.checkForm()}
                >
                    <Text style={{ color: 'white', alignSelf: 'center' }}>Next</Text>
                </TouchableOpacity>


            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 70,
        paddingBottom: 20,
        backgroundColor: 'white'
    }, title: {
        fontSize: 30,
        paddingTop: 50,
        paddingBottom: 20,
        marginBottom: 20
    }, labels: {
        fontSize: 15,
        paddingTop: 50,
        paddingBottom: 10,
    },
    textInputPassword: {
        paddingTop: 16,
    },
    textInput: {
        paddingTop: 12,
    }, button: {
        alignSelf: 'center',
        backgroundColor: '#0a0540',
        padding: 15,
        width: 90,
        marginTop: 20,
        marginBottom: 30,
        borderRadius: 25,
        shadowColor: 'rgba(1, 1, 1, 0.25)',
        shadowOpacity: 0.9,
        shadowRadius: 13,
        shadowOffset: { width: 1, height: 10 }
    }
})

export default CreateAccount;