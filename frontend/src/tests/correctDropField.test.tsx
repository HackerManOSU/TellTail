// Name: Christian DeVore
// Description: This Vite test checks if the correct DropField is rendered in the DOM based on whether the user is inputting a cat or dog.
// Test type: Integration Testing

import { vi, describe, it, expect} from 'vitest';
import { render } from '@testing-library/react';
import DropPage from '../components/Drop Page/DropPage';

// Mock the DropField components    
vi.mock("../components/Drop Fields/CatDropField", () => ({
    default: () => <div data-testid="cat-dropfield">Cat DropField</div>,
}));

vi.mock('../components/Drop Fields/DogDropField', () => ({
    default: () => <div data-testid="dog-dropfield">Dog DropField</div>,
}));

describe('DropPage Component', () => {
  it('renders CatDropField when title is "Cat"', () => {
    const { getByTestId } = render(<DropPage title="Cat" />);
    expect(getByTestId('cat-dropfield')).not.toBeNull();
  });

  it('renders DogDropField when title is not "Cat"', () => {
    const { getByTestId } = render(<DropPage title="Dog" />);
    expect(getByTestId('dog-dropfield')).not.toBeNull();
  });
});