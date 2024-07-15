import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import BasicHeader from '../../components/BasicHeader';

const saveIcon = require('../../assets/icons/save.png');
const tempImg = require('../../assets/images/tempProfile.png');

const ProfileEdit = ({ navigation }) => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);

    const handleSave = () => {
        console.log('Profile saved');
        navigation.goBack();
    };

    const handleImagePick = () => {
        console.log('Image picked');
        setProfileImage('');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 헤더 */}
            <View style={{ justifyContent: 'center' }}>
                <BasicHeader title="프로필 설정" />
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Image source={saveIcon} style={{ width: 36, height: 36 }} />
                </TouchableOpacity>
            </View>

            {/* 프로필 이미지 편집 */}
            <View style={styles.content}>
                <View style={styles.imageSection}>
                    <View style={styles.imageContainer}>
                        {profileImage ? (
                            <Image source={profileImage} style={styles.profileImage} />
                        ) : (
                            <Image source={tempImg} style={styles.profileImage} />
                        )}
                    </View>
                    <TouchableOpacity onPress={handleImagePick}>
                        <Text style={styles.editImageText}>이미지 편집</Text>
                    </TouchableOpacity>
                </View>

                {/* info 설정 */}
                <View style={{ marginTop: 20 }}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, focusedInput === 'name' && styles.focusedInput]}
                            placeholder="이름 (10글자 까지)"
                            value={name}
                            onChangeText={text => setName(text.slice(0, 10))}
                            maxLength={10}
                            onFocus={() => setFocusedInput('name')}
                            onBlur={() => setFocusedInput(null)}
                        />
                        <Text style={styles.charCount}>{name.length}/10</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[
                                styles.input,
                                styles.bioInput,
                                focusedInput === 'bio' && styles.focusedInput,
                            ]}
                            placeholder="소개 (50글자 까지)"
                            value={bio}
                            onChangeText={text => setBio(text.slice(0, 50))}
                            maxLength={50}
                            multiline
                            onFocus={() => setFocusedInput('bio')}
                            onBlur={() => setFocusedInput(null)}
                        />
                        <Text style={styles.charCount}>{bio.length}/50</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    content: {
        padding: 20,
        gap: 20,
    },
    saveButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    imageSection: {
        alignItems: 'center',
        gap: 10,
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        marginTop: 16,
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    editImageText: {
        fontSize: 14,
        color: '#5762D5',
        marginTop: 8,
    },
    inputContainer: {
        position: 'relative',
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#eceefb',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    focusedInput: {
        borderColor: '#5762D5',
    },
    bioInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    charCount: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        fontSize: 12,
        color: '#888',
    },
});

export default ProfileEdit;
