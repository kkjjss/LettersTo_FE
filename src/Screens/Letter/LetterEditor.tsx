import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {
    MutableRefObject,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import * as imagePicker from 'expo-image-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import useStore, {useLetterEditorStore} from '../../Store/store';
import {useKeyboard} from '../../Hooks/Hardware/useKeyboard';
import {BottomBar} from '../../Components/LetterEditor/Bottom/BottomBar';
import {PaperSelector} from '../../Components/LetterEditor/Bottom/PaperSelector';
import {TexticonSelector} from '../../Components/LetterEditor/Bottom/TexticonSelector';
import {ImagePicker} from '../../Components/LetterEditor/ImagePicker';

import type {StackParamsList} from '../../types/stackParamList';
import type {
    PaperColor,
    PaperStyle as _PaperStyle,
    Selector,
    TexticonCategory,
} from '../../types/types';
import {getImageUploadUrl} from '../../APIs/file';
import {ImageModal} from '../../Modals/ImageModal';
import {ModalBlur} from '../../Modals/ModalBlur';
import {PaperBackgroud} from '../../Components/Letter/PaperBackground/PaperBackgroud';
import {Header2} from '../../Components/Headers/Header2';
import {logIn as getUserInfo} from '../../APIs/member';

type Props = NativeStackScreenProps<StackParamsList, 'LetterEditor'>;

export function LetterEditor({navigation, route}: Props) {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [align, setAlign] = useState<'left' | 'center' | 'right'>('left');
    const [texticonSelectorVisible, setTexticonSelectorVisible] =
        useState(false);
    const [paperSelectorVisible, setPaperSelectorVisible] = useState(false);
    const [paperColor, setPaperColor] = useState<PaperColor>('PINK');
    const [paperStyle, setPaperStyle] = useState<_PaperStyle>('GRID');
    const [selectedCategory, setSelectedCategory] =
        useState<TexticonCategory>('happy');
    const [images, setImages] = useState<string[]>([]);
    const [isLoadingImage, setLoadingImage] = useState(false);
    const [isImageModalVisible, setImageModalVisible] = useState(false);

    const selection = useRef<Selector>({start: 0, end: 0});

    const titleRef = useRef(null);
    const textRef = useRef(null);

    const [lastestFocus, setLastestFocus] = useState<{
        ref: MutableRefObject<any>;
        name: 'title' | 'text';
    }>({name: 'title', ref: titleRef});

    const {setLetter, setInitialCoverData, setStampQuantity} = useStore();

    const {setDeliveryLetterData} = useLetterEditorStore();

    const disableNext = useMemo(
        () => String(title).trim() === '' || String(text).trim() === '',
        [title, text],
    );

    const {top: SAFE_AREA_TOP} = useSafeAreaInsets();

    const {keyboardVisible, dismissKeyboard} = useKeyboard();

    const alignType: 'LEFT' | 'CENTER' | 'RIGHT' = useMemo(() => {
        switch (align) {
            case 'left':
                return 'LEFT';
            case 'right':
                return 'RIGHT';
            case 'center':
                return 'CENTER';
        }
    }, [align]);

    const setLetterData = useCallback(() => {
        setLetter({
            title: title.replace(/(⌜|⌟︎)/g, ''),
            text,
            paperColor,
            paperStyle,
            alignType,
            images,
        });
        setInitialCoverData();
    }, [
        setLetter,
        title,
        text,
        paperColor,
        paperStyle,
        alignType,
        images,
        setInitialCoverData,
    ]);

    const setDeliveryLetterDataOnStore = useCallback(
        (id: number) => {
            const deliberyLetterData = {
                id,
                title: title.replace(/(⌜|⌟︎)/g, ''),
                content: text,
                paperType: paperStyle,
                paperColor,
                alignType,
                files: images,
                stampId: undefined,
            };

            setDeliveryLetterData(deliberyLetterData);
        },
        [
            alignType,
            images,
            paperColor,
            paperStyle,
            setDeliveryLetterData,
            text,
            title,
        ],
    );

    const onFocusTitle = () => {
        setLastestFocus({name: 'title', ref: titleRef});

        setTitle(title.replace(/(⌜|⌟︎)/g, ''));

        if (paperSelectorVisible) {
            setPaperSelectorVisible(false);
        }
    };

    const onFocusText = () => {
        setLastestFocus({name: 'text', ref: textRef});

        if (paperSelectorVisible) {
            setPaperSelectorVisible(false);
        }
    };

    const onFocusOutTitle = () => {
        if (title) {
            setTitle('⌜' + title.slice(0, 30) + '⌟︎');
        }
    };

    const onChangeSelection = ({
        nativeEvent: {selection: currentSelection},
    }: {
        nativeEvent: {selection: Selector};
    }) => {
        selection.current = currentSelection;
    };

    const onShowPaper = useCallback(() => {
        if (paperSelectorVisible) {
            setPaperSelectorVisible(false);
        } else {
            dismissKeyboard();
            if (texticonSelectorVisible) {
                setTexticonSelectorVisible(false);
            }
            setTimeout(() => {
                setPaperSelectorVisible(true);
            }, 300);
        }
    }, [dismissKeyboard, paperSelectorVisible, texticonSelectorVisible]);

    const onToggleTextAlign = useCallback(() => {
        switch (align) {
            case 'left':
                setAlign('center');
                break;
            case 'center':
                setAlign('right');
                break;
            case 'right':
                setAlign('left');
                break;
        }
    }, [align]);

    const onShowTexticon = useCallback(() => {
        if (texticonSelectorVisible) {
            setTexticonSelectorVisible(false);
            if (lastestFocus) {
                lastestFocus.ref.current.blur();
                setTimeout(() => {
                    lastestFocus.ref.current.focus();
                }, 1);
            }
        } else {
            dismissKeyboard();
            if (paperSelectorVisible) {
                setPaperSelectorVisible(false);
            }
            setTimeout(() => {
                setTexticonSelectorVisible(true);
            }, 300);
            setTimeout(() => {
                lastestFocus?.ref.current.focus();
            }, 600);
        }
    }, [
        dismissKeyboard,
        lastestFocus,
        paperSelectorVisible,
        texticonSelectorVisible,
    ]);

    const paddingOn = useMemo(
        () =>
            !keyboardVisible &&
            !paperSelectorVisible &&
            !texticonSelectorVisible,
        [keyboardVisible, paperSelectorVisible, texticonSelectorVisible],
    );

    const setCurrentSelection = useCallback((length: number) => {
        selection.current = {
            start: selection.current.start + length,
            end: selection.current.end + length,
        };
    }, []);

    const pickImage = useCallback(async () => {
        // No permissions request is necessary for launching the image library
        let result = await imagePicker.launchImageLibraryAsync({
            allowsMultipleSelection: true,
        });

        console.log(result);

        if (!result.cancelled) {
            setLoadingImage(true);
            handleImagePicked(result.selected.slice(0, 5));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleImagePicked = async (pickerResult: imagePicker.ImageInfo[]) => {
        try {
            const ids = await Promise.all(
                pickerResult.map(async localImg => {
                    const img = await fetchImageFromUri(localImg.uri);
                    return await uploadImage(img, localImg.fileName);
                }),
            );
            setImages(ids);
        } catch (err: any) {
            console.error(err.message);
        } finally {
            setLoadingImage(false);
        }
    };

    const fetchImageFromUri = async (uri: string) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    };

    const uploadImage = async (
        img: Blob,
        filename?: string | null,
    ): Promise<string> => {
        const presignUrl = await getImageUploadUrl(
            filename ?? 'UNKNOWN_FILENAME',
        );

        console.log(presignUrl);

        await fetch(presignUrl.uploadUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'image/*',
            },
            body: img,
        });

        console.log('Image Upload Success');

        return presignUrl.id;
    };

    const deleteImage = useCallback(
        async (id: string) => {
            setImages([...images].filter(img => img !== id));
        },
        [images],
    );

    const onShowImageModal = useCallback(() => {
        setImageModalVisible(true);
    }, [setImageModalVisible]);

    const goBack = useCallback(() => {
        navigation.pop();
    }, [navigation]);

    const getStampQuantity = useCallback(async () => {
        try {
            const {stampQuantity} = await getUserInfo();
            setStampQuantity(stampQuantity);
        } catch (error: any) {
            console.error(error.message);
        }
    }, [setStampQuantity]);

    const goNext = useCallback(() => {
        getStampQuantity();
        if (!route.params) {
            setLetterData();
            navigation.navigate('CoverTopicEditor');
        } else {
            setDeliveryLetterDataOnStore(route.params.reply);
            navigation.navigate('CoverDeliverySelector', {
                reply: route.params.reply,
                to: route.params.to,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation, setDeliveryLetterDataOnStore, setLetterData]);

    useEffect(() => {
        if (Platform.OS === 'ios') {
            const tempText = text;
            setText('');
            lastestFocus.ref.current.blur();
            setTimeout(() => {
                setText(tempText);
            }, 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alignType]);

    const setTexticonIntoText = useCallback(
        (selectedTexticon: string) => {
            if (lastestFocus.name === 'title') {
                const newTitle = [
                    title.slice(0, selection.current.start),
                    selectedTexticon,
                    title.slice(selection.current.end),
                ].join('');

                setTitle(newTitle);

                setCurrentSelection(selectedTexticon.length);
            } else if (lastestFocus.name === 'text') {
                const newText = [
                    text.slice(0, selection.current.start),
                    selectedTexticon,
                    text.slice(selection.current.end),
                ].join('');

                setText(newText);

                setCurrentSelection(selectedTexticon.length);
            }
        },
        [lastestFocus, selection, setCurrentSelection, text, title],
    );

    return (
        <PaperBackgroud paperColor={paperColor} paperStyle={paperStyle}>
            <View style={[styles.container, {paddingTop: SAFE_AREA_TOP}]}>
                <Header2
                    title={'편지 작성'}
                    onPressBack={goBack}
                    onPressNext={goNext}
                    disableNext={disableNext}
                />

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={{flex: 1, marginTop: 24}}>
                    <View style={{flex: 1}}>
                        <TextInput
                            value={title}
                            onChangeText={setTitle}
                            placeholder={'⌜제목⌟︎'}
                            onFocus={onFocusTitle}
                            onBlur={onFocusOutTitle}
                            autoCorrect={false}
                            showSoftInputOnFocus={!texticonSelectorVisible}
                            ref={titleRef}
                            onSelectionChange={onChangeSelection}
                            placeholderTextColor="#00000066"
                            style={[
                                styles.titleInput,
                                {
                                    textAlign: align,
                                    // textAlign: align.current,
                                },
                            ]}
                        />

                        <TextInput
                            value={text}
                            key="text"
                            onChangeText={setText}
                            multiline
                            placeholder="내용"
                            onFocus={onFocusText}
                            autoCorrect={false}
                            ref={textRef}
                            onSelectionChange={onChangeSelection}
                            showSoftInputOnFocus={!texticonSelectorVisible}
                            placeholderTextColor="#00000066"
                            style={[
                                styles.textInput,
                                {
                                    textAlign: align,
                                },
                            ]}
                        />
                    </View>

                    <View style={styles.bottom}>
                        <ImagePicker
                            images={images}
                            loading={isLoadingImage}
                            deleteImage={deleteImage}
                            onShowImageModal={onShowImageModal}
                        />
                        <BottomBar
                            paddingOn={paddingOn}
                            align={align}
                            onToggleTextAlign={onToggleTextAlign}
                            onShowPaper={onShowPaper}
                            onShowTexticon={onShowTexticon}
                            pickImage={pickImage}
                        />
                        {paperSelectorVisible && (
                            <PaperSelector
                                setPaperColor={setPaperColor}
                                paperColor={paperColor}
                                setPaperStyle={setPaperStyle}
                                paperStyle={paperStyle}
                            />
                        )}
                        {texticonSelectorVisible && (
                            <TexticonSelector
                                setSelectedCategory={setSelectedCategory}
                                selectedCategory={selectedCategory}
                                onSelectTexticon={setTexticonIntoText}
                            />
                        )}
                    </View>
                </KeyboardAvoidingView>

                {isImageModalVisible && <ModalBlur />}
                <ImageModal
                    isImageModalVisible={isImageModalVisible}
                    setImageModalVisible={setImageModalVisible}
                    images={images}
                />
            </View>
        </PaperBackgroud>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1},
    titleInput: {
        padding: 0,
        height: 40,
        fontSize: 14,
        fontFamily: 'Galmuri11',
        marginHorizontal: 24,
        color: '#0000cc',
    },
    textInput: {
        lineHeight: 30,
        fontSize: 14,
        fontFamily: 'Galmuri11',
        paddingHorizontal: 24,
        paddingBottom: 40,
        color: '#0000cc',
    },
    bottom: {
        backgroundColor: '#0000cc',
        position: 'relative',
    },
});
