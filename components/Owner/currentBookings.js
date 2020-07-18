import React, { Component } from 'react';
import {
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  Modal,
  Button,
} from 'react-native';
import { ListItem, Tile, Card, Rating, Input } from 'react-native-elements';

import { connect } from 'react-redux';
import { baseUrl } from '../../shared/baseUrl';
import { Loading } from '../LoadingComponent';
import * as Animatable from 'react-native-animatable';
import { AsyncStorage } from 'react-native';
import { baseUrlNode } from '../../shared/baseUrl';

console.disableYellowBox = true;
// const mapStateToProps = (state) => {
//   return {
//     dishes: state.dishes,
//   };
// };

class current extends Component {
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
      Vid: '',
      rankCustomer: 1,
      feedbackCustomer: '',
    };
  }

  componentDidMount = async () => {
    const token1 = await AsyncStorage.getItem('token');
    this.setState({ token: token1 });
    this.getData();
    this.listener = this.props.navigation.addListener('didFocus', this.getData);
  };

  componentWillUnmount() {
    this.listener.remove();
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  getData = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    const response = await fetch(
      baseUrlNode + 'api/vehicle/ownerCurrentBookings',
      {
        method: 'GET',
        headers: {
          'x-auth-token': token,
        },
      }
    )
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

  ranking(iid, id) {
    this.setState({ id: id });
    this.setState({ Vid: iid });

    console.log(id);
    console.log(iid);
  }

  submitRank() {
    console.log('1st');
    const id = this.state.id;
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
    const Vid = this.state.Vid;
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
    const id = this.state.id;
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
    const renderMenuItem = ({ item, index }) => {
      if (item.booked) {
        return (
          <View>
            <Card title={item.vehicle.manufacturer + ' ' + item.vehicle.model}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', margin: 5 }}>
                The Customer End the booking, Now its your turn!!!
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'serif',
                  marginBottom: 5,
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                }}
              >
                {'=>'} Customer's Message at Booking time
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'serif',
                  marginBottom: 5,
                  textAlign: 'center',
                }}
              >
                {item.comments}
              </Text>
              <View key={index} style={{ margin: 0, flex: 1 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'serif',
                    marginBottom: 5,
                    fontWeight: 'bold',
                  }}
                >
                  Customer Name:{' '}
                  <Text style={{ fontWeight: '100' }}>
                    {item.customer.name}
                  </Text>
                </Text>

                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'serif',
                    marginBottom: 5,
                    fontWeight: 'bold',
                  }}
                >
                  Booking Days:{' '}
                  <Text style={{ fontWeight: '100' }}>{item.days}</Text>
                </Text>

                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'serif',
                    marginBottom: 5,
                    fontWeight: 'bold',
                  }}
                >
                  Customer Contact:{' '}
                  <Text style={{ fontWeight: '100' }}>
                    {item.customer.cellPhone}
                  </Text>
                </Text>

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
                    this.ranking(item.vehicle._id, item._id);
                    this.toggleModal();
                  }}
                  color='#512DA8'
                  title='End Booking'
                />
              </View>
            </Card>
            <Modal
              animationType={'slide'}
              transparent={false}
              visible={this.state.showModal}
              onDismiss={() => this.toggleModal()}
              onRequestClose={() => this.toggleModal()}
            >
              <Card>
                <ScrollView>
                  <Animatable.View animation='zoomIn' duration={3000}>
                    <Text style={Styles.modalTitle}>Ranking & Feedback</Text>
                    <View style={Styles.formRow1}>
                      <Text style={Styles.formLabel1}>Rank Customer</Text>
                      <Rating
                        showRating
                        startingValue={1}
                        imageSize={18}
                        style={{ alignItems: 'center', padding: 5 }}
                        onFinishRating={(rankCustomer) => {
                          this.setState({ rankCustomer });
                        }}
                      />
                    </View>

                    <View style={Styles.formRow1}>
                      <Text style={Styles.formLabel1}>
                        Feedback about Customer
                      </Text>
                      <Input
                        style={Styles.formItem}
                        placeholder='You Comments about Customer'
                        onChangeText={(feedbackCustomer) =>
                          this.setState({ feedbackCustomer })
                        }
                        value={this.state.feedbackCustomer}
                      />
                    </View>

                    <View style={Styles.formRow}>
                      <Button
                        onPress={() => {
                          this.submitRank();
                          this.endBooking();
                          this.bookingStatus();
                          this.toggleModal();
                          this.componentDidMount();
                        }}
                        title='Submit'
                        color='#512DA8'
                        accessibilityLabel='Learn more about this purple button'
                      />
                    </View>
                  </Animatable.View>
                </ScrollView>
              </Card>
            </Modal>
          </View>
        );
      } else {
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
              <Text style={{ fontSize: 14, fontFamily: 'serif', marginTop: 5 }}>
                Dated: {item.date}
              </Text>
            </View>
          </Card>
        );
      }
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
export default current;
