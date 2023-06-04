/**
 * -------------------------------------------------------------------------------------------
 * Utils: copy
 * 說明: 複製到剪貼簿
 * @param  {string}   text    要被複製的字串
 * 
 * @return {boolean}    複製成功或失敗
 */

const copy = ({ text }) => {
  let status = undefined
  try {
    navigator.clipboard.writeText(text)

    status = true
  } catch (error) {
    status = false
  }

  return status
}

export default copy
