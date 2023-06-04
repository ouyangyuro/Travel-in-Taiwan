import { MapPinIcon, ClockIcon, PhoneIcon } from '@heroicons/react/24/solid';

/** ---------------------------------------------------------------------------------------------------------------------
 * @param  {string}    address     地址
 * @param  {string}    openTime    開放時間
 * @param  {string}    phone       聯絡電話
 *
 * @return {html}
 */
function Info({ address, openTime, phone }) {
  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <div className="w-full mt-6 p-4 rounded-lg bg-pale_primary text-text_primary">
        <p className="flex items-center">
          <MapPinIcon className="w-[1.28rem] h-[1.28rem] mr-2 shrink-0 text-primary" />
          {address}
        </p>
        <p className="flex items-center mt-2 ipad:mt-4">
          <ClockIcon className="w-[1.28rem] h-[1.28rem] mr-2 shrink-0 text-primary" />
          {openTime}
        </p>
        <p className="flex items-center mt-2 ipad:mt-4">
          <PhoneIcon className="w-[1.28rem] h-[1.28rem] mr-2 shrink-0 text-primary" />
          {phone}
        </p>
      </div>
    </>
  );
}

export default Info;
