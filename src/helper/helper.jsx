export const getStatusStyle = (status) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800",
    "on going": "bg-green-100 text-green-800",
    resolved: "bg-red-100 text-red-800",
  };

  return styles[status?.toLowerCase()] || "bg-gray-100 text-gray-800";
};
