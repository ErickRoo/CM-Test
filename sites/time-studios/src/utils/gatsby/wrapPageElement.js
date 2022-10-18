import React from 'react';
import Shell from '../../components/shell';

// Pass all props (hence the ...props) to the Shell component so it has access to things like pageContext or location
const wrapPageElement = ({ element, props }) => <Shell {...props}>{element}</Shell>;

export default wrapPageElement;
