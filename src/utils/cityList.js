import { i18n } from 'next-i18next';

/**
 * -------------------------------------------------------------------------------------------
 * Utils: city list
 * 說明: 城市列表
 *
 * @return {array}
 */

const cityList = () => {
  const city = [
    {
      name: i18n.t('common:city.taipei'),
      value: 'Taipei',
    },
    {
      name: i18n.t('common:city.newtaipei'),
      value: 'NewTaipei',
    },
    {
      name: i18n.t('common:city.taoyuan'),
      value: 'Taoyuan',
    },
    {
      name: i18n.t('common:city.taichung'),
      value: 'Taichung',
    },
    {
      name: i18n.t('common:city.tainan'),
      value: 'Tainan',
    },
    {
      name: i18n.t('common:city.kaohsiung'),
      value: 'Kaohsiung',
    },
    {
      name: i18n.t('common:city.keelung'),
      value: 'Keelung',
    },
    {
      name: i18n.t('common:city.hsinchu'),
      value: 'Hsinchu',
    },
    {
      name: i18n.t('common:city.hsinchucounty'),
      value: 'HsinchuCounty',
    },
    {
      name: i18n.t('common:city.miaolicounty'),
      value: 'MiaoliCounty',
    },
    {
      name: i18n.t('common:city.changhuacounty'),
      value: 'ChanghuaCounty',
    },
    {
      name: i18n.t('common:city.nantoucounty'),
      value: 'NantouCounty',
    },
    {
      name: i18n.t('common:city.yunlincounty'),
      value: 'YunlinCounty',
    },
    {
      name: i18n.t('common:city.chiayicounty'),
      value: 'ChiayiCounty',
    },
    {
      name: i18n.t('common:city.chiayi'),
      value: 'Chiayi',
    },
    {
      name: i18n.t('common:city.pingtungcounty'),
      value: 'PingtungCounty',
    },
    {
      name: i18n.t('common:city.yilancounty'),
      value: 'YilanCounty',
    },
    {
      name: i18n.t('common:city.hualiencounty'),
      value: 'HualienCounty',
    },
    {
      name: i18n.t('common:city.taitungcounty'),
      value: 'TaitungCounty',
    },
    {
      name: i18n.t('common:city.kinmencounty'),
      value: 'KinmenCounty',
    },

    {
      name: i18n.t('common:city.penghucounty'),
      value: 'PenghuCounty',
    },
    {
      name: i18n.t('common:city.lienchiangcounty'),
      value: 'LienchiangCounty',
    },
  ];

  return city;
};

export default cityList;
