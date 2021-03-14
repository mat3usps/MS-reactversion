require("isomorphic-fetch");

const url =
  'https://www.instagram.com/graphql/query/?query_hash=d4d88dc1500312af6f937f7b804c68c3&variables={"id":"22194789662","first":6}';

const cache = {
  lastFetch: 0,
  posts: [],
};

async function getPosts() {
  const timeSinceLastfetch = Date.now() - cache.lastFetch;
  if (timeSinceLastfetch <= 1800000) {
    return cache.posts;
  }
  const data = await fetch(url).then((res) => res.json());
  const posts = slimUpPosts(data);
  cache.lastFetch = Date.now();
  cache.posts = posts;
  return data;
}

function slimUpPosts(response) {
  return respose.data.user.edge_owner_to_timeline_media.edges.map((edge) => ({
    thumbnail: edge.node.thumbnail_src,
    url: `https://instagram.com/p/${edge.node.shortcode}`,
    caption: edge.node.edge_media_to_caption.edges[0].node.text,
    id: edge.node.id,
  }));
}

exports.handler = async function (event, context, callback) {
  const posts = await getPosts();

  callback(null, {
    statusDoce: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(posts),
  });
};
