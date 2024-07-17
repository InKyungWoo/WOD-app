import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    useWindowDimensions,
} from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const backArrow = require('../../assets/icons/back_arrow.png');
const checked = require('../../assets/icons/checked.png');

const PostFeed = ({ navigation }) => {
    const [images, setImages] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState();
    const [selectedIndex, setSelectedIndex] = useState();

    const { width, height } = useWindowDimensions();

    useEffect(() => {
        FetchImages();
    }, []);

    const FetchImages = async () => {
        CameraRoll.getPhotos({
            first: 100,
            assetType: 'Photos',
            groupTypes: 'All',
        }).then(res => {
            console.log(res);
            if (!selectedPhoto) {
                setSelectedPhoto(res.edges[0].node.image);
                setSelectedIndex(0);
            }

            setImages(res.edges.map(e => e.node.image));
        });
    };

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{ borderWidth: 1, borderColor: '#FFF' }}
                onPress={() => {
                    setSelectedPhoto(item);
                    setSelectedIndex(index);
                }}>
                {selectedIndex === index && (
                    <View
                        style={{
                            position: 'absolute',
                            right: 7,
                            top: 3,
                            width: 20,
                            height: 20,
                            backgroundColor: '#FFF',
                            borderRadius: 20,
                            zIndex: 2,
                        }}>
                        <Image source={checked} style={{ width: 20, height: 20 }} />
                    </View>
                )}
                <Image source={item} style={{ width: width / 4 - 2, height: width / 4 - 2 }} />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            {/* 헤더 */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 16,
                    marginBottom: 8,
                }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={backArrow} style={{ width: 36, height: 36 }} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('PostDetail', { selectedPhoto })}>
                    <Text style={{ fontSize: 15, color: '#5762D5', fontWeight: 'bold' }}>다음</Text>
                </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: '#000', flex: 0.5 }}>
                <Image
                    source={{ uri: selectedPhoto?.uri }}
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
            <View style={{ flex: 0.5 }}>
                <FlatList
                    data={images}
                    renderItem={renderItem}
                    keyExtractor={item => item.uri}
                    numColumns={4}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews
                />
            </View>
        </SafeAreaView>
    );
};

export default PostFeed;
