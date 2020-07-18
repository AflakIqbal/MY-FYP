import React from 'react';
import { AsyncStorage } from 'react-native';
import { ActivityIndicator } from 'react-native';

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.removeToken();
  }
  removeToken = async () => {
    await AsyncStorage.removeItem('token').then(() => {
      this.props.navigation.replace('Landing');
    });
  };
  render() {
    return <ActivityIndicator />;
  }
}
