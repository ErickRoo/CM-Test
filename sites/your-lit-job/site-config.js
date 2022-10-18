const { AppEnv } = require('../../packages/greenlight-shared/src/enums/app-env');

const { APP_ENV = AppEnv.DEV } = process.env;

const gaPropertyIdMap = {
  [AppEnv.DEV]: 'UA-97981691-23',
  [AppEnv.QA]: 'UA-97981691-23',
  [AppEnv.PRODUCTION]: 'UA-97981691-23',
};

module.exports = {
  pathPrefix: 'your-hot-job',
  data: {
    contentful: {
      spaceId: 'mlt4xrx1omik',
    },
  },
  ga: {
    id: gaPropertyIdMap[APP_ENV],
    config: {
      custom_map: {
        dimension47: 'industry',
        dimension48: 'skill',
        dimension49: 'publishDate',
        dimension50: 'contentType',
        dimension54: 'contentId',
        dimension55: 'videoId',
        dimension56: 'userId',
      },
    },
  },
  initialState: {},
  showQuestionnaire: true,
  consumablesForQuestionnaire: 2,
};
