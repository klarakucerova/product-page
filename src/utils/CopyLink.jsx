
export const copyLink = (url, setShowToast) => {
  navigator.clipboard.writeText(url);
  setShowToast(true);
  setTimeout(() => setShowToast(false), 3000);
};