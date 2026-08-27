import axiosInstance from './axiosInstance'

const TYPES_WITH_FILE = new Set(['leaveWithout', 'extension'])

export const studentRequestsService = {
  submit: (type, studentInfo, formData, files = {}) => {
    const hasFiles =
      TYPES_WITH_FILE.has(type) &&
      Object.values(files).some((f) => f instanceof File)

    if (hasFiles) {
      const body = new FormData()
      body.append('type', type)
      body.append('firstName', studentInfo.firstName)
      body.append('lastName', studentInfo.lastName)
      body.append('studentNumber', studentInfo.studentNumber)
      body.append('formData', JSON.stringify(formData))

      Object.entries(files).forEach(([fieldName, file]) => {
        if (file instanceof File) {
          body.append(fieldName, file)
        }
      })

      return axiosInstance.post('/requests', body, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    }

    return axiosInstance.post('/requests', {
      type,
      firstName: studentInfo.firstName,
      lastName: studentInfo.lastName,
      studentNumber: studentInfo.studentNumber,
      formData,
    })
  },

  track: (trackingCode) =>
    axiosInstance.get(`/requests/track/${trackingCode}`),
}
