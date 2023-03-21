// In App.js in a new project

import React, {useCallback, useEffect, useRef} from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import StackNavigator from './src/Navigator/Navigator';
import SplashScreen from 'react-native-splash-screen';
import {RootSiblingParent} from 'react-native-root-siblings';
import {QueryClientProvider, QueryClient} from 'react-query';
import analytics from '@react-native-firebase/analytics';

const queryClient = new QueryClient({});

export default function App() {
  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 1000);
  }, []);

  const routeNameRef = useRef<string>();
  const navigationRef = createNavigationContainerRef();

  /* const fetchRouteName = useCallback(
    () =>
      (routeNameRef.current = navigationRef.current.getCurrentRoute().name),
    [navigationRef],
  ); */

  const getInitialRouteName = useCallback(() => {
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
  }, [navigationRef]);

  return (
    <RootSiblingParent>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer
          ref={navigationRef}
          onReady={getInitialRouteName}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName =
              navigationRef.current?.getCurrentRoute()?.name;

            if (previousRouteName !== currentRouteName) {
              await analytics().logScreenView({
                screen_name: currentRouteName,
              });
            }

            routeNameRef.current = currentRouteName;
          }}>
          <StackNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </RootSiblingParent>
  );
}
