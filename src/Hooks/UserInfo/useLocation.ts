import {useEffect, useMemo, useRef, useState} from 'react';
import {Animated} from 'react-native';
import Toast from '../../Components/Toast/toast';
import {useQuery} from 'react-query';
import {getCities, getRegions} from '../../APIs/geolocation';
import {useAuthAction} from '../../Store/auth';

export const useLocation = () => {
  const [selectedRegionId, setSelectedRegionId] = useState<null | number>(0);
  const [selectedCityId, setSelectedCityId] = useState<number>(0);

  const {setGeolocationIdInRegisterInfo} = useAuthAction();

  useEffect(() => {
    setGeolocationIdInRegisterInfo(selectedCityId);
  }, [selectedCityId, setGeolocationIdInRegisterInfo]);

  const noticeOpacity = useRef(new Animated.Value(0)).current;

  const alert = Animated.sequence([
    Animated.timing(noticeOpacity, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }),
    Animated.timing(noticeOpacity, {
      toValue: 0,
      delay: 2000,
      useNativeDriver: true,
    }),
  ]);

  const onStartNotice = () => {
    alert.reset();
    alert.start();
  };

  const disable = useMemo(
    () => !selectedCityId || !selectedRegionId,
    [selectedCityId, selectedRegionId],
  );

  const {data: regions} = useQuery(
    'regions',
    async () =>
      (await getRegions()).map(({id, name}) => {
        return {value: id, label: name};
      }),
    {
      onError: (error: any) => {
        console.error(error.message);
        Toast.show('문제가 발생했습니다');
      },
    },
  );

  const {data: cities} = useQuery(
    ['cities', selectedRegionId],
    async () => {
      setSelectedCityId(0);
      if (selectedRegionId) {
        return (await getCities(selectedRegionId))
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map(({id, name}) => {
            return {value: id, label: name};
          });
      }
    },
    {
      onError: (error: any) => {
        console.error(error.message);
        Toast.show('문제가 발생했습니다');
      },
    },
  );

  return {
    regions: regions || [],
    selectedRegionId,
    setSelectedRegionId,
    cities: cities || [],
    selectedCityId,
    setSelectedCityId,
    noticeOpacity,
    onStartNotice,
    disable,
  };
};
