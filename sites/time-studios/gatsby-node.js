// Code in the file gatsby-node.js is run once in the process of building your site. You can use its APIs to create pages dynamically, add data into GraphQL, or respond to events during the build lifecycle.

const path = require('path');

const templatesPath = path.resolve(`src/templates`);

// eslint-disable-next-line no-console
console.log('✨ gatsby-node from time-studios');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const siteQuery = `
    query MyQuery {
      allContentfulTimeStudiosPage {
        nodes {
          id
          slug
          type
          metadata {
            id
            title
            description
            featuredImage {
              gatsbyImageData(layout: FULL_WIDTH, quality: 75)
            }
          }
          content {
            ... on ContentfulTimeStudiosPageContentHome {
              id
              heroHeading
              heroVideoId
              heroPoster {
                title
                description
                gatsbyImageData(layout: FULL_WIDTH, quality: 75)
              }
              aboutUsText {
                aboutUsText
              }
              awardsText {
                awardsText
              }
              awardsImages {
                title
                description
                gatsbyImageData(layout: FULL_WIDTH, quality: 75)
              }
            }
            ... on ContentfulTimeStudiosPageContentAbout {
              id
              aboutText {
                aboutText
              }
            }
            ... on ContentfulTimeStudiosPageContentTeam {
              id
              teamText {
                teamText
              }
              teamMembers {
                id
                fullName
                title
                bio {
                  bio
                }
                photo {
                  title
                  description
                  gatsbyImageData(layout: FULL_WIDTH, quality: 75)
                }
              }
            }
            ... on ContentfulTimeStudiosPageContentProject {
              id
              project {
                id
                featured
                titleShort
                titleLong
                type
                publishDate
                credits {
                  person {
                    fullName
                  }
                  role
                }
                descriptionShort {
                  descriptionShort
                }
                descriptionLong {
                  descriptionLong
                }
                trailer
                posterImage {
                  title
                  description
                  gatsbyImageData(layout: FULL_WIDTH, quality: 75)
                }
                featuredImage {
                  title
                  description
                  gatsbyImageData(layout: FULL_WIDTH, quality: 75)
                }
                additionalImages {
                  title
                  description
                  gatsbyImageData(layout: FULL_WIDTH, quality: 75)
                }
                featuredOrder
              }
            }
            ... on ContentfulTimeStudiosPageContentContact {
              id
              heroBackgroundImage {
                title
                description
                gatsbyImageData(layout: FULL_WIDTH, quality: 75)
              }
              contactCopy {
                contactCopy
              }
            }
          }
        }
      }
      allContentfulSiteConfig {
        nodes {
          siteName
          siteUrl
          siteMenu {
            name
            slug
          }
          footerCopy {
            footerCopy
          }
          miscConfig {
            twitterName
          }
        }
      }
      allContentfulTimeStudiosProject {
        nodes {
          id
          featured
          titleShort
          titleLong
          type
          publishDate
          credits {
            person {
              fullName
            }
            role
          }
          descriptionShort {
            descriptionShort
          }
          descriptionLong {
            descriptionLong
          }
          trailer
          posterImage {
            title
            description
            gatsbyImageData(layout: FULL_WIDTH, quality: 75)
          }
          featuredImage {
            title
            description
            gatsbyImageData(layout: FULL_WIDTH, quality: 75)
          }
        }
      }
      allContentfulTimeStudiosPressItem {
        nodes {
          date
          headline
          id
          link
          project {
            id
          }
          publication
        }
      }
      allContentfulPerson {
        edges {
          node {
            id
            fullName
            bio {
              bio
            }
            title
          }
        }
      }
    }
  `;

  const q = await graphql(siteQuery);
  const menu = q.data.allContentfulSiteConfig.nodes[0].siteMenu;
  const pages = q.data.allContentfulTimeStudiosPage.nodes;
  const projects = q.data.allContentfulTimeStudiosProject.nodes;
  const press = q.data.allContentfulTimeStudiosPressItem.nodes;
  const people = q.data.allContentfulPerson.nodes;
  const config = q.data.allContentfulSiteConfig.nodes[0];

  pages.forEach((page) => {
    const { slug } = page;
    const { type } = page;
    const componentPath = `${templatesPath}/${type}`;

    // eslint-disable-next-line no-console
    console.log(`✨ Creating page for route '${slug}', mapped to component '${componentPath}'`);

    createPage({
      path: slug,
      component: `${componentPath}/index.jsx`, // match route to page components (defined in `./site-config.js`)
      context: {
        page,
        pages,
        menu,
        projects,
        press,
        people,
        config,
      },
    });
  });
};
