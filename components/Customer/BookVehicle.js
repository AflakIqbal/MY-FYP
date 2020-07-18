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
import { Card, Input, Rating } from 'react-native-elements';
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
      booking: [],
      showModal: false,
      showModal1: false,
      showModal2: false,
    };
  }

  componentDidMount = async () => {
    const id = this.props.navigation.getParam('id', '');
    const token1 = await AsyncStorage.getItem('token');
    this.setState({ token: token1 });
    console.log(this.state.token);
    this.getData();
    this.listener = this.props.navigation.addListener('didFocus', this.getData);
  };

  componentWillUnmount() {
    this.listener.remove();
  }

  getData = async () => {
    const id = this.props.navigation.getParam('id', '');
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
    title: 'Book Vehicle',
  };

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  toggleModal1() {
    this.setState({ showModal1: !this.state.showModal1 });
  }
  toggleModal2() {
    this.setState({ showModal2: !this.state.showModal2 });
  }

  ranking() {
    const { navigate } = this.props.navigation;
    navigate('feedback', {
      id: this.state.booking._id,
      Vid: this.state.vehicle._id,
    });
  }

  submitRank() {
    console.log('1st');
    const id = this.state.booking._id;
    fetch(baseUrlNode + 'api/customer/rank/' + id, {
      method: 'POST',
      headers: {
        'x-auth-token': this.state.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        feedbackOwner: this.state.feedbackOwner,
        feedbackVehicle: this.state.feedbackVehicle,
        rankOwner: this.state.rankOwner,
        rankVehicle: this.state.rankVehicle,
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
  }

  bookingStatus() {
    console.log('3rd');
    const id = this.state.booking._id;
    fetch(baseUrlNode + 'api/customer/booked/' + id, {
      method: 'POST',
      headers: {
        'x-auth-token': this.state.token,
      },
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
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ booking: responseJson });
        console.log(this.state.booking);
      })
      .catch((error) => {
        console.error(error);
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
      title: 'Your Booking',
      body:
        'Booking done for ' +
        this.state.vehicle.manufacturer +
        ' ' +
        this.state.vehicle.model +
        ' requested',
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
              title=' Book '
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
                  this.toggleModal1();
                  this.toggleModal();
                  this.resetForm();
                }}
                color='#512DA8'
                title='End Booking'
              />
            </View>
          </Modal>

          <Modal
            animationType={'slide'}
            transparent={false}
            visible={this.state.showModal1}
            onDismiss={() => this.toggleModal1()}
            onRequestClose={() => this.toggleModal1()}
          >
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Pay Your Owner</Text>
              <Text style={styles.modalText1}>
                Rupees : {this.state.vehicle.fare * this.state.booking.days}
              </Text>

              <Button
                onPress={() => {
                  this.toggleModal2();
                  this.toggleModal1();
                }}
                color='#512DA8'
                title='Done'
              />
            </View>
          </Modal>

          <Modal
            animationType={'slide'}
            transparent={false}
            visible={this.state.showModal2}
            onDismiss={() => this.toggleModal2()}
            onRequestClose={() => this.toggleModal2()}
          >
            <View style={styles.modal}>
              <Animatable.View animation='zoomIn' duration={3000}>
                <Text style={styles.modalTitle}>Ranking & Feedback</Text>
                <View style={styles.formrow1}>
                  <Text style={styles.formLabel1}>Rank Vehicle</Text>
                  <Rating
                    showRating
                    startingValue={1}
                    imageSize={18}
                    style={{ alignItems: 'center', padding: 5 }}
                    onFinishRating={(rankVehicle) => {
                      this.setState({ rankVehicle });
                    }}
                  />
                </View>

                <View style={styles.formrow1}>
                  <Text style={styles.formLabel1}>Feedback about Vehicle</Text>
                  <Input
                    style={styles.formItem}
                    placeholder='Write Feedback'
                    onChangeText={(feedbackVehicle) =>
                      this.setState({ feedbackVehicle })
                    }
                    value={this.state.feedbackVehicle}
                  />
                </View>

                <View style={styles.formrow1}>
                  <Text style={styles.formLabel1}>Rank Owner</Text>
                  <Rating
                    showRating
                    startingValue={1}
                    imageSize={18}
                    style={{ alignItems: 'center', padding: 5 }}
                    onFinishRating={(rankOwner) => {
                      this.setState({ rankOwner });
                    }}
                  />
                </View>

                <View style={styles.formrow1}>
                  <Text style={styles.formLabel1}>Feedback about Owner</Text>
                  <Input
                    style={styles.formItem}
                    placeholder='Write Feedback'
                    onChangeText={(feedbackOwner) =>
                      this.setState({ feedbackOwner })
                    }
                    value={this.state.feedbackOwner}
                  />
                </View>

                <View style={styles.formrow1}>
                  <Button
                    onPress={() => {
                      this.submitRank();
                      this.bookingStatus();
                      this.toggleModal2();

                      //this.endBooking();
                      const { navigate } = this.props.navigation;
                      navigate('RentVehicle');
                    }}
                    title='Submit'
                    color='#512DA8'
                    accessibilityLabel='Learn more about this purple button'
                  />
                </View>
              </Animatable.View>
            </View>
          </Modal>
        </Animatable.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formrow1: {
    margin: 5,
  },
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

  formLabel1: {
    fontSize: 18,
    //flex: 1.5,
    fontWeight: 'bold',
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
  modalText1: {
    fontSize: 25,
    margin: 10,
    textAlign: 'center',
    margin: 20,
    fontWeight: 'bold',
  },
});

export default Reservation;
