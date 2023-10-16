const showButton1 = document.getElementsByClassName("showButton")[0];
const hideButton = document.getElementById("hideButton");
const targetDiv = document.getElementById("targetDiv");
const change_text1 = document.getElementById("change_text1");
const change_text2 = document.getElementById("change_text2");
const bodyElement2 = document.getElementById("tot_blur");
var element;
window.onload=()=>{
  if(sessionStorage.getItem('mail')==null)
  location.href=window.origin
}
window.onunload=()=>{
  sessionStorage.clear()
}
window.onloadeddata= () => {
  alert("Please enter Cost per Unit");
  calculate();
  document.getElementById("cost").addEventListener("input", () => {
    var cost = document.getElementById("cost").value;
    var monthly_cost = document.getElementsByClassName("monthly-cost");
    var monthly_consumption = document.getElementsByClassName(
      "monthly-consumption"
    );
    for (var i = 0; i < monthly_cost.length; i++)
      monthly_cost[i].innerHTML = monthly_consumption[i].innerHTML * cost;
    calculate();
  });
  delButton_event();
  var editButton = document.getElementsByClassName("editButton");
  Array.from(editButton).forEach((buttons) => {
    buttons.addEventListener("click", (e) => {
      element = e.target;
      targetDiv.style.display = "block";
      bodyElement2.classList.toggle("blur");
      targetDiv.classList.add("zoom-in");
      change_text2.style.display = "block";
      change_text1.style.display = "none";
      document.getElementById("appliance").value = e.target
        .closest("tr")
        .getElementsByClassName("appliance")[0].innerHTML;
      document.getElementById("hourly-usage").value = e.target
        .closest("tr")
        .getElementsByClassName("hourly-usage")[0].innerHTML;
      document.getElementById("quantity").value = e.target
        .closest("tr")
        .getElementsByClassName("quantity")[0].innerHTML;
      document.getElementById("day-frequency").value = e.target
        .closest("tr")
        .getElementsByClassName("day-frequency")[0].innerHTML;
    });
  });
};

function calculate() {
  var rating = document.getElementsByClassName("rating");
  var consumption_per_day = document.getElementsByClassName(
    "consumption-per-day"
  );
  var consumption_per_month = document.getElementsByClassName(
    "monthly-consumption"
  );
  var monthly_cost = document.getElementsByClassName("monthly-cost");
  var possible_savings = document.getElementsByClassName("possible-savings");
  var total_rating = 0;
  var total_daily_consumption = 0;
  var maximum_daily_consumption = 0;
  var average_daily_consumption = 0;
  var total_monthly_consumption = 0;
  var total_monthly_cost = 0;
  var daily_savings = 0;
  var rows = document.getElementById("table").rows.length - 1;

  for (i = 0; i < rating.length; i++) {
    total_rating += parseInt(rating[i].innerHTML);
  }
  for (i = 0; i < consumption_per_day.length; i++) {
    if (maximum_daily_consumption < consumption_per_day[i].innerHTML)
      maximum_daily_consumption = consumption_per_day[i].innerHTML;
  }
  // for (i = 0; i < consumption_per_day.length; i++) {
  //   total_daily_consumption += parseFloat(consumption_per_day[i].innerHTML);
  // }

  for (i = 0; i < consumption_per_month.length; i++) {
    total_monthly_consumption += parseFloat(consumption_per_month[i].innerHTML);
  }
  for (i = 0; i < monthly_cost.length; i++) {
    total_monthly_cost += parseFloat(monthly_cost[i].innerHTML);
  }
  for (i = 0; i < possible_savings.length; i++) {
    daily_savings += parseFloat(possible_savings[i].innerHTML);
  }
  total_rating = parseInt(total_rating).toFixed(3);
  total_monthly_cost = parseFloat(total_monthly_cost).toFixed(3);
  average_daily_consumption = parseFloat(average_daily_consumption).toFixed(3);
  total_monthly_consumption = parseFloat(total_monthly_consumption).toFixed(3);
  daily_savings = parseFloat(daily_savings).toFixed(3);
  average_daily_consumption = (total_monthly_consumption / (30 * rows)).toFixed(
    3
  );
  document.getElementById("rating-per-hour").value = total_rating;
  document.getElementById("maximum-daily-consumption").value =
    maximum_daily_consumption;
  document.getElementById("average-daily-consumption").value =
    average_daily_consumption;
  document.getElementById("total-monthly-consumption").value =
    total_monthly_consumption;
  document.getElementById("total-monthly-cost").value = total_monthly_cost;
  document.getElementById("daily-savings").value = daily_savings;
}

function add_appliance() {
  var cost = document.getElementById("cost").value;
  var appliance = document.getElementById("appliance").value;
  var rating = mapping[appliance];
  var hourly_usage = document.getElementById("hourly-usage").value;
  var quanity = document.getElementById("quantity").value;
  var day_frequency = document.getElementById("day-frequency").value;
  var consumption_per_day = (rating * hourly_usage * quanity) / 1000;
  consumption_per_day = consumption_per_day.toFixed(3);
  var possible_savings = consumption_per_day * 0.35;
  possible_savings = possible_savings.toFixed(3);
  var consumption_per_week = consumption_per_day * 7;
  consumption_per_week = consumption_per_week.toFixed(3);
  var consumption_per_month = consumption_per_day * 30;
  consumption_per_month = consumption_per_month.toFixed(3);
  var monthly_cost = consumption_per_month * cost;
  monthly_cost = monthly_cost.toFixed(3);
  var table = document.getElementById("table").getElementsByTagName("tbody")[0];
  var row = table.insertRow(-1);
  var classes = [
    "appliance",
    "rating",
    "hourly-usage",
    "quantity",
    "consumption-per-day",
    "possible-savings",
    "day-frequency",
    "weekly-consumption",
    "monthly-consumption",
    "monthly-cost",
  ];
  var values = [
    appliance,
    rating,
    hourly_usage,
    quanity,
    consumption_per_day,
    possible_savings,
    day_frequency,
    consumption_per_week,
    consumption_per_month,
    monthly_cost,
  ];
  var row_num = table.rows.length;
  for (var i = 0; i < 11; i++) {
    var cell = row.insertCell(i);
    if (i == 10) {
      cell.innerHTML = bhtml;
    } else cell.innerHTML = values[i];
    cell.classList.add(classes[i]);
  }
  var editButton = document.getElementsByClassName("editButton");
  editButton[row_num - 1].addEventListener("click", (e) => {
    element = e.target;
    targetDiv.style.display = "block";
    bodyElement2.classList.toggle("blur");
    targetDiv.classList.add("zoom-in");
    change_text2.style.display = "block";
    change_text1.style.display = "none";
    document.getElementById("appliance").value = e.target
      .closest("tr")
      .getElementsByClassName("appliance")[0].innerHTML;
    document.getElementById("hourly-usage").value = e.target
      .closest("tr")
      .getElementsByClassName("hourly-usage")[0].innerHTML;
    document.getElementById("quantity").value = e.target
      .closest("tr")
      .getElementsByClassName("quantity")[0].innerHTML;
    document.getElementById("day-frequency").value = e.target
      .closest("tr")
      .getElementsByClassName("day-frequency")[0].innerHTML;
  });
  delButton_event();
}

function delButton_event() {
  var delButton = document.getElementsByClassName("delButton");
  Array.from(delButton).forEach((element) => {
    element.removeEventListener("click", () => {});
    element.addEventListener("click", (e) => {
      e.target.closest("tr").remove();
      calculate()
    });
  });
}

function generatePDF() {
  var element1 = document.getElementById("com2");
  var element2 = document.getElementById("table");

  var containerDiv = document.createElement("div");
  containerDiv.appendChild(element1.cloneNode(true));
  containerDiv.appendChild(element2.cloneNode(true)); // Clone element1
  // Clone element1
  var opt = {
    margin: 0,
    filename: "report.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: "landscape" },
  };
  html2pdf().from(containerDiv).set(opt).save();
  sessionStorage.clear()
}

var bhtml = `<div class="row">
<div class="col-lg-6">
    <button class="btn editButton" style="background-color: red;padding: 3px;margin-left: -5px;"><i class="fa-solid fa-pen-to-square" style="color: #ffffff;"></i></button>
</div>
<div class="col-lg-6">
    <button class="btn delButton" style="background-color: red;padding: 3px;margin-left: -7px;"><i class="fa-solid fa-trash" style="color: #ffffff;"></i></button>
</div>
</div>`;
const mapping = {
  "LED Light Bulb - 12 -LOW": 12.0,
  "LED Light Bulb - 40 -LOW": 40.0,
  "LED Light Bulb - 43 -LOW": 43.0,
  "LED Light Bulb - 54 -LOW": 54.0,
  "LED Light Bulb - 60 -LOW": 60.0,
  "LED Light Bulb - 80 -LOW": 80.0,
  "LED Light Bulb - 12 -MEDIUM": 12.0,
  "LED Light Bulb - 40 -MEDIUM": 40.0,
  "LED Light Bulb - 43 -MEDIUM": 43.0,
  "LED Light Bulb - 54 -MEDIUM": 54.0,
  "LED Light Bulb - 60 -MEDIUM": 60.0,
  "LED Light Bulb - 80 -MEDIUM": 80.0,
  "LED Light Bulb - 12 -HIGH": 12.0,
  "LED Light Bulb - 40 -HIGH": 40.0,
  "LED Light Bulb - 43 -HIGH": 43.0,
  "LED Light Bulb - 54 -HIGH": 54.0,
  "LED Light Bulb - 60 -HIGH": 60.0,
  "LED Light Bulb - 80 -HIGH": 80.0,
  "OUTDOOR LED- 45 - MEDIUM": 45.0,
  "OUTDOOR LED- 100 - MEDIUM": 100.0,
  "OUTDOOR LED- 60 - MEDIUM": 60.0,
  "LED Light Bulb - 6 -LOW": 6.0,
  "LED Light Bulb - 6 -MEDIUM": 6.0,
  "LED Light Bulb - 6 -HIGH": 6.0,
};

const options = [
  "LED Light Bulb - 12 -LOW",
  "LED Light Bulb - 40 -LOW",
  "LED Light Bulb - 43 -LOW",
  "LED Light Bulb - 54 -LOW",
  "LED Light Bulb - 60 -LOW",
  "LED Light Bulb - 80 -LOW",
  "LED Light Bulb - 12 -MEDIUM",
  "LED Light Bulb - 40 -MEDIUM",
  "LED Light Bulb - 43 -MEDIUM",
  "LED Light Bulb - 54 -MEDIUM",
  "LED Light Bulb - 60 -MEDIUM",
  "LED Light Bulb - 80 -MEDIUM",
  "LED Light Bulb - 12 -HIGH",
  "LED Light Bulb - 40 -HIGH",
  "LED Light Bulb - 43 -HIGH",
  "LED Light Bulb - 54 -HIGH",
  "LED Light Bulb - 60 -HIGH",
  "LED Light Bulb - 80 -HIGH",
  "OUTDOOR LED- 45 - MEDIUM",
  "OUTDOOR LED- 100 - MEDIUM",
  "OUTDOOR LED- 60 - MEDIUM",
  "LED Light Bulb - 6 -LOW",
  "LED Light Bulb - 6 -MEDIUM",
  "LED Light Bulb - 6 -HIGH",
];

var select = document.getElementById("appliance");
for (var i = 0; i < options.length; i++) {
  var opt = options[i];
  var el = document.createElement("option");
  el.textContent = opt;
  el.value = opt;
  el.classList.add("option");
  select.appendChild(el);
}

showButton1.addEventListener("click", () => {
  if (document.getElementById("cost").value == "") {
    alert("Please enter Cost per Unit");
    return;
  }
  targetDiv.style.display = "block";
  bodyElement2.classList.toggle("blur");
  targetDiv.classList.add("zoom-in");
  change_text2.style.display = "none";
  change_text1.style.display = "block";
  calculate();
});

hideButton.addEventListener("click", () => {
  bodyElement2.classList.toggle("blur");
  targetDiv.classList.add("zoom-out");
  setTimeout(() => {
    targetDiv.style.display = "none";
    targetDiv.classList.remove("zoom-out");
  }, 400);
  document.getElementById("appliance").value = "";
  document.getElementById("hourly-usage").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("day-frequency").value = "";
});

change_text1.addEventListener("click", () => {
  if (document.getElementById("cost").value == "") {
    alert("Please enter Cost per Unit");
    return;
  }
  var appliance = document.getElementById("appliance").value;
  var value = document.getElementById("hourly-usage").value;
  var quanity = document.getElementById("quantity").value;
  var day_frequency = document.getElementById("day-frequency").value;
  if (appliance == 0 || value == "" || quanity == "" || day_frequency == "") {
    alert("please enter all values");
    return;
  }
  if (value < 1 || value > 24) {
    alert("Hourly usage can be in range from 1 to 24");
    return;
  }
  if (quanity < 1) {
    alert("quantity must be atleast 1");
    return;
  }
  if (day_frequency < 1 || day_frequency > 7) {
    alert("Day frequency must be in range from 1 to 7");
    return;
  }
  add_appliance();
  bodyElement2.classList.toggle("blur");
  targetDiv.classList.add("zoom-out");
  calculate();
  setTimeout(() => {
    targetDiv.style.display = "none";
    targetDiv.classList.remove("zoom-out");
  }, 400);
  document.getElementById("appliance").value = "";
  document.getElementById("hourly-usage").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("day-frequency").value = "";
});

change_text2.addEventListener(
  "click",
  () => {
    var appliance = document.getElementById("appliance").value;
    var value = document.getElementById("hourly-usage").value;
    var quanity = document.getElementById("quantity").value;
    var day_frequency = document.getElementById("day-frequency").value;
    if (appliance == 0 || value == "" || quanity == "" || day_frequency == "") {
      alert("please enter all values");
      return;
    }
    if (value < 1 || value > 24) {
      alert("Hourly usage can be in range from 1 to 24");
      return;
    }
    if (quanity < 1) {
      alert("quantity must be atleast 1");
      return;
    }
    if (day_frequency < 1 || day_frequency > 7) {
      alert("Day frequency must be in range from 1 to 7");
      return;
    }
    var cost = document.getElementById("cost").value;
    var appliance = document.getElementById("appliance").value;
    var rating = mapping[appliance];
    var hourly_usage = document.getElementById("hourly-usage").value;
    var quanity = document.getElementById("quantity").value;
    var day_frequency = document.getElementById("day-frequency").value;
    var consumption_per_day = (rating * hourly_usage * quanity) / 1000;
    consumption_per_day = consumption_per_day.toFixed(3);
    var possible_savings = consumption_per_day * 0.35;
    possible_savings = possible_savings.toFixed(3);
    var consumption_per_week = consumption_per_day * 7;
    consumption_per_week = consumption_per_week.toFixed(3);
    var consumption_per_month = consumption_per_day * 30;
    consumption_per_month = consumption_per_month.toFixed(3);
    var monthly_cost = consumption_per_month * cost;
    monthly_cost = monthly_cost.toFixed(3);

    element.closest("tr").getElementsByClassName("appliance")[0].innerHTML =
      appliance;
    element.closest("tr").getElementsByClassName("rating")[0].innerHTML =
      rating;
    element.closest("tr").getElementsByClassName("hourly-usage")[0].innerHTML =
      hourly_usage;
    element.closest("tr").getElementsByClassName("quantity")[0].innerHTML =
      quanity;
    element.closest("tr").getElementsByClassName("day-frequency")[0].innerHTML =
      day_frequency;
    element
      .closest("tr")
      .getElementsByClassName("consumption-per-day")[0].innerHTML =
      consumption_per_day;
    element
      .closest("tr")
      .getElementsByClassName("possible-savings")[0].innerHTML =
      possible_savings;
    element
      .closest("tr")
      .getElementsByClassName("weekly-consumption")[0].innerHTML =
      consumption_per_week;
    element
      .closest("tr")
      .getElementsByClassName("monthly-consumption")[0].innerHTML =
      consumption_per_month;
    element.closest("tr").getElementsByClassName("monthly-cost")[0].innerHTML =
      monthly_cost;
    bodyElement2.classList.toggle("blur");
    targetDiv.classList.add("zoom-out");
    setTimeout(() => {
      targetDiv.style.display = "none";
      targetDiv.classList.remove("zoom-out");
    }, 400);
    calculate();
    document.getElementById("appliance").value = "";
    document.getElementById("hourly-usage").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("day-frequency").value = "";
  },
  true
);

const generatePDFButton = document.getElementById("generatePDFButton");
if (generatePDFButton) {
  generatePDFButton.addEventListener("click", function () {
    generatePDF();
  });
}
