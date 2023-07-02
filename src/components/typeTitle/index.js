import PropTypes from 'prop-types';
import { MapPinIcon } from '@heroicons/react/24/solid';

/** ---------------------------------------------------------------------------------------------------------------------
 * Components: Title
 * @param  {string}     title             副標題
 * @param  {string}     [iconColor]       icon 顏色
 *
 * @return {html}
 */
function TypeTitle({ title, iconColor }) {
  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <div className="flex items-center">
        <MapPinIcon
          className={`w-6 h-6 mr-2 shrink-0 text-primary`}
          style={{ color: iconColor }}
        />
        <h2 className="font-bold text-2xl text-text_primary">{title}</h2>
      </div>
    </>
  );
}

export default TypeTitle;

TypeTitle.propTypes = {
  title: PropTypes.string,
  iconColor: PropTypes.string,
};
