/** ---------------------------------------------------------------------------------------------------------------------
 * Components: Swiper Cards Loading
 * @return {html}
 */
function SwiperCardsLoading() {
  return (
    <div className="flex w-full overflow-hidden p-[2px]">
      <div className="rounded-2xl mr-5 w-9/12 shadow flex-none tablet:w-4/12 ipad:flex-auto">
        {/* card's img loading */}
        <div className="rounded-t-2xl pb-[65%] animate-pulse bg-slate-200"></div>
        {/* card's content loading */}
        <div className="rounded-b-2xl px-4 py-2 animate-pulse bg-white">
          <div className="rounded h-7 w-16 bg-slate-200"></div>
          <div className="rounded h-5 w-28 mt-2 bg-slate-200"></div>
          <div className="rounded h-5 w-full mt-2 bg-slate-200"></div>
        </div>
      </div>

      {/* -----------------------------------------------------------------------
       * only show 'above' tablet width
       */}
      <div className="rounded-2xl mr-5 w-4/12 shadow flex-none hidden tablet:block ipad:flex-auto">
        {/* card's img loading */}
        <div className="rounded-t-2xl pb-[65%] animate-pulse bg-slate-200"></div>
        {/* card's content loading */}
        <div className="rounded-b-2xl px-4 py-2 animate-pulse bg-white">
          <div className="rounded h-7 w-16 bg-slate-200"></div>
          <div className="rounded h-5 w-28 mt-2 bg-slate-200"></div>
          <div className="rounded h-5 w-full mt-2 bg-slate-200"></div>
        </div>
      </div>

      {/* -----------------------------------------------------------------------
       * only show 'above' tablet width
       */}
      <div className="rounded-2xl w-4/12 shadow flex-none hidden tablet:block ipad:flex-auto">
        {/* card's img loading */}
        <div className="rounded-t-2xl pb-[65%] animate-pulse bg-slate-200"></div>
        {/* card's content loading */}
        <div className="rounded-b-2xl px-4 py-2 animate-pulse bg-white">
          <div className="rounded h-7 w-16 bg-slate-200"></div>
          <div className="rounded h-5 w-28 mt-2 bg-slate-200"></div>
          <div className="rounded h-5 w-full mt-2 bg-slate-200"></div>
        </div>
      </div>

      {/* -----------------------------------------------------------------------
       * only show 'below' tablet width
       */}
      <div className="rounded-l-2xl w-9/12 shadow flex-none tablet:hidden">
        {/* card's img loading */}
        <div className="rounded-tl-2xl pb-[65%] animate-pulse bg-slate-200"></div>
        {/* card's content loading */}
        <div className="rounded-bl-2xl px-4 py-2 animate-pulse bg-white">
          <div className="rounded h-7 w-full  bg-slate-200"></div>
          <div className="rounded h-5 w-full  mt-2 bg-slate-200"></div>
          <div className="rounded h-5 w-full mt-2 bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
}

export default SwiperCardsLoading;
