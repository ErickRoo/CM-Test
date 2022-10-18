// Code in the file gatsby-node.js is run once in the process of building your site. You can use its APIs to create pages dynamically, add data into GraphQL, or respond to events during the build lifecycle.

const path = require('path');

// eslint-disable-next-line no-console
console.log('✨ gatsby-node from time-media-kit');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const siteQuery = `
    query MyQuery {
      allContentfulMetadata {
        nodes {
          id
          title
          url
          description
          featuredImage {
            gatsbyImageData(
              quality: 90,
              layout: FULL_WIDTH
            )
          }
        }
      }
      allContentfulHero {
        nodes {
          id
          heading
          description
        }
      }
      allContentfulSectionAudience {
        nodes {
          id
          globalChart {
            gatsbyImageData(
              quality: 90,
              layout: FULL_WIDTH
            )
          }
          globalNumber
          globalDescription
          socialNumber
          socialNumberTwitter
          socialNumberInstagram
          socialNumberLine
          socialNumberFacebook
          socialNumberLinkedIn
          socialNumberYouTube
          readersNumber
          readersNumberUs
          readersNumberEmea
          readersNumberApac
          brandReachNumberUs
          brandReachChartUsGender {
            gatsbyImageData(
              quality: 90,
              layout: FULL_WIDTH
            )
          }
          brandReachChartUsAge {
            gatsbyImageData(
              quality: 90,
              layout: FULL_WIDTH
            )
          }
          brandReachNumberEmea
          brandReachChartEmeaGender {
            gatsbyImageData(
              quality: 90,
              layout: FULL_WIDTH
            )
          }
          brandReachChartEmeaAge {
            gatsbyImageData(
              quality: 90,
              layout: FULL_WIDTH
            )
          }
          brandReachNumberApac
          brandReachChartApacGender {
            gatsbyImageData(
              quality: 90,
              layout: FULL_WIDTH
            )
          }
          brandReachChartApacAge {
            gatsbyImageData(
              quality: 90,
              layout: FULL_WIDTH
            )
          }
          sourceUs
          sourceEmea
          sourceApac
          sourceGlobal
        }
      }
      allContentfulSectionEditorial {
        nodes {
          id
          downloadText
          downloadUrl
          items {
            id
            title
            description {
              description
            }
            image {
              gatsbyImageData(
                quality: 75,
                layout: FULL_WIDTH
              )
            }
            url
          }
        }
      }
      allContentfulSectionBranded {
        nodes {
          id
          headerImageMobile {
            gatsbyImageData(
              quality: 90,
              layout: FULL_WIDTH
            )
          }
          headerImageDesktop {
            gatsbyImageData(
              quality: 90,
              layout: FULL_WIDTH
            )
          }
          headerText {
            headerText
          }
          headerLogos {
            id
            gatsbyImageData(
              quality: 90,
              layout: FULL_WIDTH
            )
          }
          items {
            id
            title
            heading
            description {
              description
            }
            image {
              gatsbyImageData(
                quality: 75,
                layout: FULL_WIDTH
              )
            }
            downloadText
            downloadUrl
          }
        }
      }
      allContentfulSectionAd {
        nodes {
          id
          categories {
            id
            title
            downloadText
            downloadUrl
            items {
              id
              title
              icon {
                gatsbyImageData(
                  quality: 90,
                  layout: FULL_WIDTH
                )
              }
              specsDescription {
                specsDescription
              }
            }
          }
        }
      }
      allContentfulSectionContact {
        nodes {
          id
          title
          column1 {
            id
            title
            info {
              info
            }
          }
          column2 {
            id
            title
            info {
              info
            }
          }
          column3 {
            id
            title
            info {
              info
            }
          }
        }
      }
    }
  `;

  const q = await graphql(siteQuery);
  const metadata = q.data.allContentfulMetadata.nodes[0];
  const hero = q.data.allContentfulHero.nodes[0];
  const editorialSection = q.data.allContentfulSectionEditorial.nodes[0];
  const brandedSection = q.data.allContentfulSectionBranded.nodes[0];
  const adSection = q.data.allContentfulSectionAd.nodes[0];
  const contactSection = q.data.allContentfulSectionContact.nodes[0];
  const audienceSection = q.data.allContentfulSectionAudience.nodes[0];

  const nav = [
    { id: 'audience', label: 'Audience Snapshot', icon: ['material-icons-outlined', 'group'] },
    { id: 'editorial', label: 'Editorial Tentpoles', icon: ['material-icons-outlined', 'auto_stories'] },
    { id: 'branded', label: 'Branded Content', icon: ['material-icons-outlined', 'ad_units'] },
    { id: 'ad', label: 'Ad Products', icon: ['material-icons-outlined', 'call_to_action'] },
    { id: 'contact', label: 'Contact Us', icon: ['material-icons', 'mark_as_unread'] },
  ];

  createPage({
    path: '/',
    component: path.resolve('src/templates/home/index.jsx'),
    context: {
      metadata,
      nav,
      hero,
      editorialSection,
      brandedSection,
      adSection,
      contactSection,
      audienceSection,
    },
  });
};
