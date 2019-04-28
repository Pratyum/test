const hostname = window.location.hostname.split(".")[0];
console.log("hostname", hostname);
// console.log(apiUrl);
// if (apiUrl.includes("localhost")) {
//   apiUrl = "http://localhost:8080/";
// } else {
//   apiUrl = "http://localhost:8080/";
// }
// apiUrl = "http://localhost:8080/";
const apiUrl = "https://bmlandingpages-dot-panalyt-dev.appspot.com/";
async function getCompanyConfig(name) {
  resp = await fetch(apiUrl + "getCompanyConfig?company=" + name);
  console.log(resp);
  if (resp.status === 400) {
    return "error";
  }
  return resp.json();
}
getCompanyConfig(hostname).then(resp => {
  console.log(resp);
  if (resp === "error" || resp.links.length === 0) {
    window.location.replace("/404.html");
  } else {
    addAllDataInfo(resp);
  }
});

const NameColorHashmap = {
  people: "rgb(38, 166, 154)",
  travelandexpenses: "rgb(157, 30, 92)",
  travel: "rgb(243, 143, 25)",
  expenses: "rgb(248, 206, 61)",
  hrselfservice: "rgb(128, 217, 210)",
  leave: "rgb(15, 181, 225)",
  payslips: "rgb(75, 60, 234)",
  recruitment: "rgb(109, 189, 90)",
  benefits: "rgb(215, 47, 92)",
  policies: "rgb(0, 59, 255)"
};

const NameLinkMap = {
  people: "People Analytics",
  travelandexpenses: "Travel & Expenses",
  travel: "Travel",
  expenses: "Expenses",
  hrselfservice: "HR Self-Service",
  leave: "Leave",
  payslips: "Payslips",
  recruitment: "Recruitment",
  benefits: "Benefits",
  policies: "Policies"
};

function addAllDataInfo(config) {
  const companyNameSpan = document.getElementsByClassName("company-name")[0];
  companyNameSpan.innerText = config.name;
  const companyLinks = document.querySelectorAll(".cursor");
  const companyLinkName = document.querySelectorAll(".company-link-name");
  const companyLinkImage = document.querySelectorAll(".company-link-image");
  const contactDetailsLinks = document.querySelectorAll(".media");
  const companyLogo = document.querySelector(".company-logo");
  companyLogo.src = "/images/" + config.name + ".png";
  if (config.contacts.length === 0) {
    document.querySelector("footer").style.display = "none";
  }
  contactDetailsLinks.forEach((contact, i) => {
    if (i >= config.contacts.length) {
      contact.parentElement.style.display = "none";
    } else {
      const contactDetails = config.contacts[i];
      console.log(contactDetails);
      const image = contact.querySelector(".media-object");
      image.src = "images/" + contactDetails.country + ".png";
      const name = contact.querySelector(".media-heading");
      name.innerText = contactDetails.name;
      const email = contact.querySelector("a");
      email.innerText = contactDetails.email;
      email.href = "mailto: " + contactDetails.email;
    }
  });

  Object.keys(config.links).forEach((name, i) => {
    console.log("name", name);
    console.log(config.links[name]);
    companyLinkName[i].innerText = NameLinkMap[name];
    companyLinkName[i].style.backgroundColor = NameColorHashmap[name];
    companyLinkImage[i].src = "/images/" + name + ".png";
    companyLinks[i].onclick = function() {
      window.open(config.links[name], "newwindow");
    };
  });
}
