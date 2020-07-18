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

import {
  Input,
  CheckBox,
  Icon,
  Card,
  Button,
  Rating,
} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';
import * as ImageManipulator from 'expo-image-manipulator';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import thunk from 'redux-thunk';

class Ranking1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rankCustomer: 1,
      feedbackCustomer: '',
    };
  }

  componentDidMount = async () => {
    const token1 = await AsyncStorage.getItem('token');
    this.setState({ token: token1 });
  };

  static navigationOptions = {
    title: 'Add New Vehicle',
  };

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleReservation() {
    console.log(JSON.stringify(this.state));
    this.toggleModal();
  }

  resetForm() {
    this.setState({
      rankCustomer: 1,
      feedbackCustomer: '',
    });
  }

  submitRank() {
    console.log('1st');
    const id = this.props.navigation.getParam('id', '');
    console.log(id);
    console.log(this.state.token);
    fetch(baseUrlNode + 'api/owner/rank/' + id, {
      method: 'POST',
      headers: {
        'x-auth-token': this.state.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        feedbackCustomer: this.state.feedbackCustomer,
        rankCustomer: this.state.rankCustomer,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          if (!data.errors) {
            console.log('no error');
          } else {
            data.errors.forEach((error) => alert(error.msg));
          }
        } catch (e) {
          console.log('error hai', e);
        }
      });
  }

  endBooking() {
    console.log('2nd');
    const Vid = this.props.navigation.getParam('Vid', '');
    fetch(baseUrlNode + 'api/customer/end/' + Vid, {
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

  bookingStatus() {
    console.log('3rd');
    const id = this.props.navigation.getParam('id', '');
    fetch(baseUrlNode + 'api/owner/booked/' + id, {
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

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Card>
        <ScrollView>
          <Animatable.View animation='zoomIn' duration={3000}>
            <Text>Ranking & Feedback</Text>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Rank Customer</Text>
              <Rating
                showRating
                startingValue={this.state.rankCustomer}
                imageSize={18}
                style={{ alignItems: 'center', padding: 5 }}
                onFinishRating={(rankCustomer) => {
                  this.setState({ rankCustomer });
                }}
              />
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Feedback about Customer</Text>
              <Input
                style={styles.formItem}
                placeholder='You Comments about Customer'
                onChangeText={(feedbackCustomer) =>
                  this.setState({ feedbackCustomer })
                }
                value={this.state.feedbackCustomer}
              />
            </View>

            <View style={styles.formRow}>
              <Button
                onPress={() => {
                  this.submitRank();
                  this.endBooking();
                  this.bookingStatus();
                  const { navigate } = this.props.navigation;
                  navigate('Bookings');
                }}
                title='Reserve'
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
  formRow1: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
  },
  formLabel1: {
    fontSize: 18,
    flex: 2,
    fontWeight: 'bold',
  },
  formItem1: {
    flex: 1,
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

export default Ranking1;
