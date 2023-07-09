import { XMarkIcon } from '@heroicons/react/24/solid';

/** ---------------------------------------------------------------------------------------------------------------------
 * Components: Alert
 * @param  {string}     open        控制開關
 * @param  {string}     message     訊息
 * @param  {string}     severity    error, success
 * @param  {function}   onClose     控制關閉
 *
 * @return {html}
 */
function Alert({
  open = false,
  message = '',
  severity = 'success',
  onClose = () => {},
}) {
  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <div
        className={`z-[3000] fixed top-5 left-2 right-2 ipad:left-1/2 ipad:translate-x-[-50%] px-4 py-3 rounded flex justify-between items-center border ${
          severity === 'error' && 'border-rose-400 text-rose-700 bg-rose-100'
        } ${
          severity === 'success' && 'border-teal-400 text-teal-700 bg-teal-100'
        } transition duration-150 ease-out ${
          open ? 'opacity-1' : 'opacity-0 hidden'
        }`}
        role="alert"
      >
        <strong className="font-bold">{message}</strong>
        <button className="px-4 py-3" onClick={onClose}>
          <XMarkIcon
            className={`fill-current h-6 w-6 ${
              severity === 'error' && 'text-rose-500'
            } ${severity === 'success' && 'text-teal-500'}`}
          />
        </button>
      </div>
    </>
  );
}

export default Alert;
