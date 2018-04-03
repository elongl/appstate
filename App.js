import React, { Component } from 'react'
import { AppState, Text, View, Alert, Button } from 'react-native'
import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAF9XR-2viFcLaTu258MlV0-qHCBBUT444',
  authDomain: 'app-state.firebaseapp.com',
  databaseURL: 'https://app-state.firebaseio.com',
  projectId: 'app-state',
  storageBucket: 'app-state.appspot.com',
  messagingSenderId: '465240094246'
}
firebase.initializeApp(config)
export default class App extends Component {
  state = { appState: AppState.currentState }

  componentDidMount() {
    AppState.addEventListener('change', this.writeAppState)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.writeAppState)
  }

  writeAppState = appState => {
    this.setState({ appState })
    firebase
      .database()
      .ref('appState')
      .set(appState)
  }

  alerter() {
    console.log(this)
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 100 }}>{this.state.appState}</Text>
        <Button onPress={this.alerter} title="Hello" />
      </View>
    )
  }
}
