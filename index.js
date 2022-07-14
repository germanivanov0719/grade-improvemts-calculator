populateStorage();

function populateStorage() {
  if (!localStorage["fraction_up"]) {
    localStorage["fraction_up"] = "51";
  }
  if (!localStorage["perform-calculations-round"]) {
    localStorage["perform-calculations-round"] = "True";
  }
}

function newMean() {
  let M1 = parseFloat(document.getElementById("M1-input").value);
  let s = parseFloat(document.getElementById("s-input").value);
  let m = parseFloat(document.getElementById("m-input").value);
  let w = parseFloat(document.getElementById("w-input").value);

  res = (s * M1 + m * w) / (s + w);
  if (!res) {
    alert("Недостаточно данных");
    return 0;
  }

  document.getElementById("M2-input").textContent = res.toFixed(3);
  tillGoals(res, s + w);
}

function customRound(n) {
  a = localStorage["perform-calculations-round"];
  if (a && a != "false") {
    return Math.round(n * 100) / 100;
  }
  return n;
}

function calcTillGoal(mean, n, goal, mark = goal) {
  console.log(mark);
  let currentMean = mean;
  let currentWeight = n;
  r = 0;
  maxGrade = parseFloat(goal + "." + localStorage["fraction_up"]);
  minGrade = parseFloat(goal - 1 + "." + localStorage["fraction_up"]);
  console.log(maxGrade, minGrade);
  if (maxGrade >= mean || mean >= minGrade) {
    return 0;
  }
  if (mean <= minGrade) {
    while (customRound(currentMean) < minGrade) {
      r += 1;
      currentMean = (currentMean * currentWeight + mark) / (currentWeight + 1);
      currentWeight += 1;
    }
    return r;
  }
  while (customRound(currentMean) > maxGrade) {
    console.log(currentMean);
    r -= 1;
    currentMean = (currentMean * currentWeight + mark) / (currentWeight + 1);
    currentWeight += 1;
  }
  return r;
}

function tillGoals(mean, n) {
  mean =
    mean == undefined
      ? (mean = parseFloat(document.getElementById("M1-input").value))
      : mean;
  n = n == undefined ? parseFloat(document.getElementById("s-input").value) : n;

  if (!mean || !n || !localStorage["fraction_up"]) {
    alert("Недостаточно данных");
    return 0;
  }
  if (mean == parseFloat(document.getElementById("M1-input").value)) {
    document.getElementById("M2-input").textContent = "Не изменялся";
  }
  r = [];
  for (let i = 0; i < 4; i++) {
    r += calcTillGoal(mean, n, 5 - i);
  }
  //   r = [calcTillGoal(mean, n, 5), 0, 0, 0];

  //   // 5
  //   console.log("5:");
  //   c_m = mean;
  //   c_n = n;
  //   rq = 0;
  //   if (mean >= parseFloat(4 + "." + f_rq)) {
  //     r[0] = 0;
  //   } else {
  //     while (customRound(c_m) < parseFloat(4 + "." + f_rq)) {
  //       rq += 1;
  //       c_m = (c_m * c_n + 5) / (c_n + 1);
  //       c_n += 1;
  //       console.log(c_m);
  //     }
  //     r[0] = rq;
  //   }

  //   // 4
  //   console.log("4:");
  //   c_m = mean;
  //   c_n = n;
  //   rq = 0;
  //   if (mean < parseFloat(3 + "." + f_rq)) {
  //     while (customRound(c_m) < parseFloat(3 + "." + f_rq)) {
  //       rq += 1;
  //       c_m = (c_m * c_n + 4) / (c_n + 1);
  //       c_n += 1;
  //       console.log(c_m);
  //     }
  //   } else if (customRound(c_m) >= parseFloat(4 + "." + f_rq)) {
  //     while (customRound(c_m) >= parseFloat(4 + "." + f_rq)) {
  //       rq -= 1;
  //       c_m = (c_m * c_n + 4) / (c_n + 1);
  //       c_n += 1;
  //       console.log(c_m);
  //     }
  //   }
  //   r[1] = rq;

  //   // 3
  //   console.log("3:");
  //   c_m = mean;
  //   c_n = n;
  //   rq = 0;
  //   if (mean < parseFloat(2 + "." + f_rq)) {
  //     while (customRound(c_m) < parseFloat(2 + "." + f_rq)) {
  //       rq += 1;
  //       c_m = (c_m * c_n + 3) / (c_n + 1);
  //       c_n += 1;
  //       console.log(c_m);
  //     }
  //   } else if (c_m >= parseFloat(3 + "." + f_rq)) {
  //     while (c_m >= parseFloat(3 + "." + f_rq)) {
  //       rq -= 1;
  //       c_m = (c_m * c_n + 3) / (c_n + 1);
  //       c_n += 1;
  //       console.log(c_m);
  //     }
  //   }
  //   r[2] = rq;

  //   // 2
  //   console.log("2:");
  //   c_m = mean;
  //   c_n = n;
  //   rq = 0;
  //   if (customRound(c_m) >= parseFloat(2 + "." + f_rq)) {
  //     while (customRound(c_m) >= parseFloat(2 + "." + f_rq)) {
  //       rq -= 1;
  //       c_m = (c_m * c_n + 2) / (c_n + 1);
  //       c_n += 1;
  //       console.log(c_m);
  //     }
  //   }
  //   r[3] = rq;

  //   if (r[0] == 0) {
  //     r[0] = "Готово";
  //   }
  //   if (r[1] == 0) {
  //     r[1] = "Готово";
  //   }
  //   if (r[2] == 0) {
  //     r[2] = "Готово";
  //   }
  //   if (r[3] == 0) {
  //     r[3] = "Готово";
  //   }
  for (let i = 5; i > 1; i--) {
    if (r[5 - i] == 0) {
      r[5 - i] = "Готово";
    }
    document.getElementById("res-" + i).textContent = r[5 - i];
  }

  //   document.getElementById("res-5").textContent = r[0];
  //   document.getElementById("res-4").textContent = r[1];
  //   document.getElementById("res-3").textContent = r[2];
  //   document.getElementById("res-2").textContent = r[3];
  // console.log(r)
}
