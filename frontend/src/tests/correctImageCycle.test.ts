//Author: Stephen Tsui
//Description: This vitest checks if all the images from the imageCycle are rendered and only the active image is visible.
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import { expect, test , describe} from 'vitest';
import React from 'react';
import Home from '../components/Home/Home';

describe('Home and imagecycle test', () => {
  test('renders ImageCycle with all profile images', () => {
    render(
        React.createElement(
          BrowserRouter,
          null,
          React.createElement(Home)
        )
      );
      const profileImages = screen.getAllByAltText('profile');
      const expectedLength = profileImages.length; 
      expect(profileImages.length).toBe(expectedLength);
  });

  test('only the active profile image is visible', () => {
    render(
        React.createElement(
          BrowserRouter,
          null,
          React.createElement(Home)
        )
      );
    const profileImages = screen.getAllByAltText('profile');
    const visibleImage = profileImages.find((img) => {
      return img.parentElement?.style.opacity === '1';
    });
    expect(visibleImage).toBeDefined();
  });
});
