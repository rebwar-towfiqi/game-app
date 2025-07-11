import React, { useState } from "react";

interface RoleChatBoxProps {
  role: string;
}

const RoleChatBox: React.FC<RoleChatBoxProps> = ({ role }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message.trim()) return;
    console.log(`[${role}] گفت: ${message}`);
    setMessage("");
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        ارسال پیام ({role === "judge" ? "قاضی" : role === "prosecutor" ? "دادستان" : "وکیل"})
      </h3>
      <textarea
        className="w-full border border-gray-300 rounded p-2 text-sm"
        rows={3}
        placeholder="متن پیام خود را وارد کنید..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
      >
        📤 ارسال
      </button>
    </div>
  );
};

export default RoleChatBox;
