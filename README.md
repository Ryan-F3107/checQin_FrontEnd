# CISC498_FrontEnd
:helicopter: React Native has been setup with TypeScript using expo-cli

## API Used :octocat:
[TBA]

## To run on localhost and start Expo:
```
1. clone repo
2. cd into dir

- Node.js would need to be installed ( & npm is required ), can confirm by running node -v.

3. cmd prompt: npm install
4. cmd prompt: expo start

- QR code for android will be made visible(to run on physical device) & webpage will open up providing options to run on android/ios simulator, web page or on anroid/ios phyical device.
" Additional config might be required to run on simulator or phyical devices
```

## To test our app on Expo Go while running the backend locally:
```
*Requirements: Django, Python, Expo
•    IMPORTANT: Need to turn off Firewall in order to use CONNECTION = LAN

Installing Expo CLI: https://docs.expo.io/get-started/installation/

1.  Download Expo Go on your phone
2.  Clone both the Frontend and Backend repositories (make sure it’s up to date!)
3.  Open the Command Prompt/ Terminal
4.  cd to the Frontend dir and run “ npm install ” to install all modules needed 
5.  cd to the Frontend dir --> cd to the “screens” dir --> find the “connectToBackend.js” file

6.  Open the “connectToBackend.js” file:
    - Assign your computer IP to the "ip_address" variable
    - e.g. ip_address = “127.0.0.1” , if your IP address is 127.0.0.1.
    Save the file 

7.  cd to the Backend dir --> <make migrations stuff>, if needed
8.  cd to the Backend dir --> cd to the “backend” dir --> cd to the “backend” dir --> find the “settings.py” file
9.  Open the “settings.py” file:
    - “ALLOWED_HOSTS = []”
        - put your computer IP address as a string '<ip_address>'
        - e.g. ALLOWED_HOSTS = [‘127.0.0.1’], if your IP address is 127.0.0.1.
        Save the file 

10. Start the backend server: “ python manage.py runserver 0.0.0.0:8000 "
11. Start the frontend: " expo start "
12. Once Expo launches in a browser, double check CONNECTION = LAN
13. Open Expo Go on your phone --> Scan a QR code 
14. Start testing!

•    IMPORTANT: Before you push anything to GitHub:
        o Delete your IP address from ALLOWED_HOSTS = [] in “settings.py”
        o Delete your IP address from ip_address = “” in “connectToBackend.js”

•    To end the Frontend and Backend:
    o Control-c

For more info about using the Expo app with a backend:
https://dev.to/katkelly/running-your-react-native-expo-app-on-a-device-with-local-backend-k8l

```


### Resources
 - https://reactnative.dev/docs/environment-setup 

### Packages used 
* for more information, please refer to package.json & package-lock.json

#### react-native-navigation
##### https://reactnative.dev/docs/navigation

#### react-native-paper
##### https://callstack.github.io/react-native-paper/getting-started.html

####  react-native-picker-select 
###### https://www.npmjs.com/package/react-native-picker-select

#### react-native-flash-message
###### https://www.npmjs.com/package/react-native-flash-message

#### react-native-qrcode-svg
###### https://www.npmjs.com/package/react-native-qrcode-svg

#### react-navigation-drawer
##### https://reactnavigation.org/docs/drawer-based-navigation/

#### expo-file-system
###### https://www.npmjs.com/package/expo-file-system

#### expo-media-library
###### https://docs.expo.io/versions/latest/sdk/media-library/

#### expo-permissions
###### https://docs.expo.io/versions/latest/sdk/permissions/

#### expo-print
###### https://docs.expo.io/versions/latest/sdk/print/

#### expo-sharing
###### https://docs.expo.io/versions/latest/sdk/sharing/

#### moment.js
##### https://momentjs.com/
