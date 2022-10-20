import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import { StaticImage } from 'gatsby-plugin-image';
import * as Styles from './footer.module.scss';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className={Styles.root}>
        <div className={classNames(Styles.content, 'container')}>
          <div className={Styles.logo}>
            <small className={Styles.logoText}>Made possible by</small>
            <StaticImage
              src="../assets/global/footer-logo.png"
              layout="constrained"
              placeholder="none"
              className={Styles.logoImg}
              width={268}
              objectFit="contain"
              objectPosition="top left"
              alt="PWC Charitable Foundation"
            />
            <StaticImage
              src="../assets/global/footer-logo-inverted.png"
              layout="constrained"
              placeholder="none"
              className={Styles.logoImgPrint}
              width={268}
              objectFit="contain"
              objectPosition="top left"
              alt="PWC Charitable Foundation"
            />
          </div>
          <div className={Styles.nav}>
            <ul className={Styles.navItems}>
              <li className={Styles.navItem}>
                <Link to="/families-educators/about" className={Styles.navLink}>
                  About
                </Link>
              </li>
              <li className={Styles.navItem}>
                <Link to="/contact" className={Styles.navLink}>
                  Contact
                </Link>
              </li>
              <li className={Styles.navItem}>
                <Link to="/privacy-policy" className={Styles.navLink}>
                  Privacy Policy
                </Link>
              </li>
              <li className={Styles.navItem}>
                <Link
                  to="/privacy-policy#4-your-california-privacy-rights-notice-to-california-customers"
                  className={Styles.navLink}
                >
                  California Privacy
                </Link>
              </li>
            </ul>
          </div>
          <div className={Styles.legals}>
            <div className={Styles.t4k}>
              <span className={Styles.t4kText}>Powered by</span>
              <StaticImage
                src="../assets/global/time-for-kids-logo.png"
                layout="constrained"
                placeholder="none"
                width={133}
                objectFit="contain"
                alt="Time for Kids Logo"
                className={Styles.timeForKids}
              />
              <StaticImage
                src="../assets/global/time-for-kids-logo-inverted.png"
                layout="constrained"
                placeholder="none"
                width={133}
                objectFit="contain"
                alt="Time for Kids Logo"
                className={Styles.timeForKidsPrint}
              />
            </div>
            <small className={Styles.legal}>
              &reg; {year} TIME USA, LLC. All Rights Reserved. Photos by GETTY IMAGES.
            </small>
            <small className={Styles.legal}>YourJob&trade; is a trademark of Time.com USA, LLC.</small>
          </div>
        </div>
      </footer>
      <div className={Styles.printFooter}>
        <StaticImage
          src="../assets/global/powered-by-tfk.png"
          layout="constrained"
          placeholder="none"
          width={300}
          objectFit="contain"
          alt="Time for Kids Logo"
        />
      </div>
    </>
  );
}

export default Footer;
