import React from 'react';
import classNames from 'classnames/bind';
import TimeLogo from '../../components/time-logo';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx('Footer')}>
      <a className={cx('logo')} href="https://time.com">
        <TimeLogo />
      </a>
      <div className={cx('links')}>
        <a href="https://time.com/help">Help Center</a>
        <a href="https://time.com/faq">FAQs</a>
        <a href="https://time.com/privacy/privacy_terms_service.html">Terms of Service</a>
        <a href="https://time.com/privacy/privacy_policy.html">Privacy Policy</a>
        <a href="https://www.timemediakit.com/wp-content/uploads/2019/05/US_TermsAndConditions-1-TC-04.20.19-redlined.pdf">
          Terms &amp; Conditions
        </a>
        <a href="https://time.com/privacy/privacy_policy.html#_Toc26698205">Your California Privacy Rights</a>
      </div>
      <div className={cx('legal')}>
        © 2022 TIME USA, LLC. All Rights Reserved. Use of this site constitutes acceptance of our<br /><a href="https://time.com/privacy/privacy_terms_service.html">Terms of Service</a>, <a href="https://time.com/privacy/privacy_policy.html">Privacy Policy</a> (<a href="https://time.com/privacy/privacy_policy.html#_Toc26698205">Your California Privacy Rights</a>) and <a href="https://privacyportal-cdn.onetrust.com/dsarwebform/ec48745c-0b96-47da-aa41-f959ab79a818/e1de9460-d63a-4d4c-94d8-e876f7bbbb75.html">Do Not Sell My Personal Information</a>.
      </div>
    </div>
  );
}

export default Footer;
