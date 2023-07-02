import TypeTitle from "./index";

export default {
  title: "Components/TypeTitle",
};

const Template = (arguments_) => <TypeTitle {...arguments_} />;

export const Title = Template.bind({});

Title.args = {
  title: "Hello World",
};