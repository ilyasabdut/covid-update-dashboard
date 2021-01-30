export default function Table({ covid }) {
  const { name } = covid;
  return (
    <tr>
      <td>{name}</td>
      <td>{covid.numbers.infected}</td>
      <td>{covid.numbers.recovered}</td>
      <td>{covid.numbers.fatal}</td>
    </tr>
  );
}
