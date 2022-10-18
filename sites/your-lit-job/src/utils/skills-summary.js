import { sortSkills } from './skill';
import { getTagNames, stripTagParents } from './tag-node';

const reorderSkillsContent = (skillsContentNodes) => {
  const newSkillsContent = {};

  skillsContentNodes.forEach((oneSkill) => {
    const tagName = getTagNames(oneSkill?.metadata?.tags)?.[0];
    const striptagName = stripTagParents(tagName)?.toLowerCase() || '';

    if (striptagName?.length > 0) newSkillsContent[striptagName] = oneSkill;
  });

  return newSkillsContent;
};

const getSkillContent = (skillSelected, localSkillsContent, contentfulSkillsContent) => {
  return {
    ...skillSelected,
    ...localSkillsContent[skillSelected.id],
    ...contentfulSkillsContent[skillSelected.id],
  };
};

const getAdditionalItems = (contentfulSkillsContent) => {
  const jobsTitles = {};
  const pointsTitles = {};

  Object.entries(contentfulSkillsContent).forEach(([id, content]) => {
    jobsTitles[id] = content?.jobs?.map((oneJob) => oneJob?.title) ?? [];
    pointsTitles[id] = content?.skillsPoints?.map((onePoint) => onePoint?.skillPointTitle) ?? [];
  });

  return { jobsTitles, pointsTitles };
};

const getFirstThreeSkillsContent = (skillsSorted, localSkillsContent, contentfulSkillsContent) => {
  const { jobsTitles, pointsTitles } = getAdditionalItems(contentfulSkillsContent);

  return skillsSorted.slice(0, 3).map(({ id }) => ({
    id,
    subtitle: localSkillsContent[id].subtitle,
    description: localSkillsContent[id].description,
    points: pointsTitles[id],
    jobs: jobsTitles[id],
  }));
};

const getSkillsContent = (skills, localSkillsContent = {}, contentfulSkillsContent = {}, quantity = 3, keys = ['']) => {
  return sortSkills(skills)
    .slice(0, quantity)
    .map((oneSkill) => {
      const newOneSkill = {};

      keys?.forEach((oneProp) => {
        if (localSkillsContent?.[oneSkill.id]?.[oneProp])
          newOneSkill[oneProp] = localSkillsContent?.[oneSkill.id]?.[oneProp];
        else if (contentfulSkillsContent?.[oneSkill.id]?.[oneProp])
          newOneSkill[oneProp] = contentfulSkillsContent?.[oneSkill.id]?.[oneProp];
      });

      return {
        ...oneSkill,
        ...newOneSkill,
      };
    });
};

const setStylePropertyColorAsGlobal = (foregroundColor, backgroundColor) => {
  document?.documentElement?.style.setProperty('--skill-foreground-color', foregroundColor);
  document?.documentElement?.style.setProperty('--skill-background-color', backgroundColor);
};

const getBottomSvgPaths = (ref) => {
  if (!ref.current) {
    return [0, 0, 0];
  }
  const diff = (window.innerWidth - 320 - 221) / 2;
  const positionList = Array.from(ref.current.children).map((button, index) => {
    const latestPoint = button.offsetLeft + button.offsetWidth / 2 - diff;
    let pathD = '';

    switch (index) {
      case 0:
        pathD = `M 25 112 H ${latestPoint + 30} C ${latestPoint + 20} 112 ${latestPoint} 122 ${latestPoint} 142 V 340`;
        break;
      case 1:
        pathD = `M 25 180 H 0 C -20 180 -30 190 -30 210 L -30 270 C -30 290 -20 300 0 300 H ${latestPoint - 20} C ${
          latestPoint - 10
        } 300 ${latestPoint} 310 ${latestPoint} 320 V 340`;
        break;
      case 2:
        pathD = `M 225 180 H ${latestPoint - 30} C ${latestPoint - 20} 180 ${latestPoint} 190 ${latestPoint} 210 V 340`;
        break;
      default:
        pathD = '';
        break;
    }

    return pathD;
  });
  return positionList;
};

export {
  reorderSkillsContent,
  getSkillContent,
  getFirstThreeSkillsContent,
  getSkillsContent,
  setStylePropertyColorAsGlobal,
  getBottomSvgPaths,
};
