/** ---------------------------------------------------------------------------------------------------------------------
 * Utils: cx
 * 說明: https://dev.to/gugaguichard/replace-clsx-classnames-or-classcat-with-your-own-little-helper-3bf
 * 
 * Example:
 * cx('base', undefined, ['more', 'classes'],
 *      hasError && 'bg-red',
 *      isEnabled || 'pointer-events-none',
 *      isTitle ? 'font-semibold' : 'font-normal'
 *   )
 * 
 * @param  {...any} args
 *
 * @return
 */

const cx = (...args) =>
  args
    .flat()
    .filter((x) => x !== null && x !== undefined && typeof x !== 'boolean')
    .join(' ');

export default cx;
