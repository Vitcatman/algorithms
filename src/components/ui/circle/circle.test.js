import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states'

describe('Circle component snapshot tests', () => {
    it('Circle without letters', () => {
        const circle = renderer.create(<Circle />).toJSON();
        expect(circle).toMatchSnapshot();
      });
    it('Circle with letters', () => {
      const circle = renderer.create(<Circle letter='txt' />).toJSON();
      expect(circle).toMatchSnapshot();
    });
    it('Circle with head', () => {
        const circle = renderer.create(<Circle head='txt' />).toJSON();
        expect(circle).toMatchSnapshot();
      });
    it('Circle with tail', () => {
        const circle = renderer.create(<Circle tail='txt' />).toJSON();
        expect(circle).toMatchSnapshot();
      });
    it('Circle with head element', () => {
        const circle = renderer.create(<Circle head={<Circle />} />).toJSON();
        expect(circle).toMatchSnapshot();
      });
      it('Circle with tail element', () => {
        const circle = renderer.create(<Circle tail={<Circle />} />).toJSON();
        expect(circle).toMatchSnapshot();
      });
      it('Circle with index', () => {
        const circle = renderer.create(<Circle index={0} />).toJSON();
        expect(circle).toMatchSnapshot();
      });
      it('Circle with isSmall', () => {
        const circle = renderer.create(<Circle isSmall />).toJSON();
        expect(circle).toMatchSnapshot();
      });
      test('Circle with Default state', () => {
        const circle = renderer.create(<Circle state={ElementStates.Default} />).toJSON()
        expect(circle).toMatchSnapshot()
      })
    
      test('Circle with Changing state', () => {
        const circle = renderer.create(<Circle state={ElementStates.Changing} />).toJSON()
        expect(circle).toMatchSnapshot()
      })
    
      test('Circle with Default state', () => {
        const circle = renderer.create(<Circle state={ElementStates.Modified} />).toJSON()
        expect(circle).toMatchSnapshot()
      })
    
  });
  