import { addParameters } from '@storybook/react'; // <- or your storybook framework

addParameters({
  backgrounds: [
    { name: 'twitter', value: '#00aced' },
    { name: 'facebook', value: '#3b5998' },
    { name: 'white', value: '#ffffff', default: true },
  ],
});
