
import Papa from 'papaparse';

export const generateSampleCsv = () => {
  const sampleData = [
    {
      Name: "John Doe",
      GR_Number: "GR12345",
      Roll_Number: "1001",
      Year: "2023",
      Department: "Computer Science",
      Overall_Percentage: "85.5"
    },
    {
      Name: "Jane Smith",
      GR_Number: "GR67890",
      Roll_Number: "1002",
      Year: "2023",
      Department: "Information Technology",
      Overall_Percentage: "92.3"
    }
  ];

  const csv = Papa.unparse(sampleData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'sampleStudents.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
