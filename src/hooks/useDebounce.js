import { useState, useEffect } from 'react'

/** ---------------------------------------------------------------------------------------------
 * Time lagged: 幾秒內沒繼續動作在執行 & 一樣的值不會重複執行
 * @param  {string}            value         state值
 * @param  {string}            timeout       幾秒後執行
 * @return {string} debounced
 */
function useDebounce(value, timeout) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timerId = setTimeout(() => setDebounced(value), timeout)

    return () => clearTimeout(timerId)
  }, [value, timeout])

  return debounced
}

export default useDebounce
