import React from 'react';
import PropTypes from 'prop-types';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

function Markdown({ children }) {
  const text = md.render(children);

  return <span dangerouslySetInnerHTML={{ __html: text }} />;
}

Markdown.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Markdown;
