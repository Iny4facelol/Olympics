import { useState } from "react";

const initialValues = {
  centerName: "",
  centerAddress: "",
};

export default function Form() {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData);
  
  return (
    <form className="flex items-center">
      <label>
        Center Name:
        <input
          onChange={handleChange}
          value={formData.centerName}
          type="text"
          name="centerName"
        />
      </label>
      <label>
        Center Address:
        <input
          onChange={handleChange}
          value={formData.centerAddress}
          type="text"
          name="centerAddress"
        />
      </label>
    </form>
  );
}
