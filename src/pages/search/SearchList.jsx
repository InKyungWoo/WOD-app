import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Keyboard,
    FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const keywordDeleteIcon = require('../../assets/icons/keywordDelete.png');
const hashtagIcon = require('../../assets/icons/hashtag.png');

const SearchList = () => {
    const [keyword, setKeyword] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        loadRecentSearches();
    }, []);

    const loadRecentSearches = async () => {
        try {
            const searches = await AsyncStorage.getItem('recentSearches');
            if (searches !== null) {
                setRecentSearches(JSON.parse(searches));
            }
        } catch (error) {
            console.error('Failed to load recent searches', error);
        }
    };

    const saveRecentSearch = async search => {
        try {
            const updatedSearches = [
                search,
                ...recentSearches.filter(item => item !== search),
            ].slice(0, 10);
            await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
            setRecentSearches(updatedSearches);
        } catch (error) {
            console.error('Failed to save recent search', error);
        }
    };

    const removeRecentSearch = async search => {
        try {
            const updatedSearches = recentSearches.filter(item => item !== search);
            await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
            setRecentSearches(updatedSearches);
        } catch (error) {
            console.error('Failed to remove recent search', error);
        }
    };

    const handleSearch = () => {
        if (keyword.trim()) {
            saveRecentSearch(keyword.trim());
            console.log('검색 API 호출:', keyword.trim());
            setKeyword('');
        }
    };

    const handleCancelButton = () => {
        setKeyword('');
        Keyboard.dismiss();
    };

    const renderRecentSearchItem = ({ item }) => (
        <View style={styles.recentKeywordRow}>
            <TouchableOpacity style={styles.recentKeywordUser} onPress={() => setKeyword(item)}>
                <Image source={hashtagIcon} style={{ width: 24, height: 24 }} />
                <Text>{item}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeRecentSearch(item)}>
                <Image source={keywordDeleteIcon} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ flex: 1 }}>
                <View style={styles.searchContainer}>
                    <View style={styles.searchWrapper}>
                        <View style={styles.searchSection}>
                            <TouchableOpacity style={styles.searchIconStyle}>
                                <Image source={hashtagIcon} style={{ width: 24, height: 24 }} />
                            </TouchableOpacity>
                            <TextInput
                                returnKeyType="search"
                                spellCheck={false}
                                autoCorrect={false}
                                autoCapitalize="none"
                                value={keyword}
                                onChangeText={text => setKeyword(text)}
                                allowFontScaling={false}
                                style={styles.inputStyle}
                                autoFocus
                                onSubmitEditing={handleSearch}
                                placeholder="해시태그 검색"
                            />
                        </View>
                        <TouchableOpacity onPress={handleCancelButton}>
                            <Text style={styles.cancelText}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <View style={styles.recentKeywordContainer}>
                        <Text style={styles.recentKeywordLabel}>최근 검색어</Text>
                        <TouchableOpacity onPress={() => setRecentSearches([])}>
                            <Text style={styles.allDeleteLabel}>전체삭제</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={recentSearches}
                        renderItem={renderRecentSearchItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        height: 68,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F2',
        marginBottom: 24,
    },
    searchWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#F8F8F8',
        marginHorizontal: 16,
        marginVertical: 12,
        borderRadius: 4,
        gap: 10,
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
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
        backgroundColor: '#F8F8F8',
    },
    cancelText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0EAEC4',
    },
    recentKeywordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 24,
    },
    recentKeywordLabel: {
        fontSize: 16,
        color: '#333',
    },
    allDeleteLabel: {
        fontSize: 16,
        color: '#828282',
    },
    recentKeywordRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 20,
    },
    recentKeywordUser: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 11,
    },
});

export default SearchList;
