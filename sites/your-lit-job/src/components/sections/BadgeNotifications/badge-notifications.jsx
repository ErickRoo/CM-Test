import React, { useState, useEffect, useRef } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { getActiveBadgeById } from '../../../utils/badges';
import * as Styles from './badge-notifications.module.scss';
import { useSite } from '../../../contexts/SiteContext';
import ToolTipBadge from '../../elements/ToolTipBadge';

const delay = async (time = 100) => {
  return new Promise((res) => {
    const timer = setTimeout(() => {
      res(timer);
    }, time);
  });
};

const getBadgeFrAlert = (alert, allIcons) => {
  const { id, level } = alert;
  let icon;
  let title = '';
  let description = '';
  let link = '/';
  if (level === 'bronze' || level === 'silver' || level === 'gold' || level === 'single') {
    const badgeFound = getActiveBadgeById(id);
    icon = allIcons?.nodes?.find(({ alt }) => alt === badgeFound?.name);
    title = level !== 'single' ? `${level} \nmedal!` : 'new badge!';
    description = 'See it in My Profile & Badges';
    link = '/profile/';
  } else if (level === 'quick-tip') {
    icon = allIcons?.nodes?.find(({ alt }) => alt === level);
    title = 'QUICK TIP:';
    link = `/${id}/`;
    description =
      id === 'profile' ? 'Choose your name and avatar.' : 'Complete Skills Explorer to populate your skills here.';
  }

  return {
    ...alert,
    show: true,
    icon,
    title,
    link,
    description,
  };
};

const initToolTip = {
  show: false,
  id: '',
  level: '',
  icon: {},
  title: '',
  description: '',
  link: '',
};

function BadgeNotifications() {
  const [toolTip, setToolTip] = useState(initToolTip);
  const busyRef = useRef(false);
  const { alerts, popAlert } = useSite();

  const { allIcons } = useStaticQuery(
    graphql`
      query QUERY_NOTIFICATIONS {
        allIcons: allFile(filter: { relativePath: { regex: "/components/profile-badges/" } }) {
          nodes {
            ...LocalFileFragment
          }
        }
      }
    `
  );

  const showToolTipFn = async () => {
    await delay();
    if (alerts.length > 0) {
      if (!busyRef.current) {
        const toolTipData = getBadgeFrAlert(alerts[alerts.length - 1], allIcons);
        setToolTip(toolTipData);
        busyRef.current = true;
      }
    }
  };

  const hideToolTipFn = async () => {
    setToolTip(initToolTip);
    busyRef.current = false;
    popAlert();
  };

  useEffect(() => {
    showToolTipFn();
  }, [alerts]);

  return (
    <div className={Styles.root}>
      {toolTip.show && (
        <ToolTipBadge
          link={toolTip.link}
          icon={toolTip.icon}
          level={toolTip.level}
          title={toolTip.title}
          description={toolTip.description}
          onAnimationEnd={hideToolTipFn}
        />
      )}
    </div>
  );
}

BadgeNotifications.propTypes = {};

BadgeNotifications.defaultProps = {};

export default BadgeNotifications;
