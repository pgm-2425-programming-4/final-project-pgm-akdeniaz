export default function Backlog({ tasks }) {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2 text-left">Task</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="border p-2">{task}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
