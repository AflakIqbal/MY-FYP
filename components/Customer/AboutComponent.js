import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { Loading } from '../LoadingComponent';
import { connect } from 'react-redux';
import { baseUrl } from '../../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => {
  return {
    //leaders: state.leaders,
  };
};

function History() {
  return (
    <Card featuredTitle={'Our History'} title={'Our History'}>
      <Text style={{ margin: 10 }}>
        {
          'Started in 2019, During the Final year project of BS Software Engineering in COMSATS University Islamabad. Idea for this applications is also accepted in SSBC (Student Startup Business Center) among hundered of project'
        }
      </Text>
      <Text style={{ margin: 10 }}>
        {
          'The SAWARI provides the best service to rent your vehicles, before SAWARI there is no single general and specific application exist'
        }
      </Text>
    </Card>
  );
}

class About1 extends Component {
  static navigationOptions = {
    title: 'About US',
  };

  render() {
    return (
      <ScrollView>
        <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
          <History />
          <Card title='Corporate Leadership'>
            <ListItem
              roundAva
              key={'index'}
              title={'Muhammad Aflak Iqbal'}
              subtitle={'CEO SAWARI\nSoftware Engineer'}
              hideChevron={true}
              leftAvatar={
                <Image
                  style={styles.avatar}
                  source={require('../images/aflak.jpg')}
                />
              }
            />
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    borderColor: '#C0C0C0',
  },
});

export default connect(mapStateToProps)(About1);
