import React from 'react';
import classNames from 'classnames/bind';
import { Image } from 'greenlight-shared';
import Markdown from '../markdown';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function TeamModal({ person, closeModal }) {
  return (
    <div className={cx('TeamModal', { visible: person !== null })}>
      <div
        className={cx('screen')}
        onClick={() => {
          closeModal();
        }}
      />
      <div className={cx('inner')}>
        <div className={cx('modalWrapper', { visible: person !== null })}>
          {person ? (
            <div className={cx('modal')}>
              <div
                className={cx('close')}
                onClick={() => {
                  closeModal();
                }}
              >
                <svg
                  height="512px"
                  enableBackground="0 0 512 512"
                  version="1.1"
                  viewBox="0 0 512 512"
                  width="512px"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                </svg>
              </div>

              {person.photo ? (
                <div className={cx('modalMug')}>
                  <div className={cx('photo')}>
                    <Image image={person.photo} />
                  </div>
                </div>
              ) : null}

              <div className={cx('modalText', { noPhoto: person.photo === null })}>
                <h2>{person.fullName}</h2>

                {person.title ? <span className={cx('title')}>{person.title}</span> : null}

                {person.bio ? (
                  <div className={cx('bio')}>
                    <Markdown>{person.bio.bio}</Markdown>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default TeamModal;