import React from 'react';
import styles from '../../styling/styles';
import styleMenu from '../../styling/optionStyling';
import { View, Text, KeyboardAvoidingView, Alert, Platform } from 'react-native'
import { serverAddress } from '../connectToBackend';
import { IconButton, DataTable, List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import moment from "moment";

class VisitHistory extends React.Component {
    constructor(props) {
        super(props)
        this.getVisitInfo();
        const initialState = {
            dateArray: [],
            businessInfo: [],
            message: ''
        }
        this.state = initialState;
    }

    async getVisitInfo() {

        var link = `${serverAddress}/checkin/visit/`;

        let response = await fetch(link, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.props.route.params.receivedUserInfo["access"]
            },
        })
        response = await response.json();

        // Display the visit history if it only exists
        if (response.length > 0) {
            this.setState({ businessInfo: response })

            // Retrieve all unique dates
            let date = [response[0]["dateTime"].split("T")[0]] // YYYY-MM-DD

            for (let i = 0; i < response.length; i++) {

                if (date.includes(response[i]["dateTime"].split("T")[0]) == false) { // if a unique date is found
                    date.push(response[i]["dateTime"].split("T")[0]) // add it to the list
                }
            }

            // Save it to the array called, dateArray to be used later
            this.setState({ dateArray: date });

        } else { // If this is no visit history simply display this message
            this.setState({ message: "No visit history" });
        }

    };


    // https://momentjscom.readthedocs.io/en/latest/moment/02-get-set/08-iso-weekday/
    // According to the above link, the isoWeekday() function returns an index value 1 - 7. 
    // The array, day, is used to get a text value
    showDay(dayIndex) {
        let day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        return day[dayIndex - 1];
    }

    // For each unique date, get visit history
    getInfo(date) {
        let info = []

        for (let i = 0; i < this.state.businessInfo.length; i++) {
            if (date == this.state.businessInfo[i]["dateTime"].split("T")[0]) { // if the date matches
                info.push(this.state.businessInfo[i]) //add all info
            }
        }
        return info
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={styles.homeContainer}>

                    {/*Close Button*/}
                    <IconButton
                        style={styles.closeButton}
                        icon="close"
                        size={35}
                        color={'black'}
                        onPress={() => {
                            this.setState({ dateArray: [], businessInfo: [] })
                            this.props.navigation.goBack();
                        }}
                    ></IconButton>

                    <View style={styleMenu.optionScreen}>

                        <Text // Title
                            style={styleMenu.optionTitle}>
                            Visit History
                        </Text>

                        <Text //If there is no visit history
                            style={{ color: 'grey', alignSelf: 'center' }}>
                            {this.state.message}
                        </Text>

                        <ScrollView style={{ flex: 1, paddingHorizontal: 30 }}>

                            {/*List dates*/}
                            {this.state.dateArray.map((time) =>
                                <List.Accordion
                                    key={time}
                                    title={this.showDay(moment(time).isoWeekday()) + ", " + time}
                                    theme={{ colors: { primary: '#003585' } }}
                                    style={{ backgroundColor: '#f0f7ff' }}

                                >
                                    {/*Table Headers*/}
                                    <DataTable.Header>
                                        <DataTable.Title
                                            style={{ flex: 1.5 }}
                                            sortDirection='descending'
                                        >Time (24-hr)
                                        </DataTable.Title>

                                        <DataTable.Title
                                            style={{ flex: 1 }}
                                        >Business
                                        </DataTable.Title>

                                        <DataTable.Title ># of People</DataTable.Title>
                                    </DataTable.Header>

                                    {/*List visit history*/}
                                    {this.getInfo(time).map((t) =>

                                        <DataTable
                                            key={t["dateTime"].split("T")[1]}
                                        >
                                            <DataTable.Row>

                                                <DataTable.Cell // Time
                                                    style={{ flex: 1.5 }}
                                                >
                                                    {t["dateTime"].split("T")[1]}
                                                </DataTable.Cell>

                                                <DataTable.Cell //Business Name
                                                    style={{ flex: 1 }}
                                                    onPress={() => { //When the name is clicked, display the full business name, address, and phone number
                                                        Alert.alert(
                                                            t["business_name"],
                                                            "\n\n"
                                                            + "Address: " + t["business_street_address"] + ", "
                                                            + t["business_city"] + ", "
                                                            + t["business_province"] + " "
                                                            + t["business_postal_code"] + "\n" + "\n"
                                                            + "Phone: " + t["business_phone_num"].slice(0, 3) + "-" + t["business_phone_num"].slice(3, 6) + "-" + t["business_phone_num"].slice(6, t["business_phone_num"].length)
                                                        )
                                                    }}
                                                > {t["business_name"]}
                                                </DataTable.Cell>

                                                {/*# of visitors*/}
                                                <DataTable.Cell> {t["numVisitors"]}</DataTable.Cell>

                                            </DataTable.Row>
                                        </DataTable>
                                    )}

                                </List.Accordion>
                            )}
                        </ScrollView>

                    </View>
                </View>
            </KeyboardAvoidingView >
        );
    }
}

export default VisitHistory;