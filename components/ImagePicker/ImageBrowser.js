import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
// import * as ScreenOrientation from 'expo-screen-orientation';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import ImageTile from './ImageTile';
// import { theme } from '../../constants';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default class ImageBrowser extends React.Component {
  state = {
    hasCameraPermission: null,
    hasCameraRollPermission: null,
    numColumns: null,
    photos: [],
    selected: [],
    isEmpty: false,
    after: null,
    hasNextPage: true,
  };

  async componentDidMount() {
    await this.getPermissionsAsync();
    // ScreenOrientation.addOrientationChangeListener(this.onOrientationChange);
    // const orientation = await ScreenOrientation.getOrientationAsync();
    // const numColumns = this.getNumColumns(orientation.orientation);
    // this.setState({numColumns});
    this.getPhotos();
  }

  getPermissionsAsync = async () => {
    const { status: camera } = await Permissions.askAsync(Permissions.CAMERA);
    const { status: cameraRoll } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    this.setState({
      hasCameraPermission: camera === 'granted',
      hasCameraRollPermission: cameraRoll === 'granted',
    });
  };

  // onOrientationChange = ({orientationInfo}) => {
  //   ScreenOrientation.removeOrientationChangeListeners();
  //   ScreenOrientation.addOrientationChangeListener(this.onOrientationChange);
  //   const numColumns = this.getNumColumns(orientationInfo.orientation);
  //   this.setState({numColumns});
  // }

  getNumColumns = () => {
    return 4;
  };

  selectImage = (index) => {
    let newSelected = Array.from(this.state.selected);
    if (newSelected.indexOf(index) === -1) {
      newSelected.push(index);
    } else {
      const deleteIndex = newSelected.indexOf(index);
      newSelected.splice(deleteIndex, 1);
    }
    if (newSelected.length > this.props.max) return;
    if (!newSelected) newSelected = [];
    this.setState({ selected: newSelected });
    this.props.onChange(newSelected.length, () => this.prepareCallback());
  };
  // RErun
  getPhotos = () => {
    const params = {
      first: this.props.loadCount || 50,
      assetType: 'Photos',
      sortBy: ['creationTime'],
    };
    if (this.state.after) params.after = this.state.after;
    if (!this.state.hasNextPage) return;
    MediaLibrary.getAssetsAsync(params).then(this.processPhotos);
  };

  processPhotos = (data) => {
    if (data.totalCount) {
      if (this.state.after === data.endCursor) return;
      const uris = data.assets;
      this.setState({
        photos: [...this.state.photos, ...uris],
        after: data.endCursor,
        hasNextPage: data.hasNextPage,
      });
    } else {
      this.setState({ isEmpty: true });
    }
  };

  getItemLayout = (data, index) => {
    const length = width / 4;
    return { length, offset: length * index, index };
  };

  prepareCallback() {
    const { selected, photos } = this.state;
    const selectedPhotos = selected.map((i) => photos[i]);
    const assetsInfo = Promise.all(
      selectedPhotos.map((i) => MediaLibrary.getAssetInfoAsync(i))
    );
    this.props.callback(assetsInfo);
  }

  renderImageTile = ({ item, index }) => {
    const selected = this.state.selected.indexOf(index) !== -1;
    const selectedItemNumber = this.state.selected.indexOf(index) + 1;
    return (
      <ImageTile
        selectedItemNumber={selectedItemNumber}
        item={item}
        index={index}
        selected={selected}
        selectImage={this.selectImage}
        renderSelectedComponent={this.props.renderSelectedComponent}
      />
    );
  };

  renderPreloader = () =>
    this.props.preloaderComponent || (
      <View style={{ height: height, flex: 1 }}>
        <ActivityIndicator
          color={'indigo'}
          size={'large'}
          style={{ flex: 0.8 }}
        />
      </View>
    );

  renderEmptyStay = () => this.props.emptyStayComponent || null;

  renderImages() {
    return (
      <FlatList
        data={this.state.photos}
        numColumns={4}
        // key={this.state.numColumns}
        renderItem={this.renderImageTile}
        keyExtractor={(_, index) => index}
        onEndReached={() => {
          this.getPhotos();
        }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          this.state.isEmpty ? this.renderEmptyStay() : this.renderPreloader()
        }
        initialNumToRender={24}
        getItemLayout={this.getItemLayout}
      />
    );
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (!hasCameraPermission) {
      return this.props.noCameraPermissionComponent || null;
    }

    return <View style={styles.container}>{this.renderImages()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
