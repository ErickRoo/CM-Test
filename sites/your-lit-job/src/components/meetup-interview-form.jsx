import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function MeetUpInterviewForm({ className, meetingLink }) {
  const handleSubmit = () => {
    // @TODO remove console log
    // eslint-disable-next-line no-console
    console.log(meetingLink);
    /*
    ev.preventDefault();
    window.open(meetingLink, '_self', 'noopener noreferrer');
    */
  };

  return (
    <div className={classNames(className, 'container')} onSubmit={handleSubmit}>
      <iframe
        title="Meet-form"
        src="https://docs.google.com/forms/d/e/1FAIpQLSeuGGFulMBb6etwYGPheYFAXHHxHhJrrQyjQca1IHAEqeT-ow/viewform?embedded=true"
        width="640"
        height="2000"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      >
        Loading…
      </iframe>
    </div>
  );
}

MeetUpInterviewForm.propTypes = {
  className: PropTypes.string,
  meetingLink: PropTypes.string,
};

MeetUpInterviewForm.defaultProps = {
  className: null,
  meetingLink: '',
};

export default MeetUpInterviewForm;
