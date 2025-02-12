export function getDaysAgo(createdAt) {
  const created = new Date(createdAt);
  const now = new Date();
  const diffTime = Math.abs(now - created);
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  
  if (diffMinutes < 60) {
    return diffMinutes <= 1 ? '1 minute ago' : `${diffMinutes} minutes ago`;
  }
  
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  if (diffHours < 24) {
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  }
  
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
}
