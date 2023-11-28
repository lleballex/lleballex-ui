export const getFormError = (error: string) => {
  switch (error) {
    case 'required':
      return 'Заполни это поле'
    default:
      return error
  }
}
