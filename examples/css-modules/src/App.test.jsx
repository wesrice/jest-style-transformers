import './App';
import { recorders } from 'jest-style-transformer-utils';

describe('jest-style-transformer-css-modules example', () => {
  it('style extraction does not regress', async () => {
    expect.assertions(1);
    expect(recorders.styles.get()).toMatchSnapshot();
  });
});
