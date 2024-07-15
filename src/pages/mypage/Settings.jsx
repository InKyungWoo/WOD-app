import React from 'react';
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

const myProfile = require('../../assets/images/tempProfile.png');
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
                    <View style={styles.infoItem}>
                        <Text style={styles.labelText}>계정ID</Text>
                        <Text style={styles.valueText}>chacha_@hufs.ac.kr</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.labelText}>계정 연락처</Text>
                        <Text style={styles.valueText}>010-2357-1434</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => navigation.navigate('AccountSetting')}>
                            <Text style={styles.editButtonText}>계정 설정</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 메뉴 항목들 */}
                <View style={styles.menuContainer}>
                    {menuData.map(section => (
                        <View key={section.id}>
                            <View style={styles.menuSectionHeader}>
                                <Text style={styles.menuSectionTitle}>{section.title}</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, borderColor: '#858fc7' }} />
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
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F2',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 12,
    },
    editButton: {
        backgroundColor: '#858fc7',
        padding: 8,
        borderRadius: 4,
        alignItems: 'center',
        width: 300,
        marginBottom: 10,
    },
    editButtonText: {
        color: '#FFF',
        fontSize: 14,
    },
    infoItem: {
        marginBottom: 14,
    },
    labelText: {
        fontSize: 14,
        color: '#5762D5',
        marginBottom: 4,
    },
    valueText: {
        fontSize: 16,
        color: '#3C215B',
        fontWeight: '500',
    },

    menuContainer: {
        paddingHorizontal: 24,
    },
    menuSectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 8,
    },
    menuSectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#858fc7',
        marginRight: 8,
    },
    verticalLine: {
        height: 14,
        width: 1,
        backgroundColor: '#ECECEC',
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    menuItemText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#3C215B',
    },
    arrowIcon: {
        width: 20,
        height: 20,
    },
});

export default Settings;
