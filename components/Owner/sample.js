import React, { Component } from 'react';
import {
  Container,
  Header,
  Icon,
  Left,
  Body,
  Right,
  Text,
  Content,
  List,
} from 'native-base';
import {
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  AsyncStorage,
  ScrollView,
} from 'react-native';

import moment from 'moment';
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const token = await AsyncStorage.getItem('token');

    const response = await fetch('http://192.168.10.11:4000/rider/myorders', {
      headers: new Headers({
        Authorization: 'Bearer ' + token,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ orders: responseJson.Orders });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getListViewItem = async (item) => {
    this.props.navigation.navigate('Details', {
      itemId: item.order._id,
      createdAt: item.order.createdAt,
    });
  };

  render() {
    console.disableYellowBox = true;
    return (
      <Container style={{ backgroundColor: '' }}>
        <Header style={{ backgroundColor: '#8E0438' }}>
          <StatusBar backgroundColor='#8E0438' barStyle='light-content' />
          <Left>
            <Icon
              name='menu'
              style={{ color: 'white' }}
              //onPress={() => this.props.navigation.toggleDrawer()}
            />
          </Left>
          <Body>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
              }}
            >
              Dashboard
            </Text>
          </Body>
          <Right />
        </Header>
        <ScrollView>
          {this.state.orders.map((item, i) => {
            return (
              <Content>
                <TouchableOpacity
                  onPress={this.getListViewItem.bind(this, item)}
                  activeOpacity={0.7}
                  style={Styles.MainCard}
                >
                  <View style={Styles.Left}>
                    <Text style={Styles.MediumBoldText}>
                      {'Order #'}
                      {i + 1}
                    </Text>
                    <Text
                      style={[
                        Styles.SmallText,
                        {
                          color: '#8E0438',
                        },
                        item.order.status === 'In Kitchen'
                          ? {
                              color: '#8E0438',
                            }
                          : null,
                      ]}
                    >
                      {item.order.status}
                    </Text>
                  </View>
                  <View style={Styles.Middle}>
                    <Text
                      style={[
                        Styles.MediumBoldText,
                        {
                          color: 'black',
                        },
                      ]}
                    >
                      {item.price}
                    </Text>
                    <Text
                      style={[
                        Styles.SmallText,
                        {
                          color: '#8E0438',
                        },
                      ]}
                    >
                      {' '}
                      {moment(item.order.createdAt).startOf('hour').fromNow()}
                    </Text>
                  </View>
                  <View style={Styles.Right}>
                    <Icon
                      name='ios-arrow-forward'
                      style={{
                        color: 'black',
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </Content>
            );
          })}
        </ScrollView>
      </Container>
    );
  }
}
const Styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 20,
    width: '100%',
    alignSelf: 'center',
  },
  Seprator: {
    marginBottom: 10,
  },
  MainCard: {
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',

    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },

  SmallText: {
    color: '#8E0438',
    fontSize: 16,
  },
  MediumBoldText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  Left: {
    width: '50%',
    // backgroundColor: 'green',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  Middle: {
    width: '35%',
    // backgroundColor: 'red',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  Right: {
    width: '10%',
    // backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
