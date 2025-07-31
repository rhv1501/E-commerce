const checkServerHealth = async () => {
  try {
    const response = await fetch("/health");
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Health check failed:", error);
    alert("server is down please try again later or contact support");
    return false;
  }
};

export default checkServerHealth;
