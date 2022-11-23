import React from 'react';
import {Image, ImageBackground, ScrollView, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import useStore from '../../Store/store';
import {TopicItem} from '../TopicItem';
import {PersonalityItem} from '../PersonalityItem';
import {GRADIENT_COLORS} from '../../Constants/letter';
import {SCREEN_WIDTH} from '../../Constants/screen';

const SelectedStampImage = () => {
    const {cover, stamps} = useStore();
    return (
        <>
            {cover.stamp ? (
                <Image
                    style={{
                        width: '85%',
                        height: undefined,
                        aspectRatio: 94 / 116,
                        backgroundColor: '#0000cc13',
                    }}
                    source={
                        stamps.find(stamp => stamp.id === cover.stamp)?.image
                    }
                />
            ) : (
                <View
                    style={{
                        width: '85%',
                        height: undefined,
                        aspectRatio: 94 / 116,
                        backgroundColor: '#0000cc13',
                        borderColor: '#0000cc',
                        borderStyle: 'dashed',
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image
                        style={{height: 18, width: 18}}
                        source={require('../../Assets/photo_blue.png')}
                    />
                </View>
            )}
        </>
    );
};

export const LetterCoverPreview = React.memo(() => {
    const {userInfo, cover, topics, personalities, letter} = useStore();

    return (
        <LinearGradient
            colors={[GRADIENT_COLORS[letter?.paperColor ?? 'PINK'], 'white']}
            style={{
                width: SCREEN_WIDTH - 80,
                height: undefined,
                aspectRatio: 295 / 212,
                borderColor: '#0000cc',
                borderWidth: 1,
                borderRadius: 10,
                padding: 16,
                justifyContent: 'space-between',
            }}>
            <View
                style={{
                    flexDirection: 'row',
                }}>
                <View style={{flex: 173, flexWrap: 'wrap', marginRight: 16}}>
                    <Text
                        style={{
                            width: '100%',
                            fontSize: 15,
                            fontFamily: 'Galmuri11',
                            color: '#0000CC',
                            lineHeight: 30,
                        }}>
                        ⌜{letter?.title}⌟︎︎
                    </Text>
                    <Image
                        source={require('../../Assets/From..png')}
                        style={{height: 22, width: 48, resizeMode: 'contain'}}
                    />
                    <Text
                        style={{
                            marginLeft: 30,
                            fontSize: 15,
                            fontFamily: 'Galmuri11',
                            color: '#0000CC',
                            lineHeight: 30,
                        }}>
                        {userInfo?.nickname}
                    </Text>
                </View>
                <View style={{flex: 74}}>
                    <ImageBackground
                        source={require('../../Assets/stamp.png')}
                        style={{
                            width: 74,
                            height: undefined,
                            aspectRatio: 94 / 116,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <SelectedStampImage />
                    </ImageBackground>
                </View>
            </View>
            <View>
                <ScrollView
                    horizontal
                    alwaysBounceHorizontal={false}
                    showsHorizontalScrollIndicator={false}>
                    {topics
                        .filter(({id}) => cover.topicIds.includes(id))
                        .map(topic => (
                            <TopicItem
                                key={topic.id}
                                topic={topic}
                                parent="preview"
                            />
                        ))}
                </ScrollView>
            </View>
            <View>
                <ScrollView
                    horizontal
                    alwaysBounceHorizontal={false}
                    showsHorizontalScrollIndicator={false}>
                    {personalities
                        .filter(({id}) => cover.personalityIds.includes(id))
                        .map(personality => (
                            <PersonalityItem
                                key={personality.id}
                                personality={personality}
                                parent="preview"
                            />
                        ))}
                </ScrollView>
            </View>
        </LinearGradient>
    );
});
