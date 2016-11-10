# dbp-react-native

This is the mobile version of the dbp demo web app

First install all the dependencies (node modules) by executing:

`npm install`

From the project root folder, launch the node server:

`react-native start`

For starting the iOS simulator, execute:

`react-native run-ios`

For Android:

Make sure Android build tools version 23.0.1 are installed.

Check which versions are installed in the Android SDK folder: \android-sdk\build-tools

If version 23.0.1 is missing, then install it from the SDK manager: \android-sdk\tools\android

Then execute the following to install the APK on an external device (by default adb will reverse the ports 8081)

`react-native run-android`

In case of issues with "BatchedBridge", please execute the following command from the project folder "dbp_react_native":

`node node_modules/react-native/local-cli/cli.js bundle --platform android --dev true --reset-cache --entry-file index.android.js --bundle-output ./android/app/build/intermediates/assets/debug/index.android.bundle --assets-dest ./android/app/build/intermediates/res/merged/debug`

