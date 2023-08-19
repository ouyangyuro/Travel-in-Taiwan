import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import {
  XMarkIcon,
  MagnifyingGlassIcon,
  ArrowDownCircleIcon,
} from '@heroicons/react/24/solid';

import Spot from '@image/spot';
import Food from '@image/food';
import Activity from '@image/activity';
import Hotel from '@image/hotel';

import InputField from '@components/inputField';

import useOnClickOutside from '@hooks/useOnClickOutside';

import { setIsOpen, setIsTransform } from '@redux/hambuage';

import cx from '@utils/cx';

import styles from './index.module.scss';

/**
 * Hambuage 漢堡清單
 */
export default function Hambuage() {
  /** ---------------------------------------------------------------------------------------------
   *  Basic
   */
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const router = useRouter();

  /** ---------------------------------------------------------------------------------------------
   *  State
   *  @type {boolean}    isTransform      轉場效果開關
   *
   *  @type {object}     city             目的地城市
   *  @type {string}     theme            主題
   *  @type {boolean}    isOpenList       城市列表開關
   *  @type {string}     keyword          關鍵字
   *
   *  @type {boolean}    isOpenListRef    div DOM
   */
  const { isTransform } = useSelector((state) => state.hambuage);

  const [city, setCity] = useState({ name: '', value: '' });
  const [theme, setTheme] = useState('');
  const [isOpenList, setIsOpenList] = useState(false);
  const [keyword, setKeyword] = useState({
    value: '',
    error: {
      state: false,
      validity: {},
    },
  });

  const isOpenListRef = useRef();

  /** ---------------------------------------------------------------------------------------------
   *  Hook: 判定 mouse 是在 element 外面還是裡面 click
   *  名稱: clicks outside of a specified element
   */
  useOnClickOutside(isOpenListRef, () => setIsOpenList(false));

  /** ---------------------------------------------------------------------------------------------
   *  onClick: Close 漢堡選單 + 轉場效果
   */
  const handleClose = (e) => {
    e.preventDefault();

    dispatch(setIsTransform(false));
    setTimeout(() => {
      dispatch(setIsOpen(false));
      document.body.style = {};
    }, 400);
  };

  /** ---------------------------------------------------------------------------------------------
   *  onClick: toggle city list
   */
  const handleToggleList = (e) => {
    e.preventDefault();
    setIsOpenList(!isOpenList);
  };

  /** ---------------------------------------------------------------------------------------------
   *  onClick: clear select city
   */
  const handleClearSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCity({ name: '', value: '' });
  };

  /** ---------------------------------------------------------------------------------------------
   *  onChange: input change
   */
  const handleInputUpdate = (e) => {
    switch (e.target.name) {
      case 'keyword':
        setKeyword({
          ...keyword,
          value: e.target.value,
          error: { state: false },
        });
        break;
    }
  };

  /** ---------------------------------------------------------------------------------------------
   *  onClick: search btn
   */
  const handleSearchBtn = (e) => {
    e.preventDefault();

    router.push(
      `/search?city=${city.value}&type=${theme}&keyword=${keyword.value}`
    );

    // Close 漢堡選單 + 轉場效果
    dispatch(setIsTransform(false));
    setTimeout(() => {
      dispatch(setIsOpen(false));
      document.body.style = {};
    }, 400);
  };

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.box} ${cx(isTransform && styles.drawer)}`}>
          <div className={styles.content}>
            <div className={styles.closeBox}>
              <button onClick={handleClose} className={styles.icon}>
                <XMarkIcon className="h-6 w-6 text-primary" />
              </button>
            </div>

            {/* 選擇目的地 */}
            <div ref={isOpenListRef} className="my-3 relative">
              <button
                onClick={handleToggleList}
                type="button"
                className="w-full px-3 py-2 flex justify-between items-center rounded-lg border border-line bg-background_gray"
              >
                {city.name === '' ? (
                  <span className="text-lg text-text_tertiary">
                    {t('menu.city')}
                  </span>
                ) : (
                  <span className="text-lg text-text_primary flex items-center">
                    {city.name}
                    <XMarkIcon
                      className="h-6 w-6 ml-2 text-text_tertiary"
                      onClick={handleClearSelect}
                    />
                  </span>
                )}
                <ArrowDownCircleIcon className="h-6 w-6 text-primary" />
              </button>
              {isOpenList && <CityList city={city} setCity={setCity} />}
            </div>

            {/* 搜尋關鍵字 */}
            <div className="my-3">
              <InputField
                name="keyword"
                value={keyword.value}
                placeholder={t('menu.keyword')}
                onChange={handleInputUpdate}
                inputEndIcon={
                  <MagnifyingGlassIcon className="h-6 w-6 text-primary" />
                }
              />
            </div>

            {/* 選擇主題 */}
            <div className="my-3">
              <p className="mb-3 font-bold text-lg text-text_primary">
                {t('menu.theme')}
              </p>
              <ThemeList theme={theme} setTheme={setTheme} />
            </div>

            {/* 開始搜尋 btn */}
            <button
              className="w-full p-2 rounded-lg text-base text-background_white bg-primary disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={!theme && !city.value && !keyword.value}
              onClick={handleSearchBtn}
            >
              {t('menu.search')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/** --------------------------------------------------------------------------------------------------------------------------------
 *  CityList
 *  @type {object}     city       目的地城市
 *  @type {function}   setCity    控制目的地城市
 */
const CityList = ({ city, setCity }) => {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation(['common']);

  /** ---------------------------------------------------------------------------------------------
   * List: Select City List
   */
  const cityList = [
    {
      name: t('city.taipei'),
      value: 'Taipei',
    },
    {
      name: t('city.newtaipei'),
      value: 'NewTaipei',
    },
    {
      name: t('city.taoyuan'),
      value: 'Taoyuan',
    },
    {
      name: t('city.taichung'),
      value: 'Taichung',
    },
    {
      name: t('city.tainan'),
      value: 'Tainan',
    },
    {
      name: t('city.kaohsiung'),
      value: 'Kaohsiung',
    },
    {
      name: t('city.keelung'),
      value: 'Keelung',
    },
    {
      name: t('city.hsinchu'),
      value: 'Hsinchu',
    },
    {
      name: t('city.hsinchucounty'),
      value: 'HsinchuCounty',
    },
    {
      name: t('city.miaolicounty'),
      value: 'MiaoliCounty',
    },
    {
      name: t('city.changhuacounty'),
      value: 'ChanghuaCounty',
    },
    {
      name: t('city.nantoucounty'),
      value: 'NantouCounty',
    },
    {
      name: t('city.yunlincounty'),
      value: 'YunlinCounty',
    },
    {
      name: t('city.chiayicounty'),
      value: 'ChiayiCounty',
    },
    {
      name: t('city.chiayi'),
      value: 'Chiayi',
    },
    {
      name: t('city.pingtungcounty'),
      value: 'PingtungCounty',
    },
    {
      name: t('city.yilancounty'),
      value: 'YilanCounty',
    },
    {
      name: t('city.hualiencounty'),
      value: 'HualienCounty',
    },
    {
      name: t('city.taitungcounty'),
      value: 'TaitungCounty',
    },
    {
      name: t('city.kinmencounty'),
      value: 'KinmenCounty',
    },

    {
      name: t('city.penghucounty'),
      value: 'PenghuCounty',
    },
    {
      name: t('city.lienchiangcounty'),
      value: 'LienchiangCounty',
    },
  ];

  /** ---------------------------------------------------------------------------------------------
   *  onClick: select city
   */
  const handleSelectCity = (cityValue) => (e) => {
    e.preventDefault();
    setCity(cityValue);
  };

  // ---------------------------------------------------------------------------------------------

  return (
    <div className="absolute w-full z-50 bg-white p-3 grid grid-cols-3 gap-y-3 gap-x-6 shadow-3xl rounded-xl">
      {cityList.map((item) => (
        <button
          onClick={handleSelectCity(item)}
          key={item.value}
          className={`${
            city.value === item.value
              ? 'bg-primary text-white'
              : 'bg-background_white'
          } p-2 rounded-lg border border-primary text-lg text-text_primary line-clamp-1 break-words`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

/** --------------------------------------------------------------------------------------------------------------------------------
 *  ThemeList
 *  @type {object}     theme       主題
 *  @type {function}   setTheme    控制主題
 */
const ThemeList = ({ theme, setTheme }) => {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation(['common']);

  /** ---------------------------------------------------------------------------------------------
   * List: Select City List
   */
  const themeList = [
    {
      name: t('theme.scenic_spot'),
      img: <Spot />,
      value: 'ScenicSpot',
    },
    {
      name: t('theme.activity'),
      img: <Activity />,
      value: 'Activity',
    },
    {
      name: t('theme.restaurant'),
      img: <Food />,
      value: 'Restaurant',
    },
    {
      name: t('theme.hotel'),
      img: <Hotel />,
      value: 'Hotel',
    },
  ];

  /** ---------------------------------------------------------------------------------------------
   *  onClick: select theme
   */
  const handleSelectTheme = (themeValue) => (e) => {
    e.preventDefault();

    if (themeValue === theme) {
      setTheme('');
    } else {
      setTheme(themeValue);
    }
  };

  // ---------------------------------------------------------------------------------------------

  return (
    <div className="grid grid-cols-2 gap-y-3 gap-x-4">
      {themeList.map((item) => (
        <button
          key={item.value}
          onClick={handleSelectTheme(item.value)}
          className={`p-2 border-2 rounded-lg text-base  ${
            theme === item.value ? 'border-primary' : 'border-white'
          }`}
        >
          <div
            className={`w-[70px] h-[70px] mx-auto mb-1 flex justify-center items-center rounded-full bg-primary ${
              item.value === 'Activity' && 'bg-secondary'
            } ${item.value === 'Restaurant' && 'bg-tertiary'} ${
              item.value === 'Hotel' && 'bg-quaternary'
            }`}
          >
            {item.img}
          </div>
          {item.name}
        </button>
      ))}
    </div>
  );
};
