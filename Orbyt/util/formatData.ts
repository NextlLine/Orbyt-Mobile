export default function formatData(date: Date) {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const monthIndex = date.getMonth(); 
  return monthNames[monthIndex];
}
