import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    useWindowDimensions,
} from 'react-native';

const searchIcon = require('../../assets/icons/search.png');
const hashtagIcon = require('../../assets/icons/hashtag.png');

const duumy_search = [
    {
        id: 1,
        img: 'https://picsum.photos/130/130',
        isMulti: true,
    },
    {
        id: 2,
        img: 'https://picsum.photos/130/130',
        isMulti: false,
    },
    {
        id: 3,
        img: 'https://picsum.photos/130/130',
        isMulti: true,
    },
    {
        id: 4,
        img: 'https://picsum.photos/130/130',
        isMulti: false,
    },
    {
        id: 5,
        img: 'https://picsum.photos/130/130',
        isMulti: true,
    },
    {
        id: 6,
        img: 'https://picsum.photos/130/130',
        isMulti: false,
    },
    {
        id: 7,
        img: 'https://picsum.photos/130/130',
        isMulti: false,
    },
    {
        id: 8,
        img: 'https://picsum.photos/130/130',
        isMulti: true,
    },
    {
        id: 9,
        img: 'https://picsum.photos/130/130',
        isMulti: true,
    },
    {
        id: 10,
        img: 'https://picsum.photos/130/130',
        isMulti: true,
    },
];

const SearchFeed = ({ navigation }) => {
    const [keyword, setKeyword] = useState('');
    const { width } = useWindowDimensions();

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ borderWidth: 1, borderColor: '#FFF' }}>
                <Image
                    source={{ uri: item.img }}
                    style={{ width: width / 3 - 2, height: width / 3 - 2 }}
                />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ flex: 1 }}>
                <View style={styles.searchContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SearchList')}
                        style={styles.searchWrapper}>
                        <TouchableOpacity style={styles.searchIconStyle}>
                            <Image source={hashtagIcon} style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>
                        <Text allowFontScaling={false} style={styles.inputStyle}>
                            키워드를 입력하세요.
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={duumy_search}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews
                    numColumns={3}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        height: 68,
        backgroundColor: '#FFF',
    },
    searchWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        marginHorizontal: 16,
        marginVertical: 12,
        borderRadius: 4,
    },
    searchIconStyle: {
        marginLeft: 16,
        marginRight: 2,
    },
    inputStyle: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        fontWeight: '400',
        color: '#828282',
        paddingRight: 12,
    },
});

export default SearchFeed;
