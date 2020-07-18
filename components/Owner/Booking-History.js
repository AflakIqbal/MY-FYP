import React, { Component } from 'react';
import {
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  AsyncStorage,
  ScrollView,
  Text,
  Textarea,
  Image,
  Button,
  Modal,
  TextInput,
} from 'react-native';

import { ListItem, Tile, Card, Rating, Input } from 'react-native-elements';

import { connect } from 'react-redux';
import { baseUrl } from '../../shared/baseUrl';
import { Loading } from '../LoadingComponent';
import * as Animatable from 'react-native-animatable';
import { baseUrlNode } from '../../shared/baseUrl';

console.disableYellowBox = true;
// const mapStateToProps = (state) => {
//   return {
//     dishes: state.dishes,
//   };
// };

class Booking extends Component {
  // static navigationOptions = {
  //   title: 'Menu',
  // };
  constructor(props) {
    super(props);
    this.state = {
      booking: [],
      isLoading: true,
      showModal: false,
      id: '',
      report: '',
    };
  }

  componentDidMount() {
    this.getData();
    this.listener = this.props.navigation.addListener('didFocus', this.getData);
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  setID(id) {
    this.setState({ id: id });
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
    this.componentDidMount();
  }

  getData = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    const response = await fetch(baseUrlNode + 'api/vehicle/ownerBookings', {
      method: 'GET',
      headers: {
        'x-auth-token': token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ booking: responseJson });
      })
      .catch((error) => {
        console.error(error);
        console.log('error araha');
      });
  };

  submitReporty = async () => {
    const id = this.state.id;
    const token = await AsyncStorage.getItem('token');
    fetch(baseUrlNode + 'api/owner/reportCustomer/' + id, {
      method: 'POST',
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        report: this.state.report,
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
  };

  render() {
    const { navigate } = this.props.navigation;
    const renderMenuItem = ({ item, index }) => {
      return (
        <Card title={item.vehicle.manufacturer + ' ' + item.vehicle.model}>
          <View key={index} style={{ margin: 0, flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'serif',
                marginBottom: 5,
                textAlign: 'center',
              }}
            >
              {item.customer.name} book your vehicle for {item.days} days
            </Text>

            <Text style={Styles.text1}>You rank {item.customer.name}</Text>
            <View style={{ alignSelf: 'center' }}>
              <Rating
                showRating
                readonly
                startingValue={item.cusomterFeedback.rating}
                showRating={false}
                imageSize={18}
                style={{ alignItems: 'flex-start', padding: 5 }}
              />
            </View>

            <Text style={Styles.text1}>Your Comments</Text>
            <Text style={Styles.text}>{item.cusomterFeedback.feedback}</Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'serif',
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              Dated: {item.date}
            </Text>
            <Button
              onPress={() => {
                this.setID(item.customer._id);
                this.toggleModal();
              }}
              color='#512DA8'
              title='Submit Report?'
            />
          </View>
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={this.state.showModal}
            onDismiss={() => this.toggleModal()}
            onRequestClose={() => this.toggleModal()}
          >
            <View style={Styles.modal}>
              <Text style={Styles.modalTitle}>Write Report</Text>

              <TextInput
                style={{
                  height: 50,
                  borderColor: 'gray',
                  borderWidth: 1,
                  margin: 10,
                }}
                onChangeText={(report) => this.setState({ report })}
                value={this.state.report}
              />

              <Button
                onPress={() => {
                  this.submitReporty();
                  this.toggleModal();
                }}
                color='#512DA8'
                title='Done'
              />
            </View>
          </Modal>
        </Card>
      );
    };

    return (
      //<Card title='Booking History'>
      <FlatList data={this.state.booking} renderItem={renderMenuItem} />
      //</Card>
    );
  }
}

const Styles = StyleSheet.create({
  list: {
    marginBottom: 2,
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
  modal: {
    justifyContent: 'center',
    margin: 20,
  },
  img: {
    margin: 10,
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 60,
  },
  text: {
    fontSize: 14,
    fontFamily: 'serif',
    textAlign: 'center',
  },
  text1: {
    fontSize: 14,
    fontFamily: 'serif',
    textAlign: 'center',
    //textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  main: {
    marginBottom: 2,
    flex: 1,
    backgroundColor: '#FDF6E7',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
});
export default Booking;
