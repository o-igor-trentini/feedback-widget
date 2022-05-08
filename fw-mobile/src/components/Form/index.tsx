import * as FileSystem from 'expo-file-system';
import { ArrowLeft } from 'phosphor-react-native';
import React, { FC, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { captureScreen } from 'react-native-view-shot';
import { api } from '../../libs/api';
import { theme } from '../../theme';
import { feedbackTypes } from './../../utils/feedbackTypes';
import { FeedbackButton } from './../FeedbackButton';
import { ScreenshotButton } from './../ScreenshotButton';
import { FeedbackType } from './../Widget/index';
import { styles } from './styles';

interface Props {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSent: () => void;
}

export const Form: FC<Props> = ({ feedbackType, onFeedbackCanceled, onFeedbackSent }) => {
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const feedbackTypeInfo = feedbackTypes[feedbackType];
    const [comment, setComment] = useState<string>('');

    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8,
        })
            .then((uri) => {
                setScreenshot(uri);
            })
            .catch((error) => console.log(error));
    }

    function handleScreenshotRemove() {
        setScreenshot(null);
    }

    async function handleSendFeedback() {
        if (isSendingFeedback) return;

        setIsSendingFeedback(true);

        const screenshotBase64 = screenshot && (await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' }));

        try {
            await api.post('/feedbacks', {
                type: feedbackType,
                screenshot: `data:image/png;base64, ${screenshotBase64}`,
                comment,
            });
            onFeedbackSent();
        } catch (error) {
            console.log(error);
            setIsSendingFeedback(false);
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onFeedbackCanceled}>
                    <ArrowLeft size="24" weight="bold" color={theme.colors.text_secondary} />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Image source={feedbackTypeInfo.image} style={styles.image} />
                    <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
                </View>
            </View>

            <TextInput
                multiline
                style={styles.input}
                placeholder=""
                placeholderTextColor={theme.colors.text_secondary}
                onChangeText={setComment}
                autoCorrect={false}
            />

            <View style={styles.footer}>
                <ScreenshotButton
                    onTakeShot={handleScreenshot}
                    onRemoveShot={handleScreenshotRemove}
                    screenshot={screenshot}
                />
                <FeedbackButton onPress={handleSendFeedback} isLoading={isSendingFeedback} />
            </View>
        </View>
    );
};
