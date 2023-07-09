import { MapPinIcon, ClockIcon, PhoneIcon } from '@heroicons/react/24/solid';

/** ---------------------------------------------------------------------------------------------------------------------
 * @param  {string}    address             地址
 * @param  {string}    openTime            開放時間
 * @param  {string}    phone               聯絡電話
 * @param  {string}    [backgroundColor]   background 顏色
 * @param  {string}    [iconColor]         icon 顏色
 *
 * @return {html}
 */
function Info({ address, openTime, phone, backgroundColor, iconColor }) {
  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <div
        className="w-full mt-6 p-4 rounded-lg bg-pale_primary text-text_primary"
        style={{ backgroundColor: backgroundColor }}
      >
        {address && (
          <p className="flex items-center">
            <MapPinIcon
              className="w-[1.28rem] h-[1.28rem] mr-2 shrink-0 text-primary"
              style={{ color: iconColor }}
            />
            {address}
          </p>
        )}
        {openTime && (
          <p className="flex items-center mt-2 ipad:mt-4">
            <ClockIcon
              className="w-[1.28rem] h-[1.28rem] mr-2 shrink-0 text-primary"
              style={{ color: iconColor }}
            />
            {openTime}
          </p>
        )}
        {phone && (
          <p className="flex items-center mt-2 ipad:mt-4">
            <PhoneIcon
              className="w-[1.28rem] h-[1.28rem] mr-2 shrink-0 text-primary"
              style={{ color: iconColor }}
            />
            {phone}
          </p>
        )}
      </div>
    </>
  );
}

export default Info;
