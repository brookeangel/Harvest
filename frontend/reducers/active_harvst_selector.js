export default function (harvsts, activeHarvstId) {
  return harvsts.find(harvst => harvst.id === activeHarvstId);
}
