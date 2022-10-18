const config = require('../../site-config');

// eslint-disable-next-line import/prefer-default-export
export function trackEvent(action, category = null, label = null, value = null, data = {}) {
  if (category) {
    data.event_category = category;
  }

  if (label) {
    data.event_label = label;
  }

  if (value) {
    data.value = value;
  }

  if (window && window.gtag) {
    window.gtag('event', action, data);
  } else {
    // eslint-disable-next-line no-console
    console.log('trackEvent', action, data);
  }
}

export function getGoogleAnalyticsId() {
  const gtag = config.plugins.find((plugin) => {
    return plugin.resolve === 'gatsby-plugin-google-gtag';
  });

  return gtag && gtag.options.trackingIds ? gtag.options.trackingIds.find((str) => str.substr(0, 3) === 'UA-') : null;
}

export function setPageDimensions(data = {}) {
  const { id } = config.ga;

  // GA id required
  if (!id) {
    return;
  }

  // Filter out null values
  const filteredData = {};
  Object.keys(data).forEach((key) => {
    if (data[key] !== null && data[key] !== '') {
      filteredData[key] = data[key];
    }
  });

  // Build config
  const gtagConfig = {
    ...config.ga.config,
    send_page_view: false,
    ...filteredData,
  };

  // Report
  if (window && window.gtag) {
    window.gtag('config', id, gtagConfig);
  } else {
    // eslint-disable-next-line no-console
    console.log('setPageDimension', gtagConfig);
  }
}
