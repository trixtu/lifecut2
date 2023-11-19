// Funcție pentru gestionarea claselor CSS
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}
