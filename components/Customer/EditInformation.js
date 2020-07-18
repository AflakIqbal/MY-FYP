import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Picker,
  Switch,
  Modal,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import { AsyncStorage } from 'react-native';
import { baseUrlNode } from '../../shared/baseUrl';

import { Input, CheckBox, Icon, Card, Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';
import * as ImageManipulator from 'expo-image-manipulator';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

class handleEditInfo1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      cellPhone: '',
      address: '',
      city: '',
    };
  }

  componentDidMount = async () => {
    const token1 = await AsyncStorage.getItem('token');
    this.setState({ token: token1 });
    const customer = this.props.navigation.getParam('customer', '');
    this.setState({
      name: customer.name,
      cellPhone: customer.cellPhone,
      city: customer.city,
      address: customer.address,
      email: customer.email,
    });
  };

  static navigationOptions = {
    title: 'Edit Information',
  };
  resetForm() {
    this.setState({
      name: '',
      email: '',
      cellPhone: '',
      address: '',
      city: '',
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Card>
        <ScrollView>
          <Animatable.View animation='zoomIn' duration={3000}>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Name</Text>

              <Input
                style={styles.formItem}
                placeholder='this.state.name'
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Email</Text>

              <Input
                style={styles.formItem}
                placeholder='City, Civic etc'
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>City</Text>

              <Input
                style={styles.formItem}
                placeholder='2013 etc'
                onChangeText={(city) => this.setState({ city })}
                value={this.state.city}
              />
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Contact</Text>

              <Input
                style={styles.formItem}
                placeholder='300 etc'
                onChangeText={(cellPhone) => this.setState({ cellPhone })}
                value={this.state.cellPhone}
              />
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Address</Text>

              <Input
                style={styles.formItem}
                placeholder='300 etc'
                onChangeText={(address) => this.setState({ address })}
                value={this.state.address}
              />
            </View>

            <View style={styles.formRow}>
              <Button
                onPress={() => {
                  fetch(baseUrlNode + 'api/customer/update', {
                    method: 'PUT',
                    headers: {
                      'x-auth-token': this.state.token,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: this.state.name,
                      cellPhone: this.state.cellPhone,
                      city: this.state.city,
                      email: this.state.email,
                      address: this.state.address,
                    }),
                  })
                    .then((res) => res.json())
                    .then(async (data) => {
                      try {
                        if (!data.errors) {
                          Alert.alert('Information Edited Successfully');
                        } else {
                          data.errors.forEach((error) => alert(error.msg));
                        }
                      } catch (e) {
                        console.log('error hai', e);
                      }
                    });
                  navigate('UserProfileView');
                }}
                title='Submit'
                color='#512DA8'
                accessibilityLabel='Learn more about this purple button'
              />
            </View>
          </Animatable.View>
        </ScrollView>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    //alignItems: 'center',
    //justifyContent: 'center',
    //flex: 1,
    //flexDirection: 'row',
    margin: 5,
  },
  formLabel: {
    fontSize: 18,
    //flex: 1.5,
    fontWeight: 'bold',
  },
  formItem: {
    // flex: 1,
    // justifyContent: 'flex-start',
  },
  modal: {
    justifyContent: 'center',
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
  camera: {
    backgroundColor: null,
    color: 'blue',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    margin: 20,
  },
  image: {
    margin: 10,
    width: 80,
    height: 60,
  },
});

export default handleEditInfo1;
