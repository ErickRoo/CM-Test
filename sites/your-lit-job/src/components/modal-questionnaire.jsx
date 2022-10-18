import React from 'react';
import PropTypes from 'prop-types';
import { Widget } from '@typeform/embed-react';
import ModalWindow from './modal-window';
import Modal from './modal';
import * as Styles from './modal-questionnaire.module.scss';
import { useAuth } from '../contexts/AuthContext';

function ModalQuestionnaire({ open, close, showClose }) {
  const [surveyComplete, setSurveyComplete] = React.useState(false);
  const { setTakenQuestionnaire } = useAuth();

  const handleOnClose = async () => {
    setTakenQuestionnaire(true);
    close();
  };
  const handleSubmit = () => {
    setTakenQuestionnaire(true);
    setSurveyComplete(true);
    setTimeout(() => {
      close();
    }, 3000);
  };

  return (
    <Modal open={open} close={handleOnClose} centerH centerV className={Styles.modal}>
      <ModalWindow close={handleOnClose} showClose={showClose} type="questionnaire">
        {!surveyComplete ? (
          <Widget
            id="oDDpmhwG"
            className={Styles.widget}
            onSubmit={() => {
              handleSubmit();
            }}
          />
        ) : (
          <h4 className={Styles.thankyou}>Thank you for completing our survey!</h4>
        )}
      </ModalWindow>
    </Modal>
  );
}

ModalQuestionnaire.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  showClose: PropTypes.bool,
};

ModalQuestionnaire.defaultProps = {
  showClose: false,
};

export default ModalQuestionnaire;
