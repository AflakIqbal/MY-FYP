import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Picker,
  Switch,
  Button,
  Modal,
  Alert,
} from 'react-native';
import { baseUrlNode } from '../../shared/baseUrl';
import { Card, Input } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';

class Reservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: 1,
      comments: '',
      token: null,
      vehicle: [],
    };
  }

  componentDidMount = async () => {
    const id = this.props.navigation.getParam('id', '');
    const token1 = await AsyncStorage.getItem('token');
    this.setState({ token: token1 });
    console.log(this.state.token);
    this.getData(id);
  };

  getData = async (id) => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(baseUrlNode + 'api/vehicle/vehicle/' + id, {
      method: 'GET',
      headers: {
        'x-auth-token': token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ vehicle: responseJson });
        console.log(this.state.vehicle);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  static navigationOptions = {
    title: 'Reserve Table',
  };

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleReservation() {
    const id = this.props.navigation.getParam('id', '');
    console.log(id);
    fetch(baseUrlNode + 'api/customer/book/' + id, {
      method: 'POST',
      headers: {
        'x-auth-token': this.state.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        days: this.state.days,
        comments: this.state.comments,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          if (!data.errors) {
          } else {
            data.errors.forEach((error) => alert(error.msg));
          }
        } catch (e) {
          console.log('error hai', e);
        }
      });

    this.toggleModal();
  }

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: '',
      showModal: false,
    });
  }

  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(
      Permissions.USER_FACING_NOTIFICATIONS
    );
    if (permission.status !== 'granted') {
      permission = await Permissions.askAsync(
        Permissions.USER_FACING_NOTIFICATIONS
      );
      if (permission.status !== 'granted') {
        Alert.alert('Permission not granted to show notifications');
      }
    }
    return permission;
  }

  async presentLocalNotification(date) {
    await this.obtainNotificationPermission();
    Notifications.presentLocalNotificationAsync({
      title: 'Your Reservation',
      body: 'Reservation for ' + date + ' requested',
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        vibrate: true,
        color: '#512DA8',
      },
    });
  }

  render() {
    return (
      <ScrollView>
        <Animatable.View animation='zoomIn' duration={3000}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Number of Days</Text>
            <Picker
              style={styles.formItem}
              selectedValue={this.state.days}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ days: itemValue })
              }
            >
              <Picker.Item label='1' value='1' />
              <Picker.Item label='2' value='2' />
              <Picker.Item label='3' value='3' />
              <Picker.Item label='4' value='4' />
              <Picker.Item label='5' value='5' />
              <Picker.Item label='6' value='6' />
              <Picker.Item label='7' value='7' />
            </Picker>
          </View>

          <View>
            <Text style={{ textAlign: 'center', fontSize: 20, margin: 5 }}>
              Leave Comment
            </Text>

            <Input
              style={styles.formItem}
              placeholder='Request or demand?'
              onChangeText={(comments) => this.setState({ comments })}
              value={this.state.comments}
            />
          </View>

          <View style={styles.formRow}>
            <Button
              onPress={() => {
                Alert.alert(
                  'Confirm Booking?',
                  'Number of Days:' +
                    this.state.days +
                    '\n' +
                    'Comments:' +
                    this.state.comments +
                    '\n',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {
                        this.resetForm();
                      },
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        this.handleReservation();
                        //this.presentLocalNotification(this.state.date);
                      },
                    },
                  ],
                  { cancelable: false }
                );
              }}
              title='Reserve'
              color='#512DA8'
              accessibilityLabel='Learn more about this purple button'
            />
          </View>
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={this.state.showModal}
            onDismiss={() => this.toggleModal()}
            onRequestClose={() => this.toggleModal()}
          >
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Your Booking</Text>
              <Text style={styles.modalText}>
                Your Booking Days : {this.state.days}
              </Text>
              <Text style={styles.modalText}>
                Your Request : {this.state.comments}
              </Text>
              <Text style={styles.modalText}>
                Car Model :{' '}
                {this.state.vehicle.manufacturer +
                  ' ' +
                  this.state.vehicle.model}
              </Text>
              <Text style={styles.modalText}>
                Seating Capacity : {this.state.vehicle.seatingCapacity}
              </Text>
              <Text style={styles.modalText}>
                Transmition : {this.state.vehicle.transmission}
              </Text>
              <Text style={styles.modalText}>
                Fare per Day : {this.state.vehicle.fare}
              </Text>

              {/* <Text style={styles.modalText}>
                Smoking?: {this.state.smoking ? 'Yes' : 'No'}
              </Text> */}

              <Button
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
                color='#512DA8'
                title='End Booking'
              />
            </View>
          </Modal>
        </Animatable.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
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
});

export default Reservation;
