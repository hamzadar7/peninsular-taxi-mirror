
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const handleNavigationClick = () => {
  // Small delay to ensure navigation completes first
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
};
