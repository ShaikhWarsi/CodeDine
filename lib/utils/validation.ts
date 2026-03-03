export const validateSubmissionUrl = (url: string, platform: string): boolean => {
  if (!url) return false;
  
  const normalizedUrl = url.toLowerCase().trim();
  
  switch (platform.toLowerCase()) {
    case 'leetcode':
      return normalizedUrl.includes('leetcode.com/submissions/detail/') || 
             normalizedUrl.includes('leetcode.com/problems/') && normalizedUrl.includes('/submissions/');
    case 'codeforces':
      return normalizedUrl.includes('codeforces.com/contest/') && normalizedUrl.includes('/submission/');
    case 'codechef':
      return normalizedUrl.includes('codechef.com/viewsolution/');
    case 'gfg':
    case 'geeksforgeeks':
      return normalizedUrl.includes('geeksforgeeks.org/problems/') || 
             normalizedUrl.includes('practice.geeksforgeeks.org/viewsol');
    default:
      return normalizedUrl.startsWith('http');
  }
};
