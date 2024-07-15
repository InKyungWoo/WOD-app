import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
} from 'react-native';

import BasicHeader from '../../components/BasicHeader';

const myProfile = require('../../assets/images/bommy.jpeg');
const myPageMenuArrow = require('../../assets/icons/myPageMenuArrow.png');

const menuData = [
    {
        id: 1,
        title: '서비스 소식',
        subItems: [{ title: '공지사항', page: 'Notice' }],
    },
    {
        id: 2,
        title: '고객센터',
        subItems: [
            { title: '앱 건의', page: 'AppSuggestion' },
            { title: '1:1 문의', page: 'CustomerSupport' },
            { title: 'FAQ', page: 'FAQ' },
            { title: '이용약관', page: 'TermsOfService' },
        ],
    },
];

const Settings = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <BasicHeader title={'설정'} />
            <ScrollView>
                {/* 프로필 설정 */}
                <View style={styles.sectionContainer}>
                    <View style={{ alignItems: 'center', marginBottom: 16 }}>
                        <Image
                            source={myProfile}
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                            }}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => navigation.navigate('ProfileEdit')}>
                            <Text style={styles.editButtonText}>프로필 설정</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 계정 설정 */}
                <View style={styles.sectionContainer}>
                    <View>
                        <Text style={styles.labelText}>계정ID</Text>
                        <Text style={styles.valueText}>chacha_@hufs.ac.kr</Text>
                    </View>
                    <View style={{ marginTop: 12 }}>
                        <Text style={styles.labelText}>계정 연락처</Text>
                        <Text style={styles.valueText}>010-2357-1434</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => navigation.navigate('AccountSettings')}>
                            <Text style={styles.editButtonText}>계정 설정</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 메뉴 항목들 */}
                {menuData.map(section => (
                    <View key={section.id} style={styles.menuSection}>
                        <Text style={styles.menuSectionTitle}>{section.title}</Text>
                        {section.subItems.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.menuItem}
                                onPress={() => navigation.navigate(item.page)}>
                                <Text style={styles.menuItemText}>{item.title}</Text>
                                <Image
                                    source={myPageMenuArrow}
                                    style={styles.arrowIcon}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F2',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 16,
    },
    editButton: {
        backgroundColor: '#F2F2F2',
        padding: 8,
        borderRadius: 4,
        alignItems: 'center',
        width: 300,
    },
    editButtonText: {
        color: '#4F4F4F',
        fontSize: 12,
    },
    labelText: {
        fontSize: 14,
        color: '#828282',
        marginBottom: 4,
    },
    valueText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    menuSection: {
        marginTop: 16,
    },
    menuSectionTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#828282',
        marginLeft: 16,
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F2',
    },
    menuItemText: {
        fontSize: 16,
        color: '#333',
    },
    arrowIcon: {
        width: 20,
        height: 20,
    },
});

export default Settings;
