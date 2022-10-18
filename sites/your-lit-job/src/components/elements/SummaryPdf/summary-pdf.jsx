import React from 'react';
import PropTypes from 'prop-types';
import { Document, Page, View, Image, StyleSheet, Font } from '@react-pdf/renderer';
import summaryPdfModule from './summary-pdf.module';

import SummaryContainer from '../SummaryContainer';

const styles = StyleSheet.create(summaryPdfModule);

const firstFont = {
  family: 'montserrat',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/montserrat/v10/zhcz-_WihjSQC0oHJ9TCYC3USBnSvpkopQaUR-2r7iU.ttf',
    },
    {
      src: 'https://fonts.gstatic.com/s/montserrat/v10/BYPM-GE291ZjIXBWrtCwepp-63r6doWhTEbsfBIRJ7A.ttf',
      fontWeight: 500,
    },
    {
      src: 'https://fonts.gstatic.com/s/montserrat/v10/IQHow_FEYlDC4Gzy_m8fcgJKKGfqHaYFsRG-T3ceEVo.ttf',
      fontWeight: 700,
    },
  ],
};

const secondFont = {
  family: 'baskerville',
  src: 'https://fonts.gstatic.com/s/librebaskerville/v4/pR0sBQVcY0JZc_ciXjFsKwAUTJOA6-irsSazDq377BE.ttf',
};

function SummaryPdf({ imgHeader, imgFooter, threeSkills }) {
  Font.register(firstFont);
  Font.register(secondFont);

  return (
    <Document>
      <Page style={styles.page}>
        <Image src={imgHeader.src} />
        <View style={styles.body}>
          {threeSkills.map((skill, index) => {
            const key = `subcontainers-${skill.id}-${index}`;
            return <SummaryContainer key={key} skill={skill} />;
          })}
          <View style={styles.wrapperFooter}>
            <Image src={imgFooter.src} style={styles.footer} />
          </View>
        </View>
      </Page>
    </Document>
  );
}

SummaryPdf.propTypes = {
  threeSkills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      subtitle: PropTypes.string,
      description: PropTypes.string,
      points: PropTypes.arrayOf(PropTypes.string),
      jobs: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  imgHeader: PropTypes.shape({
    id: PropTypes.string,
    alt: PropTypes.string,
    src: PropTypes.string,
  }).isRequired,
  imgFooter: PropTypes.shape({
    id: PropTypes.string,
    alt: PropTypes.string,
    src: PropTypes.string,
  }).isRequired,
};

SummaryPdf.defaultProps = {};

export default SummaryPdf;
