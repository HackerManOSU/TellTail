//Author: Stephen Tsui
//Description: This vite test script checks to see if the opacity changes when scrolling on the home page
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import React from 'react';
import Home from '../components/Home/Home';

test('scrolling changes opacity', async() => {

  render(
    React.createElement(
      BrowserRouter,
      null,
      React.createElement(Home)
    )
  );

  //get element to check opacity of
  const homeComponent = screen.getByText(/Quick, Easy, Anywhere/i);
  const parentDiv = homeComponent.closest('div')?.parentElement; 

  //makes sure opacity is 1 originally before scrolling
  await waitFor(() => {
    const initialOpacity = window.getComputedStyle(parentDiv!).opacity;
    console.log("Original Opacity:", initialOpacity)
    expect(initialOpacity).toBe('1'); 
  });

  fireEvent.scroll(window, { target: { scrollY: 400 } }); //scroll down
  
  //gets the new opacity after scrolling and checks it has changed
  await waitFor(() => { 
    const newOpacity = window.getComputedStyle(parentDiv!).opacity; 

    console.log("New Opacity:", newOpacity)
    expect(newOpacity).not.toBe('1');
  });
});
