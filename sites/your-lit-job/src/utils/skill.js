export const skills = {
  artistic: {
    tag: {
      id: 'skillartistic',
    },
  },
  conventional: {
    tag: {
      id: 'skillconventional',
    },
  },
  enterprising: {
    tag: {
      id: 'skillenterprising',
    },
  },
  investigative: {
    tag: {
      id: 'skillinvestigative',
    },
  },
  realistic: {
    tag: {
      id: 'skillrealistic',
    },
  },
  social: {
    tag: {
      id: 'skillsocial',
    },
  },
};

export default skills;

export function findSkillByTagId(tagId) {
  let tag;

  Object.keys(skills).forEach((index) => {
    if (skills[index].tag.id === tagId) {
      tag = skills[index];
    }
  });

  return tag;
}

export function findTagIdBySkill(skill) {
  return skills[skill].tag.id;
}

export function getDefaultSkills() {
  const defaultSkills = {};

  Object.keys(skills).forEach((index) => {
    defaultSkills[index] = { value: 0 };
  });

  return defaultSkills;
}

export function sortSkills(unsortedSkills) {
  return Object.keys(unsortedSkills)
    .sort()
    .map((index) => {
      return { ...unsortedSkills[index], ...{ id: index } };
    })
    .sort((a, b) => {
      if (a.value > b.value) {
        return -1;
      }
      if (a.value < b.value) {
        return 1;
      }

      return 0;
    });
}

export function getSkillsCacheKey(skillData) {
  const sortedSkills = Array.isArray(skillData) ? skillData : sortSkills(skillData);

  return sortedSkills
    .map((data) => {
      return data.id + data.value;
    })
    .join('');
}
