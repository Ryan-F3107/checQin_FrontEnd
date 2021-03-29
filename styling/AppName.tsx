import React from 'react';

// Since we display our app name in various screens, the app name can be simply edited here.
// The change will be applied to all the screens displaying the app name

export default class AppName extends React.Component {
    static appName() {
        return "checQIn"; // Can edit the name here
    }
}