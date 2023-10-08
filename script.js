var r_otp="iuytrdfvghjkliuytdcvbhjuyg";
async function send_otp() {
  var mail = document.getElementById("mail").value;
  var name=document.getElementById("name").value
  const url="https://mail-otp-sender.vercel.app?mail=" + mail + "&digit=4"+"&name='"+name+"'"
  alert("Sending otp");
  fetch(url)
    .then(async(response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      // Parse the response as JSON
      var data = await response.json();
      // Set the r_otp variable with the OTP received from the server
      r_otp += data.otp;
      r_otp+="21343546kjfghgjhkjlkhgjhjbkjl5768756453421ysgwjbkgdfbfgdvfsbjdkd"
      // Display a success message
      alert("OTP sent succesfully!");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function validate_otp() {
  var otp = document.getElementById("ver-code").value;
  if (r_otp == "iuytrdfvghjkliuytdcvbhjuyg"+otp+"21343546kjfghgjhkjlkhgjhjbkjl5768756453421ysgwjbkgdfbfgdvfsbjdkd") {
    // Use location.href to navigate to the new page
    window.location.href = "./calculator.html";
  } else {
    // Display an error message
    alert("Invalid OTP. Please try again.");
  }
  r_otp="iuytrdfvghjkliuytdcvbhjuyg";
}

document.getElementById("send").addEventListener("click", () => {
  //  send_otp();
});

document.getElementById("verify").addEventListener("click", () => {
  // validate_otp();
});
