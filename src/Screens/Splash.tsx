// Import React and Component
import React, {useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamsList} from '../types/stackParamList';
import {useAuthAction} from '../Store/auth';

type Props = NativeStackScreenProps<StackParamsList, 'Splash'>;

export function Splash({}: Props) {
  const authAction = useAuthAction();

  useEffect(() => {
    authAction.loginWithExistTokens();
  }, [authAction]);

  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={true}
        color="#6990F7"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
