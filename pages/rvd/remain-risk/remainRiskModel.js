function nhdllevel(nhdl) {
  return nhdl >= 5.2 ? 1 : 0
}
function bmilevel(height,weight) {
  return (weight * 10000 / (height * height)) >= 28 ? 1 : 0
}
export default{
  nhdllevel: nhdllevel,
  bmilevel:bmilevel
}