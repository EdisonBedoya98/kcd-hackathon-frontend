import { PatientProps } from "@/interfaces/interfaces";

export const PatientComponent: React.FC<PatientProps> = ({ data }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Patient Details</h2>
      <p>
        ID: {data.id}
        <br />
        Name: {data.name}
        <br />
        Document: {data.document}
        <br />
        Document Type: {data.documentType}
      </p>

      <h3 className="text-xl font-bold  mt-4">History</h3>
      <ul className="grid gap-2">
        {data.history.map((record, index) => (
          <li key={index}>
            <strong>Message:</strong> {record.message}
            <br />
            <strong>Created At:</strong>{" "}
            {new Date(record.createdAt).toLocaleDateString()}
            <br />
            <strong>Physician:</strong> {record.physician}
          </li>
        ))}
      </ul>
    </div>
  );
};
