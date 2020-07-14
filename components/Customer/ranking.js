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

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rankVehicle: 1,
      rankOwner: 1,
      feedbackOwner: '',
      feedbackVehicle: '',
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
      rankVehicle: 0,
      rankOwner: 0,
      feedbackOwner: '',
      feedbackVehicle: '',
    });
  }

  submitRank() {
    console.log('1st');
    const id = this.props.navigation.getParam('id', '');
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

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Card>
        <ScrollView>
          <Animatable.View animation='zoomIn' duration={3000}>
            <Text>Ranking & Feedback</Text>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Rank Vehicle</Text>
              <Rating
                showRating
                startingValue={this.state.rankVehicle}
                imageSize={18}
                style={{ alignItems: 'center', padding: 5 }}
                onFinishRating={(rankVehicle) => {
                  this.setState({ rankVehicle });
                }}
              />
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Feedback about Vehicle</Text>
              <Input
                style={styles.formItem}
                placeholder='Honda, Toyota etc'
                onChangeText={(feedbackVehicle) =>
                  this.setState({ feedbackVehicle })
                }
                value={this.state.feedbackVehicle}
              />
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Rank Owner</Text>
              <Rating
                showRating
                startingValue={this.state.rankOwner}
                imageSize={18}
                style={{ alignItems: 'center', padding: 5 }}
                onFinishRating={(rankOwner) => {
                  this.setState({ rankOwner });
                }}
              />
            </View>

            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Feedback about Owner</Text>
              <Input
                style={styles.formItem}
                placeholder='Honda, Toyota etc'
                onChangeText={(feedbackOwner) =>
                  this.setState({ feedbackOwner })
                }
                value={this.state.feedbackOwner}
              />
            </View>

            <View style={styles.formRow}>
              <Button
                onPress={() => {
                  this.submitRank();
                  this.bookingStatus();
                  //this.endBooking();
                  const { navigate } = this.props.navigation;
                  navigate('RentVehicle');
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

export default Ranking;
