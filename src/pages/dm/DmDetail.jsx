import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    FlatList,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import BasicHeader from '../../components/BasicHeader';

import LeftBubble from '../../components/LeftBubble';
import RightBubble from '../../components/RightBubble';

const plusIcon = require('../../assets/icons/plus.png');
const photoButton = require('../../assets/icons/chatmodal/photoButton.png');
const cameraButton = require('../../assets/icons/chatmodal/cameraButton.png');
const voiceButton = require('../../assets/icons/chatmodal/voiceButton.png');

// 더미 메시지 데이터
const dummyMessages = [
    { id: '1', text: '안녕하세요!', sender: 'other', time: '14:30', isRead: true },
    {
        id: '2',
        text: '네, 안녕하세요. 무슨 일이신가요?',
        sender: 'me',
        time: '14:31',
        isRead: true,
    },
    {
        id: '3',
        text: '프로젝트 관련해서 질문이 있어요.',
        sender: 'other',
        time: '14:32',
        isRead: true,
    },
    { id: '4', text: '네, 어떤 질문인가요?', sender: 'me', time: '14:33', isRead: false },
];

const { width } = Dimensions.get('window');

const DmDetail = ({ route, navigation }) => {
    const { username } = route.params;
    const [modalVisible, setModalVisible] = useState(false);

    const goToCameraRoll = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            multiple: true,
        }).then(image => {
            console.log(image);
        });
    };

    const handleCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: false,
        }).then(image => {
            console.log(image);
        });
    };

    const renderMessage = ({ item, index }) => {
        const prevMessage = index > 0 ? dummyMessages[index - 1] : null;
        const nextMessage = index < dummyMessages.length - 1 ? dummyMessages[index + 1] : null;

        if (item.sender === 'me') {
            return (
                <RightBubble message={item} prevMessage={prevMessage} nextMessage={nextMessage} />
            );
        } else {
            return <LeftBubble message={item} prevMessage={prevMessage} />;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
                <BasicHeader title={username} />
                <FlatList
                    data={dummyMessages}
                    renderItem={renderMessage}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.messageList}
                />

                {/* 메세지 입력창 */}
                <View style={styles.inputContainer}>
                    <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                        style={styles.plusButton}>
                        <Image source={plusIcon} style={{ width: 12, height: 12 }} />
                    </TouchableOpacity>
                    <TextInput placeholder="메세지 입력하기" style={styles.textInput} />
                </View>
            </KeyboardAvoidingView>

            {/* 모달 창 */}
            <Modal
                isVisible={modalVisible}
                useNativeDriver
                animationIn="slideInUp"
                animationOut="slideOutDown"
                animationInTiming={200}
                animationOutTiming={200}
                backdropOpacity={0}
                style={{ margin: 0, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <View style={{ width, backgroundColor: '#eceefb', paddingTop: 10, height: 200 }}>
                    <View
                        style={{
                            padding: 16,
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                            style={styles.plusButton}>
                            <Image
                                source={plusIcon}
                                style={{ width: 12, height: 12, transform: [{ rotate: '45deg' }] }}
                            />
                        </TouchableOpacity>
                        <TextInput placeholder="메세지 입력하기" style={styles.textInput} />
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 12,
                            marginHorizontal: 80,
                            justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity
                            onPress={() => goToCameraRoll()}
                            style={styles.buttonWrapper}>
                            <Image source={photoButton} style={styles.modalButtons} />
                            <Text style={styles.modalButtonText}>앨범</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleCamera()}
                            style={styles.buttonWrapper}>
                            <Image source={cameraButton} style={styles.modalButtons} />
                            <Text style={styles.modalButtonText}>카메라</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonWrapper}>
                            <Image source={voiceButton} style={styles.modalButtons} />
                            <Text style={styles.modalButtonText}>음성녹음</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    messageList: {
        padding: 15,
    },
    inputContainer: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#EFEFEF',
        backgroundColor: '#eceefb',
    },
    plusButton: {
        backgroundColor: '#5865AC',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    textInput: {
        borderWidth: 2,
        borderColor: '#FFF',
        borderRadius: 20,
        flex: 1,
        paddingHorizontal: 12,
    },
    buttonWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
    },
    modalButtons: {
        width: 48,
        height: 48,
    },
    modalButtonText: {
        fontSize: 13,
        fontWeight: '400',
        color: '#828282',
    },
});

export default DmDetail;
