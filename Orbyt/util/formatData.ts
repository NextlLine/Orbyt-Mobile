export default function formatData(label: string) {
  const [mm] = label.split("-");
  const monthIndex = parseInt(mm, 10) - 1; 

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  return monthNames[monthIndex] ?? label; 
}
