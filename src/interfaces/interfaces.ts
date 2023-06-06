interface HistoryRecord {
  message: string;
  createdAt: string;
  physician: string;
}

export interface Patient {
  id: string;
  name: string;
  document: string;
  documentType: string;
  history: HistoryRecord[];
}

export interface PatientProps {
  data: Patient;
}

export interface FormProps {
  onSubmit: (message: string) => void;
}
