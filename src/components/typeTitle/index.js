import { MapPinIcon, ClockIcon, PhoneIcon } from '@heroicons/react/24/solid';

/** ---------------------------------------------------------------------------------------------------------------------
 * Components: Title
 * @param  {string}     title       副標題
 *
 * @return {html}
 */
function TypeTitle({ title }) {
  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <div className="flex items-center">
        <MapPinIcon className="w-6 h-6 mr-2 shrink-0 text-[#C499FF]" />
        <h2 className="font-bold text-2xl text-text_primary">{title}</h2>
      </div>
    </>
  );
}

export default TypeTitle;
