import React from 'react'

const InputField = ({ label, type, name, value, onChange }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-700">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            placeholder={label}
            className="ring-2 ring-gray-600 rounded-md p-4 bg-white text-black"
            onChange={onChange}
        />
    </div>
);

export default InputField
