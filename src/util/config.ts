export function getConfigProperty(property: string) {
  return process.env[property];
}
