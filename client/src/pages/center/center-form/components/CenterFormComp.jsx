import { useState } from "react";
import { postCenter } from "../api/postCenter";

const initialValues = {
  centerName: "",
  centerEmail: "",
};

export default function Form() {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    postCenter(formData);
  };

  return (
    <form className="flex items-center">
      <label>
        Center Name:
        <input
          onChange={handleChange}
          value={formData.centerName}
          type="text"
          name="center_name"
        />
      </label>
      <label>
        Center Email:
        <input
          onChange={handleChange}
          value={formData.centerEmail}
          type="email"
          name="center_email"
        />
      </label>
      <button onClick={onSubmit}>Enviar</button>
    </form>
  );
}
