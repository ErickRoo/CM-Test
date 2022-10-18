import React from 'react';
import classNames from 'classnames/bind';
import Hero from '../hero';
import NavDesktop from '../../components/nav-desktop';
import Section from '../section';
import AudienceSection from '../section-audience';
import EditorialSection from '../section-editorial';
import BrandedSection from '../section-branded';
import AdSection from '../section-ad';
import ContactSection from '../section-contact';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function Index({ pageContext }) {
  const { hero, nav, audienceSection, editorialSection, brandedSection, adSection, contactSection } = pageContext;

  return (
    <div className={cx('ContentBody')}>
      <Hero content={hero} />
      <NavDesktop items={nav} />
      <Section id="audience" title="Audience Snapshot">
        <AudienceSection content={audienceSection} />
      </Section>
      <Section
        id="editorial"
        title="Editorial Tentpoles"
        downloadText={editorialSection.downloadText}
        downloadUrl={editorialSection.downloadUrl}
      >
        <EditorialSection content={editorialSection} />
      </Section>
      <Section id="branded" title="Branded Content">
        <BrandedSection content={brandedSection} />
      </Section>
      <Section id="ad" title="Ad Products">
        <AdSection content={adSection} />
      </Section>
      <Section id="contact" title="Contact Us">
        <ContactSection content={contactSection} />
      </Section>
    </div>
  );
}

export default Index;
