import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'gatsby';
// eslint-disable-next-line import/no-unresolved
import { useLocation } from '@reach/router';
import classNames from 'classnames';
import * as Styles from './nav.module.scss';
import { toSlug, stripTagParents } from '../utils/tag';
import breakpoints from '../utils/breakpoints';
import ToolTip from './tool-tip';
import { trackEvent } from '../utils/track';
import industries from '../utils/industries';
import { useAuth } from '../contexts/AuthContext';
import IsLoaded from './is-loaded';

function Nav() {
  const location = useLocation();
  const navCareerDev = useRef();
  const industryChildren = useRef();
  const familiesChildren = useRef();
  const familiesChildrenDots = useRef();
  const navIndustry = useRef();
  const navProfile = useRef();
  const navAskMeAnything = useRef();
  const navFamilies = useRef();
  const threeDotsChildren = useRef();
  const navThreeDots = useRef();
  const navMeetUp = useRef();
  const [isIndustryActive, setIsIndustryActive] = useState(false);
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const [isFamiliesActive, setIsFamiliesActive] = useState(false);
  const [isFamiliesOpen, setIsFamiliesOpen] = useState(false);
  const [isDotsOpen, setIsDotsOpen] = useState(false);
  const [isFamiliesOpenDots, setIsFamiliesOpenDots] = useState(false);
  const [isDotsActive, setIsDotsActive] = useState(false);
  const [isDotsActiveFirst, setIsDotsActiveFirst] = useState(false);
  const { profile } = useAuth();

  useEffect(() => {
    const documentClick = () => {
      if (isIndustryOpen && window.matchMedia(breakpoints.sm).matches) {
        setIsIndustryOpen(false);
      }
    };

    window.addEventListener('click', documentClick);

    return () => {
      window.removeEventListener('click', documentClick);
    };
  }, [isIndustryOpen]);

  useEffect(() => {
    const documentClick = () => {
      if (isFamiliesOpen && window.matchMedia(breakpoints.sm).matches) {
        setIsFamiliesOpen(false);
      }
    };

    window.addEventListener('click', documentClick);

    return () => {
      window.removeEventListener('click', documentClick);
    };
  }, [isFamiliesOpen]);

  useEffect(() => {
    const documentClick = () => {
      if (isDotsOpen && isFamiliesOpenDots && window.matchMedia(breakpoints.sm).matches) {
        setIsDotsOpen(false);
      }
    };

    window.addEventListener('click', documentClick);

    return () => {
      window.removeEventListener('click', documentClick);
    };
  }, [isFamiliesOpenDots]);

  useEffect(() => {
    setIsIndustryActive(location.pathname.match(/\/industries\//));
  }, [location]);

  useEffect(() => {
    setIsFamiliesActive(location.pathname.match(/\/families-educators\//));
  }, [location]);

  useEffect(() => {
    setIsDotsActiveFirst(location.pathname.match(/\/families-educators\//));
  }, [location]);

  useEffect(() => {
    setIsDotsActive(location.pathname.match(/\/ask-me-anything/));
  }, [location]);

  // @TODO hard-coded list of industries to circumvent staticQuery bug in Gatsby
  // const industriesQuery = useStaticQuery(graphql`
  //   query {
  //     allContentfulIndustry(sort: { fields: order }, filter: { title: { regex: "/^(?!___PLACEHOLDER___)/i" } }) {
  //       nodes {
  //         id
  //         title
  //         order
  //         metadata {
  //           tags {
  //             id
  //             name
  //           }
  //         }
  //       }
  //     }
  //   }
  // `);
  // const industries = industriesQuery.allContentfulIndustry.nodes;

  const trackClick = (label) => {
    trackEvent('Menu Click', 'Navigation Action Taken', label);
  };

  return (
    <nav className={Styles.root}>
      <ul className={Styles.navItems}>
        <li className={classNames(Styles.navItem, Styles.navSearch)}>
          <Link
            to="/search"
            className={Styles.navItemLink}
            activeClassName={Styles.navItemLinkActive}
            onClick={() => {
              trackClick('Search');
              window.requestAnimationFrame(() => {
                setIsIndustryOpen(false);
                setIsFamiliesOpen(false);
                setIsDotsOpen(false);
              });
            }}
          >
            <span className={Styles.navItemIcon} />
            <span className={Styles.navItemText}>Search</span>
          </Link>
        </li>

        <li className={classNames(Styles.navItem, Styles.navHome)}>
          <Link
            to="/"
            className={Styles.navItemLink}
            activeClassName={Styles.navItemLinkActive}
            onClick={() => {
              trackClick('Home');
              window.requestAnimationFrame(() => {
                setIsIndustryOpen(false);
                setIsFamiliesOpen(false);
                setIsDotsOpen(false);
              });
            }}
          >
            <span className={Styles.navItemIcon} />
            <span className={Styles.navItemText}>My Feed</span>
          </Link>
        </li>

        <li className={classNames(Styles.navItem, Styles.navCareerDev)} ref={navCareerDev}>
          <Link
            to="/career-development"
            className={Styles.navItemLink}
            activeClassName={Styles.navItemLinkActive}
            partiallyActive
            onClick={() => {
              trackClick('Career Development');
              window.requestAnimationFrame(() => {
                setIsIndustryOpen(false);
                setIsFamiliesOpen(false);
                setIsDotsOpen(false);
              });
            }}
          >
            <span className={Styles.navItemIcon} />
            <span className={Styles.navItemText}>Career Development</span>
          </Link>
        </li>

        <li className={classNames(Styles.navItem, Styles.navIndustries, Styles.navItemHasChildren)} ref={navIndustry}>
          <button
            className={classNames(Styles.navItemLink, {
              [Styles.navItemLinkActive]: isIndustryActive,
              [Styles.navItemLinkHighlight]: isIndustryOpen,
            })}
            onClick={() => {
              trackClick('Industries');
              window.requestAnimationFrame(() => {
                setIsIndustryOpen(!isIndustryOpen);
                setIsFamiliesOpen(false);
                setIsDotsOpen(false);
              });
            }}
            type="button"
          >
            <span className={Styles.navItemIcon} />
            <span className={Styles.navItemText}>Industries</span>
          </button>
          <div className={Styles.navChildrenContainer}>
            <ul className={Styles.navChildren} data-open={isIndustryOpen} ref={industryChildren}>
              {industries
                .sort((a, b) => {
                  return a.title.localeCompare(b.title);
                })
                .map((industry) => {
                  if (industry.metadata.tags.length === 0) {
                    return null;
                  }

                  return (
                    <li key={industry.id} className={Styles.navChild}>
                      <Link
                        to={`/industries/${toSlug(stripTagParents(industry.metadata.tags[0].name))}`}
                        className={Styles.navChildLink}
                        activeClassName={Styles.navChildLinkActive}
                        onClick={() => trackClick(industry.title)}
                      >
                        <span>{industry.title}</span>
                        {/* <span className={Styles.spanSubtitle}>{industry.subtitle}</span> */}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </li>

        <li className={classNames(Styles.navItem, Styles.navSkillsExplorer)}>
          <Link
            to="/skills-explorer"
            className={Styles.navItemLink}
            activeClassName={Styles.navItemLinkActive}
            partiallyActive
            onClick={() => {
              trackClick('Skills Explorer');
              window.requestAnimationFrame(() => {
                setIsIndustryOpen(false);
                setIsFamiliesOpen(false);
                setIsDotsOpen(false);
              });
            }}
          >
            <span className={Styles.navItemIcon}>
              <IsLoaded visibility>
                {!profile.completedSkills && <span className={Styles.navItemIconNotify} />}
              </IsLoaded>
            </span>
            <span className={Styles.navItemText}>Skills Explorer</span>
          </Link>
        </li>

        <li className={classNames(Styles.navItem, Styles.navProfile)} ref={navProfile}>
          <Link
            to="/profile"
            className={Styles.navItemLink}
            activeClassName={Styles.navItemLinkActive}
            partiallyActive
            onClick={() => trackClick('Profile')}
          >
            <span className={Styles.navItemIcon} />
            <span className={Styles.navItemText}>My Profile & Badges</span>
          </Link>
        </li>

        <li className={classNames(Styles.navItem, Styles.navAskMeAnything)} ref={navAskMeAnything}>
          <Link
            to="/ask-me-anything"
            className={Styles.navItemLink}
            activeClassName={Styles.navItemLinkActive}
            partiallyActive
            onClick={() => {
              trackClick('Ask Me Anything');
              window.requestAnimationFrame(() => {
                setIsIndustryOpen(false);
                setIsFamiliesOpen(false);
                setIsDotsOpen(false);
              });
            }}
          >
            <span className={Styles.navItemIcon} />
            <span className={Styles.navItemText}>
              Ask Me Anything
              <ToolTip parent={navAskMeAnything} position="bottom" offset={-14}>
                Talk to an expert
              </ToolTip>
            </span>
          </Link>
        </li>

        {/* Nav meetups */}
        <li className={classNames(Styles.navItem, Styles.navMeetUp)} ref={navMeetUp}>
          <Link
            to="/meetups"
            className={Styles.navItemLink}
            activeClassName={Styles.navItemLinkActive}
            partiallyActive
            onClick={() => {
              window.requestAnimationFrame(() => {
                setIsIndustryOpen(false);
                setIsFamiliesOpen(false);
                setIsDotsOpen(false);
              });
            }}
          >
            <span className={Styles.navItemIcon} />
            <span className={Styles.navItemText}>Meetups</span>
          </Link>
        </li>

        <li className={classNames(Styles.navItem, Styles.navFamilies, Styles.navItemHasChildren)} ref={navFamilies}>
          <button
            className={classNames(Styles.navItemLink, {
              [Styles.navItemLinkActive]: isFamiliesActive,
              [Styles.navItemLinkHighlight]: isFamiliesOpen,
            })}
            onClick={() => {
              trackClick('Families & Educators');
              window.requestAnimationFrame(() => {
                setIsIndustryOpen(false);
                setIsFamiliesOpen(!isFamiliesOpen);
                setIsDotsOpen(false);
              });
            }}
            type="button"
          >
            <span className={Styles.navItemIcon} />
            <span className={Styles.navItemText}>Families & Educators</span>
          </button>
          <div className={Styles.navChildrenContainer}>
            <ul className={Styles.navChildren} data-open={isFamiliesOpen} ref={familiesChildren}>
              <li className={Styles.navChild}>
                <Link
                  to="/families-educators/resources"
                  className={Styles.navChildLink}
                  activeClassName={Styles.navChildLinkActive}
                  onClick={() => trackClick('Resources')}
                >
                  <span>Resources</span>
                </Link>
              </li>
              <li className={Styles.navChild}>
                <Link
                  to="/families-educators/about"
                  className={Styles.navChildLink}
                  activeClassName={Styles.navChildLinkActive}
                  onClick={() => trackClick('About')}
                >
                  <span>About</span>
                </Link>
              </li>
            </ul>
          </div>
        </li>

        {/* New nav route */}
        <li className={classNames(Styles.navItem, Styles.navThreeDots)} ref={navThreeDots}>
          <button
            className={classNames(Styles.navItemLink, {
              [Styles.navItemLinkActive]: isDotsActive || isDotsActiveFirst,
              [Styles.navItemLinkHighlight]: isDotsOpen,
            })}
            onClick={() => {
              trackClick('Families & Educators and Ask Me Anything');
              window.requestAnimationFrame(() => {
                setIsIndustryOpen(false);
                setIsFamiliesOpen(false);
                setIsDotsOpen(!isDotsOpen);
                setIsFamiliesOpenDots(false);
              });
            }}
            type="button"
          >
            <span className={Styles.navItemIcon} />
          </button>
          <div>
            <ul
              className={classNames(Styles.navChildren, Styles.navChildrenDots)}
              data-open={isDotsOpen}
              ref={threeDotsChildren}
            >
              <li className={classNames(Styles.navChild, Styles.navAskMeAnything)} ref={navAskMeAnything}>
                <Link
                  to="/ask-me-anything"
                  className={Styles.navItemLinkDots}
                  activeClassName={Styles.navItemLinkActiveDots}
                  onClick={() => {
                    trackClick('Ask Me Anything');
                    window.requestAnimationFrame(() => {
                      setIsDotsOpen(false);
                      setIsIndustryOpen(false);
                      setIsFamiliesOpen(false);
                    });
                  }}
                >
                  <span className={classNames(Styles.navItemIcon, Styles.navItemIconDots)} />
                  <span>
                    Ask Me Anything
                    <ToolTip parent={navAskMeAnything} position="bottom" offset={-14}>
                      Talk to an expert
                    </ToolTip>
                  </span>
                </Link>
              </li>

              <li className={classNames(Styles.navChild, Styles.navMeetUp)} ref={navMeetUp}>
                <Link
                  to="/meetups"
                  className={Styles.navItemLinkDots}
                  activeClassName={Styles.navItemLinkActiveDots}
                  onClick={() => {
                    window.requestAnimationFrame(() => {
                      setIsDotsOpen(false);
                      setIsIndustryOpen(false);
                      setIsFamiliesOpen(false);
                    });
                  }}
                >
                  <span className={classNames(Styles.navItemIcon, Styles.navItemIconDots)} />
                  <span>Meetups</span>
                </Link>
              </li>

              <li className={classNames(Styles.navItem, Styles.navFamilies)} ref={navFamilies}>
                <button
                  className={classNames(Styles.navItemLinkDots, {
                    [Styles.navItemLinkActiveDots]: isDotsActiveFirst,
                    [Styles.navItemLinkHighlightDots]: isFamiliesOpenDots,
                  })}
                  onClick={() => {
                    trackClick('Families & Educators');
                    window.requestAnimationFrame(() => {
                      setIsFamiliesOpenDots(!isFamiliesOpenDots);
                    });
                  }}
                  type="button"
                >
                  <span className={classNames(Styles.navItemIcon, Styles.navItemIconDots)} />
                  <span>Families & Educators</span>
                </button>
                <div className={Styles.navChildrenContainer}>
                  <ul className={Styles.navChildrenDotsChild} data-open={isFamiliesOpenDots} ref={familiesChildrenDots}>
                    <li className={Styles.navChild}>
                      <Link
                        to="/families-educators/resources"
                        className={Styles.navChildLinkDots}
                        activeClassName={Styles.navChildLinkActive}
                        onClick={() => {
                          trackClick('Resources');
                          setIsDotsOpen(false);
                        }}
                      >
                        <span>Resources</span>
                      </Link>
                    </li>
                    <li className={Styles.navChild}>
                      <Link
                        to="/families-educators/about"
                        className={Styles.navChildLinkDots}
                        activeClassName={Styles.navChildLinkActive}
                        onClick={() => {
                          trackClick('About');
                          setIsDotsOpen(false);
                        }}
                      >
                        <span>About</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
