import { useState } from "react";

  
export default function useFormState(initial) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };
  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  return { form, errors, setErrors, set, update };
}
