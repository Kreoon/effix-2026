// Parser de datos Apify @feriaeffix → resumen de branding
import fs from "node:fs/promises";

const OUT = "./output";
const profileData = JSON.parse(await fs.readFile(`${OUT}/01-profile.json`, "utf8"));
const postsData = JSON.parse(await fs.readFile(`${OUT}/02-posts.json`, "utf8"));

const p = profileData[0];

// Perfil resumen
const profile = {
  username: p.username,
  fullName: p.fullName,
  biography: p.biography,
  followers: p.followersCount,
  following: p.followsCount,
  postsCount: p.postsCount,
  verified: p.verified,
  isBusinessAccount: p.isBusinessAccount,
  highlightReelCount: p.highlightReelCount,
  profilePicUrl: p.profilePicUrl,
  profilePicUrlHD: p.profilePicUrlHD,
  externalUrls: p.externalUrls,
  latestIgtvVideos: (p.latestIgtvVideos || []).length,
};

// Análisis de posts
const posts = postsData;
const byType = {};
const hashtagCount = {};
const mentionCount = {};
let totalLikes = 0, totalComments = 0, totalViews = 0;
const topPosts = [];

for (const post of posts) {
  byType[post.type] = (byType[post.type] || 0) + 1;
  totalLikes += post.likesCount || 0;
  totalComments += post.commentsCount || 0;
  totalViews += post.videoViewCount || post.videoPlayCount || 0;

  for (const h of post.hashtags || []) hashtagCount[h] = (hashtagCount[h] || 0) + 1;
  for (const m of post.mentions || []) mentionCount[m] = (mentionCount[m] || 0) + 1;

  topPosts.push({
    url: post.url,
    type: post.type,
    caption: (post.caption || "").slice(0, 300),
    likes: post.likesCount || 0,
    comments: post.commentsCount || 0,
    views: post.videoViewCount || post.videoPlayCount || 0,
    engagement: (post.likesCount || 0) + (post.commentsCount || 0),
    hashtags: post.hashtags || [],
    timestamp: post.timestamp,
    displayUrl: post.displayUrl,
    videoUrl: post.videoUrl,
    alt: post.alt,
  });
}

topPosts.sort((a, b) => b.engagement - a.engagement);

const engagementRate = profile.followers
  ? (((totalLikes + totalComments) / posts.length / profile.followers) * 100).toFixed(2)
  : 0;

const sortedHashtags = Object.entries(hashtagCount).sort((a, b) => b[1] - a[1]);
const sortedMentions = Object.entries(mentionCount).sort((a, b) => b[1] - a[1]);

// Captions destacados para analizar tono
const captionsSample = posts
  .filter((p) => p.caption && p.caption.length > 50)
  .slice(0, 20)
  .map((p) => ({ caption: p.caption, likes: p.likesCount, type: p.type }));

const summary = {
  profile,
  engagementMetrics: {
    postsAnalyzed: posts.length,
    totalLikes,
    totalComments,
    totalViews,
    avgLikes: Math.round(totalLikes / posts.length),
    avgComments: Math.round(totalComments / posts.length),
    engagementRatePercent: parseFloat(engagementRate),
  },
  contentMix: byType,
  topHashtags: sortedHashtags.slice(0, 15),
  topMentions: sortedMentions.slice(0, 15),
  top10Posts: topPosts.slice(0, 10),
  captionSamples: captionsSample,
};

await fs.writeFile(`${OUT}/03-summary.json`, JSON.stringify(summary, null, 2));

console.log("=== PERFIL @feriaeffix ===");
console.log(`Name: ${profile.fullName}`);
console.log(`Followers: ${profile.followers.toLocaleString()}`);
console.log(`Posts: ${profile.postsCount}`);
console.log(`Highlights: ${profile.highlightReelCount}`);
console.log(`Verified: ${profile.verified} | Business: ${profile.isBusinessAccount}`);
console.log("");
console.log(`Bio:\n${profile.biography}`);
console.log("");
console.log("=== ENGAGEMENT (últimos 60 posts) ===");
console.log(`Avg likes: ${summary.engagementMetrics.avgLikes}`);
console.log(`Avg comments: ${summary.engagementMetrics.avgComments}`);
console.log(`ER %: ${engagementRate}%`);
console.log("");
console.log("=== CONTENT MIX ===");
console.log(byType);
console.log("");
console.log("=== TOP 10 HASHTAGS ===");
sortedHashtags.slice(0, 10).forEach(([h, c]) => console.log(`#${h}: ${c}`));
console.log("");
console.log("=== TOP 5 POSTS BY ENGAGEMENT ===");
topPosts.slice(0, 5).forEach((p, i) => {
  console.log(`[${i + 1}] ${p.type} | ❤️ ${p.likes} 💬 ${p.comments} 👁️ ${p.views}`);
  console.log(`    ${p.caption.slice(0, 150)}`);
  console.log(`    ${p.url}`);
});

console.log("\n✅ Summary → output/03-summary.json");
