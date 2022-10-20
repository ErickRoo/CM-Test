// eslint-disable-next-line import/no-cycle
import { filterTagsByParent } from './tag';

// eslint-disable-next-line import/prefer-default-export
export const badges = [
  {
    id: 1,
    name: 'Avastar',
    active: true,
    completed: 0,
    completedLevel: 0,
    progress: [],
    levels: [
      {
        id: 'single',
        method: 'tally',
        threshold: 1,
        completed: 0,
        active: true,
      },
    ],
    triggers: {
      action: ['createProfile'],
    },
  },
  {
    id: 2,
    name: 'Explorer',
    active: true,
    completed: 0,
    completedLevel: 0,
    progress: [],
    levels: [
      {
        id: 'single',
        method: 'tally',
        threshold: 1,
        completed: 0,
        active: true,
      },
    ],
    triggers: {
      action: ['createSkills'],
    },
  },
  {
    id: 3,
    name: 'Q&Ace',
    active: true,
    completed: 0,
    completedLevel: 0,
    progress: [],
    levels: [
      {
        id: 'single',
        method: 'tally',
        threshold: 1,
        completed: 0,
        active: true,
      },
    ],
    triggers: {
      contentType: ['ContentfulAsk'],
    },
  },
  {
    id: 4,
    name: 'Tech Titan',
    active: true,
    completed: 0,
    completedLevel: 0,
    progress: [],
    levels: [
      {
        id: 'bronze',
        method: 'tally',
        threshold: 5,
        completed: 0,
        active: true,
      },
      {
        id: 'silver',
        method: 'tally',
        threshold: 10,
        completed: 0,
        active: true,
      },
      {
        id: 'gold',
        method: 'tally',
        threshold: 15,
        completed: 0,
        active: true,
      },
    ],
    triggers: {
      tags: ['industrytechnology'],
    },
  },
  {
    id: 5,
    name: 'Sports Star',
    active: true,
    completed: 0,
    completedLevel: 0,
    progress: [],
    levels: [
      {
        id: 'bronze',
        method: 'tally',
        threshold: 5,
        completed: 0,
        active: true,
      },
      {
        id: 'silver',
        method: 'tally',
        threshold: 10,
        completed: 0,
        active: true,
      },
      {
        id: 'gold',
        method: 'tally',
        threshold: 15,
        completed: 0,
        active: true,
      },
    ],
    triggers: {
      tags: ['industrysports'],
    },
  },
  {
    id: 6,
    name: 'Planet Protector',
    active: true,
    completed: 0,
    completedLevel: 0,
    progress: [],
    levels: [
      {
        id: 'bronze',
        method: 'tally',
        threshold: 5,
        completed: 0,
        active: true,
      },
      {
        id: 'silver',
        method: 'tally',
        threshold: 10,
        completed: 0,
        active: true,
      },
      {
        id: 'gold',
        method: 'tally',
        threshold: 15,
        completed: 0,
        active: true,
      },
    ],
    triggers: {
      tags: ['industryclimate'],
    },
  },
  {
    id: 7,
    name: 'Space Scholar',
    active: true,
    completed: 0,
    completedLevel: 0,
    progress: [],
    levels: [
      {
        id: 'bronze',
        method: 'tally',
        threshold: 5,
        completed: 0,
        active: true,
      },
      {
        id: 'silver',
        method: 'tally',
        threshold: 10,
        completed: 0,
        active: true,
      },
      {
        id: 'gold',
        method: 'tally',
        threshold: 15,
        completed: 0,
        active: true,
      },
    ],
    triggers: {
      tags: ['industryspace'],
    },
  },
  {
    id: 8,
    name: 'Creators Captain',
    active: true,
    completed: 0,
    completedLevel: 0,
    progress: [],
    levels: [
      {
        id: 'bronze',
        method: 'tally',
        threshold: 5,
        completed: 0,
        active: true,
      },
      {
        id: 'silver',
        method: 'tally',
        threshold: 10,
        completed: 0,
        active: true,
      },
      {
        id: 'gold',
        method: 'tally',
        threshold: 15,
        completed: 0,
        active: true,
      },
    ],
    triggers: {
      tags: ['industrycreators'],
    },
  },
  {
    id: 9,
    name: 'Reviewer',
    active: true,
    completed: false,
    completedLevel: 0,
    progress: [],
    levels: [
      {
        id: 'single',
        method: 'tally',
        threshold: 10,
        completed: 0,
        active: true,
      },
    ],
    triggers: {
      action: ['review'],
    },
  },
  {
    id: 10,
    name: 'See it. Be it.',
    active: true,
    completed: 0,
    completedLevel: 0,
    progress: [],
    levels: [
      {
        id: 'single',
        method: 'tally',
        threshold: 5,
        completed: 0,
        active: true,
      },
    ],
    triggers: {
      tags: ['industrycareerdevelopment'],
    },
  },
];

export const badgesDescriptions = [
  {
    id: 1,
    pre: `Earned for creating your profile.`,
    post: `You’ve created your profile. Look at you!`,
  },
  {
    id: 2,
    pre: `Earned for discovering your top traits. `,
    post: `You’ve discovered your top traits. You’ve got skills!`,
  },
  {
    id: 3,
    pre: `Earned for participating in an Ask Me Anything.`,
    post: `You’ve participated in an Ask Me Anything. Good questions, ace!`,
  },
  {
    id: 4,
    pre: `Earned for exploring the Tech industry.`,
    post: `You’ve explored the Tech industry. You’re building the future!`,
  },
  {
    id: 5,
    pre: `Earned for exploring the Sports industry.`,
    post: `You’ve explored the Sports industry. Way to get in the game!`,
  },
  {
    id: 6,
    pre: `Earned for exploring the Climate industry.`,
    post: `You’ve explored the Climate industry. Our planet thanks you!`,
  },
  {
    id: 7,
    pre: `Earned for exploring the Space industry.`,
    post: `You’ve explored the Space industry. You’re out of this world!`,
  },
  {
    id: 8,
    pre: `Earned for exploring the Creators industry.`,
    post: `You’ve explored the Creators industry. Imagine that!`,
  },
  {
    id: 9,
    pre: `Earned for giving us helpful feedback.`,
    post: `You’ve given us helpful feedback. Hey, thanks!`,
  },
  {
    id: 10,
    pre: `Earned for exploring your career pathways.`,
    post: `You’ve explored your career pathways. Good job!`,
  },
  {
    id: 11,
    pre: `Want to be a magazine cover star? Earn five gold badges to unlock this super badge.`,
    post: `You’re a star! Download your personalized TIME cover.`,
  },
];

export function getActiveBadgeById(id) {
  return badges.find((badge) => badge.id === id && badge.active);
}

export function getActiveBadges() {
  return badges.filter(({ active }) => active);
}

export function getInactiveBadges() {
  return badges.filter(({ active }) => !active);
}

export function mergeBadgeState(badge, badgeState) {
  if (badgeState) {
    const mergedBadge = { ...badge, ...badgeState };

    mergedBadge.levels = badge.levels.map((level, i) => {
      const badgeStateLevel =
        badgeState && badgeState.levels ? badgeState.levels.find(({ id }) => id === level.id) : undefined;
      return badgeStateLevel ? { ...level, ...badgeState.levels[i] } : level;
    });

    mergedBadge.completedLevel = Math.max(...[0, ...mergedBadge.levels.map(({ completed }) => completed)]);

    return mergedBadge;
  }

  return badge;
}

export function getUserActiveBadges(userBadges) {
  return getActiveBadges().map((badge) => {
    return mergeBadgeState(
      badge,
      userBadges.find(({ id }) => id === badge.id)
    );
  });
}

export function getUserCompletedBadges(userBadges) {
  return userBadges.filter((badge) => {
    return badge.completed;
  });
}

export function getUserCompletedBadgesAnyLevel(userBadges) {
  return userBadges.filter((badge) => {
    if (badge.completed) {
      return true;
    }

    if (badge.levels) {
      const completedLevels = badge.levels.filter((level) => {
        return level.completed;
      });

      return completedLevels.length > 0;
    }

    return false;
  });
}

export function isBadgeLevelCompleted(badge, level) {
  switch (level.method) {
    case 'tally':
      return level.active && badge?.progress.length >= level?.threshold;

    default:
      return false;
  }
}

export function isBadgeComplete(badge) {
  return !!Math.min(...badge.levels.map(({ active, completed }) => active && completed));
}

export function getBadgesByTrigger(category, label) {
  return getActiveBadges().filter((badge) => {
    return badge.triggers && badge.triggers[category] && badge.triggers[category].indexOf(label) >= 0;
  });
}

export function getBadgesRelatedToContent(content) {
  const relatedBadges = [];

  // Find industry tags related to content
  if (content.metadata && content.metadata.tags) {
    filterTagsByParent(content.metadata.tags, ['Industry']).forEach((t) => {
      getBadgesByTrigger('tags', t.contentful_id).forEach((badge) => {
        relatedBadges.push(badge.id);
      });
    });
  }

  // Add badges associated with content type
  if (content.internal && content.internal.type) {
    getBadgesByTrigger('contentType', content.internal.type).forEach((badge) => {
      relatedBadges.push(badge.id);
    });

    getBadgesByTrigger('contentType', 'any').forEach((badge) => {
      relatedBadges.push(badge.id);
    });
  }

  // Prevent duplicates, get badges, filter, and return
  return [...new Set(relatedBadges)]
    .map((id) => {
      return getActiveBadgeById(id);
    })
    .filter((i) => i);
}
