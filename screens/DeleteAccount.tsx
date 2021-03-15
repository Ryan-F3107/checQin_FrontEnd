import React, { useState } from 'react';
import styles from '../styling/styles';
import styleMenu from '../styling/optionStyling';
import {Text, View,TouchableOpacity} from 'react-native';
import {IconButton, TextInput, Checkbox} from 'react-native-paper';

const [checkedYesBox, setYesBox] = useState(false);
const [checkedNoBox, setNoBox] = useState(false);

class DeleteAccount extends React.Component{
    constructor(props){
        super(props)
        const initialState = {
            password:'',
        }
        this.state = initialState;
    }
    render(){
        return(
            <View style = {styles.homeContainer}>
                <IconButton	//Adding the exit icon to the top-right corner
                style={styles.closeButton}
                icon="close"
                size={35}
                color={'black'}
                onPress={() => {
                    if (this.props.route.params.accountType == "customer") {
                        this.props.navigation.replace('Home');

                    } else if (this.props.route.params.accountType == "business") {
                        this.props.navigation.replace('HomeBusiness');
                    }
                }}
                ></IconButton>
                <View style = {styleMenu.optionScreen}>
                    <Text style={styleMenu.optionTitle}>
                        Delete Account
                    </Text>
                    <Text>Are you sure that you want to delete your account?</Text>
                    <View style={{ flexDirection: "row", marginBottom: 5 }}>
                        <Checkbox.Android   //Check box for Yes
                            color='#fcba03'
                            status={checkedYesBox ? 'checked' : 'unchecked'}
                            onPress={() => { setYesBox(!checkedYesBox) }}
                        />
                        <Text>Yes</Text>
                    
                        <Checkbox.Android   //CheckBox for No
                            color='#fcba03'
                            status={checkedNoBox ? 'checked' : 'unchecked'}
                            onPress={() => { setNoBox(!checkedNoBox) }}
                        />
                        <Text>No</Text>
                    </View>
                    <Text>Please enter your password to confirm:</Text>
                    <TextInput	//Text input
                        style={styles.signUpTextInput}
                        label="Confirm Password"
                        mode="outlined"
                        theme={{colors:{primary:'blue'}}}
                        onChangeText = {name => this.setState(()=>({name: name}))}
                        value={this.state.password}
                    />
                    <View style={{	//Styling for Confirm button
                        position: (Platform.OS === 'ios') ? "absolute" : "relative",
                        bottom: (Platform.OS === 'ios') ? 210 : -30,
                        alignSelf: 'center'
                    }}>
                        <TouchableOpacity	//confirm button for Edit Profile
                                style={styles.button}
                                onPress={ () => { 
                                        console.log("Profile deleted");
                                        this.props.navigation.navigate('Start') }}
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