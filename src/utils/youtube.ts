export function getYouTubeVideoId(videoIdOrUrl: string): string {
  // If it's already an ID (no slashes or youtube.com), return as is
  if (!videoIdOrUrl.includes('/') && !videoIdOrUrl.includes('youtube.com')) {
    return videoIdOrUrl;
  }

  // Handle different YouTube URL formats
  const url = new URL(videoIdOrUrl);
  
  // youtube.com/watch?v=ID format
  if (url.searchParams.has('v')) {
    return url.searchParams.get('v') || '';
  }
  
  // youtu.be/ID format
  if (url.hostname === 'youtu.be') {
    return url.pathname.slice(1);
  }
  
  // youtube.com/embed/ID format
  if (url.pathname.includes('/embed/')) {
    return url.pathname.split('/embed/')[1];
  }

  return '';
}