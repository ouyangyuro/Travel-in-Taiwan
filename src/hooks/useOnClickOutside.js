import { useEffect } from 'react';

/** ---------------------------------------------------------------------------------------------
 * 名稱: clicks outside of a specified element (判斷 mouse click inside element or ouside element)
 * https://usehooks.com/useOnClickOutside/
 *
 * @param  {object}     ref       domRef
 * @param  {function}   handler   outside element click 執行
 */
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      // Call the handler only if the click is outside of the element passed.
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default useOnClickOutside;
