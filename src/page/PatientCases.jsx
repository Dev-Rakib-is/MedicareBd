import { useEffect, useState } from "react";

const PatientCases = ({ patientId }) => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!patientId) return;

    setLoading(true);
    fetch(`/patient-cases/${patientId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => setCases(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [patientId]);

  if (loading) return <p> Loading . . .</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cases.length) return <p>No case.</p>;

  return (
    <div className="mt-16">
      <h2>My Cases</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Doctor</th>
            <th>Diagnosis</th>
          </tr>
        </thead>
        <tbody>
          {cases.map(c => (
            <tr key={c.id}>
              <td>{c.date}</td>
              <td>{c.doctor}</td>
              <td>{c.diagnosis}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientCases;
