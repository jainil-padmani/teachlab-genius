
import { useState } from "react";
import { Student } from "@/types/dashboard";
import StudentFormFields from "./form/StudentFormFields";
import StudentFormActions from "./form/StudentFormActions";
import { useStudentMutations } from "./form/useStudentMutations";

interface StudentFormProps {
  student: Student | null;
  onClose: () => void;
  classes?: { id: string; name: string; department: string | null; year: number | null }[];
  isClassesLoading?: boolean;
}

export default function StudentForm({ student, onClose, classes, isClassesLoading }: StudentFormProps) {
  const [selectedYear, setSelectedYear] = useState<string>(student?.year ? student.year.toString() : "");
  const [selectedDepartment, setSelectedDepartment] = useState<string>(student?.department || "");
  
  const { createStudentMutation, updateStudentMutation } = useStudentMutations();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const yearValue = formData.get("year") as string;
    const studentData = {
      name: formData.get("name") as string,
      gr_number: formData.get("gr_number") as string,
      roll_number: formData.get("roll_number") as string || null,
      year: yearValue ? parseInt(yearValue) : null,
      department: formData.get("department") as string,
      overall_percentage: parseFloat(formData.get("overall_percentage") as string) || null,
      class_id: formData.get("class_id") as string || null,
    };

    if (student) {
      updateStudentMutation.mutate({ id: student.id, ...studentData });
    } else {
      createStudentMutation.mutate(studentData as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <StudentFormFields
        student={student}
        classes={classes}
        isClassesLoading={isClassesLoading}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
      />
      <StudentFormActions 
        isEditing={!!student} 
        onClose={onClose} 
      />
    </form>
  );
}
