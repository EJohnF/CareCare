## Run locally

Assuming you have already installed node, yarn, xcode, jdk
 
Dry run on ios: `yarn run:ios`
Dry run on android: `yarn run:android`

## Library versions

All fixed main dependencies (non-dev), have fixed versions because in rapidly-developed JS/RN world sometimes even minor updates can cause problems, so that updates better to make manually and test to avoid unexpected errors. 

## Navigation

Here `react-navigation` library is used, as it's much simpler solution and kind of "default" approach for new projects on RN.
However, personally, I like `react-native-navigation` where transition between screen is faster and application in general more modular by architecture. However it costs additional workload. 
