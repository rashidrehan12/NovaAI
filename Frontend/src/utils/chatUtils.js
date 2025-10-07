export const formatTime = (timestamp) => {
  const now = new Date();
  const diff = now - timestamp;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return timestamp.toLocaleDateString();
};

export const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};