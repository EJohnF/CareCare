## Run locally

Assuming you have already installed node, yarn, xcode, jdk 

if you experience build problem for android which says that SDK is not found, one possible way to fix it - add android/local.properties file with path to SDK 
 
Dry run on ios: `yarn run:ios`
Dry run on android: `yarn run:android`

## Library versions

All fixed main dependencies (non-dev), have fixed versions because in rapidly-developed JS/RN world sometimes even minor updates can cause problems, so that updates better to make manually and test to avoid unexpected errors. 

## Navigation

Personally, I like `react-native-navigation` where transition between screen is faster and application in general more modular by architecture. 
However it costs additional workload. 

## Architecture

For such a small app it's definitely over-engineered. But I think it always good to build the architecture with future perspective, keeping in mind how to expand it and support.
There are normally also components folder under src for shared component. However in this case there was nothing to share. 

## Tests

- basics snapshot for screen components
- basics unit jest tests for actions

## What more needs to be done

- Finish coverage of tests (for reducers and rest actions)
- Add translations (currently strings hard-coded, library should be use to make it configurable and easy to translate)
- Persist can be added to low internet load
- improve styles (for Details screen for sure)
- Add more filters ( core side is ready, need to add UI)
 
