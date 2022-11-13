// import {TabActions} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {StackParamsList} from '../../types/stackParamList';
import {StyleSheet, View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {LinearGradient} from 'expo-linear-gradient';

type Props = NativeStackScreenProps<StackParamsList, 'LetterBox'>;

export function LetterBox({navigation}: Props) {

  const {top: SAFE_AREA_TOP} = useSafeAreaInsets();

  // const jumpToAction = TabActions.jumpTo('Home');

  // 메인 (편지탐색)
  const goHome = () => {
    navigation.navigate('Home');
    // navigation.dispatch(jumpToAction);
  };

  return (
    <LinearGradient
      locations={[0, 0.1, 0.8, 1]}
      colors={['#FFCCEE', 'white', 'white', '#FFFFCC']}
      style={styles.container}>
      {/* <SafeAreaView style={styles.container}> */}
      <View style={[styles.header, {marginTop: SAFE_AREA_TOP}]}>
        <View style={[styles.headerInner]}>
          <View style={{position: 'absolute', left: 16, flexDirection: 'row'}}>
            <TouchableOpacity activeOpacity={0.7}>
              <Image
                source={require('../../Assets/alert_off.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <View style={{marginLeft: 12}}>
              <Image
                source={require('../../Assets/alert_on.png')}
                style={styles.icon}
              />
            </View>
          </View>
          <Text style={styles.pageTitle}>내 사서함</Text>
          <View style={{position: 'absolute', right: 16, flexDirection: 'row'}}>
            <TouchableOpacity activeOpacity={0.7}>
              <Image
                source={require('../../Assets/menu.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.tabBottom}>
        <View style={styles.tabArea}>
          <Pressable onPress={goHome}>
            <View style={styles.tabInactive}>
              <Text style={styles.tabInactiveText}>편지탐색</Text>
              <Image
                source={require('../../Assets/triangle.png')}
                style={[styles.triangle, {right: 0}]}
              />
            </View>
          </Pressable>
          <Pressable disabled>
            <View style={styles.tabActive}>
              <Image
                source={require('../../Assets/triangle.png')}
                style={[styles.triangle, {left: '100%', transform: [{scaleX: -1}]}]}
              />
              <Text style={styles.tabActiveText}>내 사서함</Text>
            </View>
          </Pressable>
        </View>
      </View>
      {/* </SafeAreaView> */}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {position: 'absolute', zIndex: 10, top: 0, left: 0, width: '100%'},
  headerInner: {
    position: 'relative',
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  pageTitle: {fontFamily: 'Galmuri11', fontSize: 15, color: '#0000CC'},
  tabBottom: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 37,
    backgroundColor: '#0000CC'
  },
  tabArea: {
    position: 'absolute',
    left: 0,
    bottom: '100%',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  tabActive: {
    position: 'relative',
    right: 1,
    width: 164,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0000CC',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tabInactive: {
    width: 164,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#0000CC',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tabActiveText: {fontFamily: 'Galmuri11', fontSize: 15, color: 'white'},
  tabInactiveText: {fontFamily: 'Galmuri11', fontSize: 15, color: '#0000CC'},
  triangle: {position: 'absolute', bottom: 0, width: 4, height: 5},
  icon: {width: 28, height: 28},
});