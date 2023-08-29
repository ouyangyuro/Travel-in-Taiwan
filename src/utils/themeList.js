import { i18n } from 'next-i18next';

import Spot from '@image/spot';
import Food from '@image/food';
import Activity from '@image/activity';
import Hotel from '@image/hotel';

/**
 * -------------------------------------------------------------------------------------------
 * Utils: theme list
 * 說明: 主題列表
 *
 * @return {array}
 */

const themeList = () => {
  const theme = [
    {
      name: i18n.t('common:theme.scenic_spot'),
      img: <Spot />,
      value: 'ScenicSpot',
    },
    {
      name: i18n.t('common:theme.activity'),
      img: <Activity />,
      value: 'Activity',
    },
    {
      name: i18n.t('common:theme.restaurant'),
      img: <Food />,
      value: 'Restaurant',
    },
    {
      name: i18n.t('common:theme.hotel'),
      img: <Hotel />,
      value: 'Hotel',
    },
  ];

  return theme;
};

export default themeList;
