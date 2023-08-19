import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

/** ---------------------------------------------------------------------------------------------------------------------
 * Components: Input Field
 * @param  {string}            name              必填
 * @param  {string}            [type]            "text", "email", "number"
 * @param  {string}            [value]           值
 * @param  {string}            [autoComplete]    "off, "on"
 * @param  {undefined|string}  [label]           文字框上方
 * @param  {boolean}           [required]        是否為必填
 * @param  {svg}               [inputEndIcon]    傳入icon, ex:<CueIcon />
 * @param  {boolean}           [disabled]        是否可編輯
 * @param  {boolean}           [error]           是否顯示錯誤
 * @param  {object}            [validity]        參數來自瀏覽器 e.target.validity
 * @param  {fuction}           [onChange]        事件
 * @param  {undefined|string}  [placeholder]     placeholder
 * @param  {number}            [maxLength]       input欄位, 最多可以多少字
 *
 * @return {html}
 */
function InputField({
  name,
  type = 'text',
  value = '',
  autoComplete = 'off',
  label = undefined,
  required = false,
  inputEndIcon,
  disabled = false,
  error = false,
  validity = {},
  onChange = () => {},
  pattern = undefined,
  placeholder = undefined,
  maxLength = undefined,
}) {
  /** ---------------------------------------------------------------------------------------------
   * Hook: error message
   */
  const errorMessage = useErrorMessage({
    name: name,
    validity: validity,
    label: label,
  });

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      {typeof label === 'string' && (
        <label htmlFor={name}>
          {label}
          {required && <span>*</span>}
        </label>
      )}

      <div className="relative">
        <input
          name={name}
          type={type}
          value={value}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          onChange={(e) => onChange(e)}
          placeholder={placeholder}
          pattern={pattern}
          maxLength={maxLength}
          className="w-full px-3 py-2 rounded-lg border border-line bg-background_gray text-lg placeholder:text-text_tertiary focus:outline-none"
        />
        {typeof inputEndIcon === 'object' && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {inputEndIcon}
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center mt-1 text-rose-500">
          <ExclamationCircleIcon className="h-6 w-6 mr-1" />
          {errorMessage}
        </div>
      )}
    </>
  );
}

export default InputField;

/** --------------------------------------------------------------------------------------------------------------------------------
 * Error Message: 轉換成自定義錯誤訊息 & 目前使用的語言
 * @param  {string}     name         input name
 * @param  {string}     validity     參數來自瀏覽器 e.target.validity
 * @return {string}     errorMessage
 */
const useErrorMessage = ({ name, validity }) => {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation(['validity']);

  /** ---------------------------------------------------------------------------------------------
   * State
   * @type {string}     errorMessage        錯誤訊息
   */
  const [errorMessage, setErrorMessage] = useState('');

  /** ---------------------------------------------------------------------------------------------
   * Hook
   */
  useEffect(() => {
    let message = '';
    let validityText = {};

    // console.log(name, validity); //FIXME:

    if (name) {
      validityText.typeMismatch = t('typeMismatch');
      validityText.valueMissing = t('valueMissing');
      validityText.patternMismatch = t('patternMismatch');
      validityText.badInput = t('badInput');
      validityText.stepMismatch = t('stepMismatch');
      validityText.rangeOverflow = t('rangeOverflow');
      validityText.rangeUnderflow = t('rangeUnderflow');
      validityText.other = t('other');
    }

    if (validity?.typeMismatch) {
      message = `${validityText.typeMismatch}`;
    } else if (validity?.valueMissing) {
      message = `${validityText.valueMissing}`;
    } else if (validity?.patternMismatch) {
      message = `${validityText.patternMismatch}`;
    } else if (validity?.badInput) {
      // number
      message = `${validityText.badInput}`;
    } else if (validity?.stepMismatch) {
      // number
      message = `${validityText.stepMismatch}`;
    } else if (validity?.rangeOverflow) {
      // number
      message = `${validityText.rangeOverflow}`;
    } else if (validity?.rangeUnderflow) {
      // number
      message = `${validityText.rangeUnderflow}`;
    } else {
      message = `${validityText.other}`;
    }

    // console.log(message); //FIXME:
    setErrorMessage(message);
  }, [t, name, validity]);

  return errorMessage;
};
