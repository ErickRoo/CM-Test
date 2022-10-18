import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import summaryContainerModule from './summary-container.module';

const styles = StyleSheet.create(summaryContainerModule);

const skillContent = {
  realistic: {
    color: '#00b85f',
    bgColor: '#053d29',
  },
  investigative: {
    color: '#ff2630',
    bgColor: '#650b0e',
  },
  artistic: {
    color: '#271916',
    bgColor: '#fbd7a7',
  },
  social: {
    color: '#d79fff',
    bgColor: '#51137b',
  },
  enterprising: {
    color: '#ff6e00',
    bgColor: '#682d00',
  },
  conventional: {
    color: '#ffd700',
    bgColor: '#443d03',
  },
};

function SummaryContainer({ skill: { id, subtitle, description, points, jobs } }) {
  const { color, bgColor } = skillContent[id];

  return (
    <View wrap={false} style={{ ...styles.mainCard, borderColor: color }}>
      <View style={styles.titleWrapper}>
        <View style={{ ...styles.titleBackground, backgroundColor: bgColor, color }}>
          <Text style={styles.titleText}>{id}</Text>
        </View>
      </View>

      <View style={styles.col1Wrapper}>
        <Text style={{ ...styles.col1Title, color }}>{subtitle}</Text>
        <Text style={styles.col1Subtitle}>{description}</Text>
      </View>

      <View style={styles.col2Wrapper}>
        <Text style={{ ...styles.col2Title, color }}>You are...</Text>
        {points.map((point, index) => {
          const key = `point-${point}-${index}`;
          return (
            <Text key={key} style={styles.col2Content}>
              {point}
            </Text>
          );
        })}
      </View>

      <View style={styles.col3Wrapper}>
        <Text style={{ ...styles.col2Title, color }}>You might be a/an...</Text>
        {jobs.map((job, index) => {
          const key = `point-${job}-${index}`;
          return (
            <Text key={key} style={styles.col2Content}>
              {job}
            </Text>
          );
        })}
      </View>
    </View>
  );
}

SummaryContainer.propTypes = {
  skill: PropTypes.shape({
    id: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.string),
    jobs: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

SummaryContainer.defaultProps = {};

export default SummaryContainer;
