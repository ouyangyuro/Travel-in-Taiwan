import TopBanner from './index';

export default {
  title: 'Components/TopBanner',
};

const Template = (arguments_) => <TopBanner {...arguments_} />;

export const Banner = Template.bind({});

Banner.args = {
  title: '標題',
  subject: '副標題',
  imgSrc: 'https://picsum.photos/id/237/100/50',
};
