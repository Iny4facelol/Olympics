import { useState } from "react";
import { postCenter } from "../../center-form/api/postCenter";

const initialValues = {
  centerName: "",
  centerEmail: "",
};

export default function CenterClientFormComp() {
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
    <form className="flex items-center flex-col bg-slate-400">
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
        Center City:
        <input
          onChange={handleChange}
          value={formData.centerEmail}
          type="text"
          name="center_city"
        />
      </label>
      <label>
        Center Province:
        <input
          onChange={handleChange}
          value={formData.centerName}
          type="text"
          name="center_province"
        />
      </label>
      <label>
        Center Address:
        <input
          onChange={handleChange}
          value={formData.centerEmail}
          type="email"
          name="center_address"
        />
      </label>
      <label>
        Center Phone:
        <input
          onChange={handleChange}
          value={formData.centerEmail}
          type="email"
          name="center_phone"
        />
      </label>
      <label>
        Center Auth:
        <input
          onChange={handleChange}
          value={formData.centerEmail}
          type="email"
          name="center_auth_doc"
        />
      </label>
      <button onClick={onSubmit}>Enviar</button>
    </form>
  );
}
