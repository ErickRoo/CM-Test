exports.getPostsBasedOnFavoriteFilter = (posts, rawAllPosts, filter, profile = {}) => {
  const caseA = !posts;
  const caseB = !Object.prototype.hasOwnProperty.call(profile, 'favoriteContent');
  const caseC = !Array.isArray(profile.favoriteContent);

  if (caseA || caseB || caseC) return [];
  if (!filter) return posts;

  return rawAllPosts.nodes.filter((onePost) => profile.favoriteContent.includes(onePost.id));
};
