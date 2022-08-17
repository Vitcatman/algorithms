import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Button component snapshot tests', () => {
  it('Button with text', () => {
    const btn = renderer.create(<Button text='Развернуть' />).toJSON();
    expect(btn).toMatchSnapshot();
  });
  it('Button without text', () => {
    const btn = renderer.create(<Button />).toJSON();
    expect(btn).toMatchSnapshot();
  });
  it('Button with loader', () => {
    const btn = renderer.create(<Button isLoader />).toJSON();
    expect(btn).toMatchSnapshot();
  });
  it('Button disabled', () => {
    const btn = renderer.create(<Button disabled />).toJSON();
    expect(btn).toMatchSnapshot();
  });
});

describe('button alert tests', ()=>{
  it('Button click generates correct alert', () => {
    window.alert = jest.fn();
    render(<Button text="Reverse" onClick={alert('test')} />)
    const btn = screen.getByText("Reverse");
    fireEvent.click(btn);    
    expect(window.alert).toHaveBeenCalledWith('test');
}); 
})
