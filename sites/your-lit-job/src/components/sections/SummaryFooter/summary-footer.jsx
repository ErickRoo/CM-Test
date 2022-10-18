import React from 'react';
import PropTypes from 'prop-types';
import { navigate, graphql, useStaticQuery } from 'gatsby';
import { usePDF } from '@react-pdf/renderer/lib/react-pdf.browser.es';
import { trackEvent } from '../../../utils/track';
import ColorBox from '../../color-box';
import * as Styles from './summary-footer.module.scss';

import SummaryFeed from '../../elements/SummaryFeed';
import SummaryPdf from '../../elements/SummaryPdf';
import Button from '../../button';
import { useAuth } from '../../../contexts/AuthContext';

function SummaryFooter({ threeSkills }) {
  const { setCompletedSkills } = useAuth();

  const { allImages } = useStaticQuery(
    graphql`
      query QUERY_SUMMARY_FOOTER {
        allImages: allFile(
          filter: { relativePath: { regex: "/components/summary-footer/" } }
          sort: { fields: name, order: ASC }
        ) {
          nodes {
            ...LocalFileFragmentWo
          }
        }
      }
    `
  );

  const iconPrint = allImages.nodes[0];
  const iconRestart = allImages.nodes[1];
  const imgHeader = allImages.nodes[3];
  const imgFooter = allImages.nodes[2];
  const pdfDocument = <SummaryPdf imgHeader={imgHeader} imgFooter={imgFooter} threeSkills={threeSkills} />;
  const [pdfInstance] = usePDF({ document: pdfDocument });

  const handleRedirect = async () => {
    trackEvent('Click on retake', 'Skills Explorer', 'Retake skills explorer');
    setCompletedSkills(false);
    await navigate('/skills-explorer');
  };

  const handlePrint = () => {
    trackEvent('Download skills explorer summary', 'Skills Explorer', 'Download skills explorer summary');
    window.open(pdfInstance.url, '_blank');
  };

  return (
    <>
      <ColorBox>
        <section className={Styles.feed}>
          <SummaryFeed />
        </section>
      </ColorBox>
      <section className={Styles.button}>
        <ul className={Styles.buttons}>
          <li>
            <Button type="button" theme="transparent" action={handleRedirect} width="fill">
              <>
                <img src={iconRestart.src} alt={iconRestart.alt} />
                <strong>Take it again</strong>
              </>
            </Button>
          </li>
          <li>
            {pdfInstance.loading && !pdfInstance.url ? (
              <>loading...</>
            ) : (
              <Button type="button" theme="transparent" action={handlePrint} width="fill">
                <>
                  <img src={iconPrint.src} alt={iconPrint.alt} />
                  <strong>Download results</strong>
                </>
              </Button>
            )}
          </li>
        </ul>
      </section>
    </>
  );
}

SummaryFooter.propTypes = {
  threeSkills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      subtitle: PropTypes.string,
      description: PropTypes.string,
      points: PropTypes.arrayOf(PropTypes.string),
      jobs: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

SummaryFooter.defaultProps = {};

export default SummaryFooter;
