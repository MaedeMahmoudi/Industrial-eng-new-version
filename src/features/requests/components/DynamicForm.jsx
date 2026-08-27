import React from 'react'
import FormField from './FormField'

// ============================================
// DynamicForm
// رندر داینامیک فیلدهای فرم بر اساس configuration
// ============================================

function DynamicForm({
  fields = [],
  register,
  errors,
  color = 'violet',
}) {
  if (!fields.length) {
    return null
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {fields.map((field) => (
        <FormField
          key={field.name}
          field={field}
          register={register}
          errors={errors}
          color={color}
        />
      ))}
    </div>
  )
}

export default DynamicForm