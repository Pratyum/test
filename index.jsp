<!DOCTYPE html>
<html>
  <head>
    <script>
      const hostname = window.location.hostname.split(".")[0];
      console.log("hostname", hostname);
      // console.log(apiUrl);
      // const apiUrl = "http://localhost:8080/";
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
        console.log({ ...resp });
        if (resp !== "error" && resp.isCustom) {
          console.log("HERE");
          window.location.replace("/" + resp.name + ".html");
        } else if (resp === "error" || resp.links.length === 0) {
          window.location.replace("/404.html");
        } else {
          console.log(resp.links.length);
          window.location.replace(
            "/" + Object.keys(resp.links).length + ".html"
          );
        }
      });
    </script>
  </head>
  <body></body>
</html>
