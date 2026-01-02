
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  label: string;
  type?: 'text' | 'select' | 'textarea';
  options?: { value: string; label: string }[];
}

const Input: React.FC<InputProps> = ({ label, type = 'text', options, className, ...props }) => {
  const baseClasses = "w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm mb-4";
  
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</label>
      {type === 'text' && (
        <input className={`${baseClasses} ${className}`} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {type === 'textarea' && (
        <textarea className={`${baseClasses} h-24 resize-none ${className}`} {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      )}
      {type === 'select' && (
        <select className={`${baseClasses} ${className}`} {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}>
          {options?.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Input;
