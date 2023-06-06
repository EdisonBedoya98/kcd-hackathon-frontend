import { FormProps } from "@/interfaces/interfaces";
import { useState } from "react";

export const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(message);
    setMessage("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-2">
      <input
        type="text"
        name="message"
        value={message}
        onChange={handleChange}
        placeholder="Enter your message"
        required
        className="text-black"
      />
      <button type="submit" className="bg-gray-400 max-w-xs p-1 mx-auto">
        Submit
      </button>
    </form>
  );
};
