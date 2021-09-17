export default function generateID() {
  return `${Math.random().toString(32).slice(2)}-${Math.random().toString(32).slice(2)}`
}