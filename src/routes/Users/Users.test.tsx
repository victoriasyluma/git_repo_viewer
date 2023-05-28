import { render } from '@testing-library/react';
import { Users } from './Users';
import { MemoryRouter } from 'react-router-dom';

describe('Users component', () => {
  it('should render filter input', () => {
    const component = render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    const filterInput = component.getByTestId(
      'filter-input'
    ) as HTMLInputElement;

    expect(filterInput).toBeDefined();
    expect(filterInput.value).toBe('');

    expect(component.getByTestId('add-filter-placeholder')).toBeDefined();
  });

  it('should render filter input with queryParameters', () => {
    const component = render(
      <MemoryRouter initialEntries={['?_=victoria']}>
        <Users />
      </MemoryRouter>
    );

    const filterInput = component.getByTestId(
      'filter-input'
    ) as HTMLInputElement;

    expect(filterInput).toBeDefined();
    expect(filterInput.value).toBe('victoria');
  });
});
