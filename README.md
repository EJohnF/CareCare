## Run locally

Assuming you have already installed node, yarn, xcode, jdk
 
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

- snapshot (currently has a problem - https://github.com/facebook/react-native/issues/29849)

## What more needs to be done
 
