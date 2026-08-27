import React from 'react'

const RING_COLOR_CLASS = {
  purple: 'focus:ring-violet-500',
  blue: 'focus:ring-blue-500',
  emerald: 'focus:ring-emerald-500',
  amber: 'focus:ring-amber-500',
  rose: 'focus:ring-rose-500',
  indigo: 'focus:ring-indigo-500',
  fuchsia: 'focus:ring-fuchsia-500',
  cyan: 'focus:ring-cyan-500',
  teal: 'focus:ring-teal-500',
  orange: 'focus:ring-orange-500',
  red: 'focus:ring-red-500',
  slate: 'focus:ring-slate-500',
  sky: 'focus:ring-sky-500',
}

const baseInputClass = (color, hasError) => {
  const ringClass = RING_COLOR_CLASS[color] || RING_COLOR_CLASS.indigo

  const borderClass = hasError
    ? 'border-rose-400 focus:ring-rose-500'
    : 'border-slate-200 hover:border-slate-300 focus:border-indigo-400'

  return `
    w-full
    rounded-xl
    border
    bg-white
    px-4 py-2.5
    text-sm text-slate-800
    placeholder:text-slate-400
    outline-none
    transition-all duration-200
    focus:ring-2
    ${borderClass}
    ${ringClass}
  `
}

function FormField({ field, register, errors, color = 'indigo' }) {
  const error = errors?.[field.name]
  const wrapperClass = field.fullWidth ? 'md:col-span-2' : ''
  const inputClass = baseInputClass(color, !!error)

  return (
    <div className={wrapperClass}>
      <label
        htmlFor={field.name}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {field.label}
        {field.optionalLabel && (
          <span className="mr-1 text-xs font-normal text-slate-400">
            ({field.optionalLabel})
          </span>
        )}
      </label>

      {field.type === 'select' && (
        <select
          id={field.name}
          {...register(field.name)}
          aria-invalid={!!error}
          aria-describedby={error ? `${field.name}-error` : undefined}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="">انتخاب کنید</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {field.type === 'textarea' && (
        <textarea
          id={field.name}
          {...register(field.name)}
          rows={field.rows || 4}
          placeholder={field.placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${field.name}-error` : undefined}
          className={`${inputClass} resize-y`}
        />
      )}

      {field.type === 'text' && (
        <input
          id={field.name}
          type="text"
          {...register(field.name)}
          placeholder={field.placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${field.name}-error` : undefined}
          className={inputClass}
        />
      )}

      {error && (
        <p
          id={`${field.name}-error`}
          role="alert"
          className="mt-1.5 flex items-center gap-1 text-xs text-rose-500"
        >
          <i className="bi bi-exclamation-circle" aria-hidden="true" />
          {error.message}
        </p>
      )}
    </div>
  )
}

export default FormField