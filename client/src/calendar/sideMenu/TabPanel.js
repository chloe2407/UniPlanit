export default function TabPanel({ children, value, index }) {
  return <div hidden={value !== index}>{value === index && children}</div>;
}
