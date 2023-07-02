/** ---------------------------------------------------------------------------------------------------------------------
 * @param  {string}    title          副標題
 * @param  {string}    [titleColor]   title 顏色
 *
 * @return {html}
 */
function Head({ title, titleColor }) {
  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <h2
        className="font-bold text-lg text-primary"
        style={{ color: titleColor }}
      >
        {title}
      </h2>
    </>
  );
}

export default Head;
