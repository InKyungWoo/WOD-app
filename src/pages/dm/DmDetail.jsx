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
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import dayjs from 'dayjs';

import LeftBubble from '../../components/LeftBubble';
import RightBubble from '../../components/RightBubble';

const plusIcon = require('../../assets/icons/plus.png');
const photoButton = require('../../assets/icons/chatmodal/photoButton.png');
const cameraButton = require('../../assets/icons/chatmodal/cameraButton.png');
const voiceButton = require('../../assets/icons/chatmodal/voiceButton.png');

// 더미 메시지 데이터
const dummyMessages = [
    {
        id: '1',
        text: '안녕하세요!',
        sender: 'other',
        time: '14:30',
        isRead: true,
    },
    {
        id: '2',
        text: '네, 안녕하세요. 무슨 일이신가요?',
        sender: 'me',
        time: '14:31',
        isRead: true,
    },
    {
        id: '3',
        image: 'https://picsum.photos/400/300',
        sender: 'other',
        time: '14:32',
        isRead: true,
    },
    {
        id: '4',
        text: '프로젝트 관련 이미지를 보내드렸어요. 확인 부탁드립니다.',
        sender: 'other',
        time: '14:32',
        isRead: true,
    },
    {
        id: '5',
        text: '네, 확인해보겠습니다. 잠시만 기다려주세요.',
        sender: 'me',
        time: '14:33',
        isRead: false,
    },
    {
        id: '6',
        audio: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        sender: 'me',
        time: '14:35',
        isRead: false,
    },
    {
        id: '7',
        text: '음성 메시지로 설명을 드렸습니다. 들어보시고 추가 질문 있으시면 말씀해주세요.',
        sender: 'me',
        time: '14:35',
        isRead: false,
    },
];

const { width } = Dimensions.get('window');

const DmDetail = ({ route, navigation }) => {
    const { username } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [messages, setMessages] = useState(dummyMessages);
    const [inputText, setInputText] = useState('');
    const audioRecorderPlayer = new AudioRecorderPlayer();

    const sendMessage = (content, type = 'text') => {
        const newMessage = {
            id: Date.now().toString(),
            sender: 'me',
            time: dayjs().format('HH:mm'),
            isRead: false,
            [type]: content,
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setModalVisible(false);
    };

    const goToCameraRoll = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            sendMessage(image.path, 'image');
        });
    };

    const handleCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: false,
        }).then(image => {
            sendMessage(image.path, 'image');
        });
    };

    const onStartRecord = async () => {
        setIsRecording(true);
        const result = await audioRecorderPlayer.startRecorder();
        audioRecorderPlayer.addRecordBackListener(e => {
            // 녹음 진행 상황
        });
    };

    const onStopRecord = async () => {
        setIsRecording(false);
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        sendMessage(result, 'audio');
    };

    const renderMessage = ({ item, index }) => {
        const prevMessage = index < messages.length - 1 ? messages[index + 1] : null;
        const nextMessage = index > 0 ? messages[index - 1] : null;

        if (item.sender === 'me') {
            return (
                <RightBubble
                    message={item}
                    prevMessage={prevMessage}
                    nextMessage={nextMessage}
                    onAudioPress={audioUri => audioRecorderPlayer.startPlayer(audioUri)}
                />
            );
        } else {
            return (
                <LeftBubble
                    message={item}
                    prevMessage={prevMessage}
                    onAudioPress={audioUri => audioRecorderPlayer.startPlayer(audioUri)}
                />
            );
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
                    data={messages}
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
                    <TextInput
                        placeholder="메세지 입력하기"
                        style={styles.textInput}
                        value={inputText}
                        onChangeText={setInputText}
                        onSubmitEditing={() => {
                            if (inputText.trim()) {
                                sendMessage(inputText.trim());
                                setInputText('');
                            }
                        }}
                    />
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
                    <View style={{ padding: 16, flexDirection: 'row' }}>
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

                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity onPress={goToCameraRoll} style={styles.buttonWrapper}>
                            <Image source={photoButton} style={styles.modalButtons} />
                            <Text style={styles.modalButtonText}>앨범</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleCamera} style={styles.buttonWrapper}>
                            <Image source={cameraButton} style={styles.modalButtons} />
                            <Text style={styles.modalButtonText}>카메라</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={isRecording ? onStopRecord : onStartRecord}
                            style={styles.buttonWrapper}>
                            <Image source={voiceButton} style={styles.modalButtons} />
                            <Text style={styles.modalButtonText}>
                                {isRecording ? '녹음 중지' : '음성녹음'}
                            </Text>
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
    modalButtonContainer: {
        flexDirection: 'row',
        marginTop: 12,
        marginHorizontal: 80,
        justifyContent: 'space-between',
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