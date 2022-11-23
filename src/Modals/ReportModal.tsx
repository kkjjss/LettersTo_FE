import React, {useEffect, useMemo, useState} from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ResetButton} from '../Components/ResetButton';
import useStore from '../Store/store';
import {ModalHeader} from '../Components/ModalHeader';
import {SCREEN_HEIGHT} from '../Constants/screen';
import {TopicList} from '../Components/TopicList';
import {UpdateButton} from '../Components/UpdateButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {patchUserInfo} from '../APIs/member';
import {BottomButton} from '../Components/BottomButton';

const REPORT_ITEMS = [
  {id: 0, text: '욕설 및 비하발언 포함'},
  {id: 1, text: '음란한 내용 및 만남 유도'},
  {id: 2, text: '동일 내용 도배 및 부적절한 컨텐츠'},
  {id: 4, text: '기타'},
];

type Props = {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ReportModal = ({isModalVisible, setModalVisible}: Props) => {
  const [selectedReportItemId, setSelectedReportItemId] = useState<number>(0);

  const {bottom: SAFE_AREA_BOTTOM} = useSafeAreaInsets();

  const hideModal = () => {
    setModalVisible(false);
  };

  //   const updateTopics = async () => {
  //     try {
  //       if (userInfo && selectedTopicIds) {
  //         const newUserInfo = {
  //           topicIds: selectedTopicIds,
  //         };
  //         await patchUserInfo(newUserInfo);
  //       }

  //       hideModal();
  //     } catch (error: any) {
  //       console.error(error.message);
  //     }
  //   };

  //   useEffect(() => {
  //     if (userInfo) {
  //       setSelectedTopicIds(userInfo.topicIds);
  //     }
  //   }, [setSelectedTopicIds, userInfo]);

  return (
    <Modal
      statusBarTranslucent={true} // android
      animationType="slide"
      transparent={true}
      onRequestClose={hideModal}
      visible={isModalVisible}>
      <View style={styles.container}>
        <View style={[styles.modalView, {paddingBottom: SAFE_AREA_BOTTOM}]}>
          <ModalHeader title={'신고하기'} hideModal={hideModal} />

          <View style={styles.titleBox}>
            <View style={styles.titleWrap}>
              <Text style={styles.titleText}>신고 이유를 선택해주세요</Text>
            </View>
          </View>

          <View>
            {REPORT_ITEMS.map(REPORT_ITEM =>
              REPORT_ITEM.id === selectedReportItemId ? (
                <TouchableOpacity
                  key={REPORT_ITEM.id}
                  activeOpacity={0.7}
                  style={{
                    marginHorizontal: 24,
                    height: 52,
                    borderColor: '#0000cc',
                    borderRadius: 10,
                    borderWidth: 1,
                    marginBottom: 16,
                    alignItems: 'center',
                    padding: 16,
                    flexDirection: 'row',
                    backgroundColor: '#0000cc',
                  }}>
                  <View
                    style={{
                      borderColor: '#fff',
                      height: 24,
                      width: 24,
                      borderWidth: 1,
                      borderRadius: 12,
                      marginRight: 10,
                    }}></View>
                  <Text
                    style={{
                      fontFamily: 'Galmuri11',
                      fontSize: 14,
                      color: '#fff',
                    }}>
                    {REPORT_ITEM.text}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  key={REPORT_ITEM.id}
                  onPress={() => {
                    setSelectedReportItemId(REPORT_ITEM.id);
                  }}
                  activeOpacity={0.7}
                  style={{
                    marginHorizontal: 24,
                    height: 52,
                    borderColor: 'rgba(0,0,204,0.15)',
                    borderRadius: 10,
                    borderWidth: 1,
                    marginBottom: 16,
                    alignItems: 'center',
                    padding: 16,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      borderColor: 'rgba(0,0,204,0.3)',
                      height: 24,
                      width: 24,
                      borderWidth: 1,
                      borderRadius: 12,
                      marginRight: 10,
                    }}></View>
                  <Text
                    style={{
                      fontFamily: 'Galmuri11',
                      fontSize: 14,
                      color: 'rgba(0,0,204,0.6)',
                    }}>
                    {REPORT_ITEM.text}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </View>
          <BottomButton
            buttonText={'신고하기'}
            onPress={() => {
              console.log(1);
              hideModal();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  titleWrap: {
    marginBottom: 30,
    justifyContent: 'flex-end',
  },
  titleText: {fontSize: 18, fontFamily: 'Galmuri11', color: '#0000cc'},
  counterWrap: {alignItems: 'center', flexDirection: 'row'},
  counter: {
    width: 35,
    fontSize: 13,
    fontFamily: 'Galmuri11',
    color: '#0000cc',
    marginHorizontal: 8,
    textAlign: 'right',
  },
  topicBox: {
    marginHorizontal: 24,
  },
  alert: {
    marginHorizontal: 24,
    marginBottom: 10,
  },
  alertText: {
    fontFamily: 'Galmuri11',
    color: '#ff44cc',
  },
});
