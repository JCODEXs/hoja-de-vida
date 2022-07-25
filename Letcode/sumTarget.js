let nums = [12, 15, -18, 11, -13, 10];
nums = nums.sort((a, b) => a - b);
const target = 39;
const meanNums = nums.reduce((a, b) => a + b) / nums.length;
const Average = target / 3;
let Filtro1 = null;
const sigma2 = [];
let i = 0;
var threeSumClosest = function (nums, target) {
  for (let j = 0; j < nums.length; j++) {
    let sigmai = ((nums[j] - meanNums) * (nums[j] - meanNums)) / nums.length;
    sigma2.push(sigmai);
  }

  let sigma = Math.sqrt(sigma2.reduce((a, b) => a + b));
  if (sigma === 0) {
    sigma = 1 * meanNums;
  }
  let range = [Average - sigma, Average + sigma];
  range.sort((a, b) => a - b);

  let esRango = (num) => {
    num >= range[0] && num <= range[1];
    return true;
  };
  const Filtro = nums.filter(esRango);
  if (Filtro.length >= 3) {
    console.log("pirate");
  }

  Filtro1 = Filtro.reduce((a, b) => a + b);
  console.log(Filtro, range, sigma, Average);
  return Filtro1;
};

const result = threeSumClosest(nums, target);
console.log(result);
