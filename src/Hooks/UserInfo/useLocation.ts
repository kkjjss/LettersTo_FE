import {useEffect, useMemo, useRef, useState} from 'react';
import {Animated} from 'react-native';
import {getCities, getRegions} from '../../APIs/geolocation';

export const useLocation = () => {
  const [regions, setRegions] = useState([{label: '', value: 0}]);
  const [selectedRegionId, setSelectedRegionId] = useState<null | number>(null);

  const [cities, setCities] = useState([{label: '', value: 0}]);
  const [selectedCityId, setSelectedCityId] = useState<null | number>(null);

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

  useEffect(() => {
    const getRegionsList = async () => {
      const regionsList = (await getRegions()).map(({id, name}) => {
        return {value: id, label: name};
      });
      setRegions(regionsList);
    };

    getRegionsList();
  }, []);

  useEffect(() => {
    const getCitiesList = async (regionId: number) => {
      const citiesList = (await getCities(regionId)).map(({id, name}) => {
        return {value: id, label: name};
      });
      setCities(citiesList);
    };

    if (selectedRegionId) {
      getCitiesList(selectedRegionId);
    } else {
      setCities([{label: '', value: 0}]);
    }

    setSelectedCityId(null);
  }, [selectedRegionId]);

  return {
    regions,
    selectedRegionId,
    setSelectedRegionId,
    cities,
    selectedCityId,
    setSelectedCityId,
    noticeOpacity,
    onStartNotice,
    disable,
  };
};
