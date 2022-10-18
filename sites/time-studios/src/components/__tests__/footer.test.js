/**
 * NOTE: This is meant to be a demonstration on how to write
 * unit tests for components using @testing-library/react. Feel
 * free to change this if better practice warrants it.
 */
import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../footer';

describe('Footer', () => {
  it('displays the correct footer copy if given a regular string', () => {
    const footerCopy = `Hey look, Im footer copy!`;
    const { getByText } = render(<Footer footerCopy={footerCopy} />);

    expect(getByText(footerCopy)).toBeInTheDocument();
  });
});
