export default function(harvsts) {
  let harvstArr = [];
  for (let i in harvsts) {
    if (harvsts.hasOwnProperty(i)) {
      harvstArr.push(harvsts[i]);
    }
  }

  return harvstArr;
}
