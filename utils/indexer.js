const fetch = require("node-fetch");

const indexer = async (url, accessToken) => {
  const body = {
    url: url,
    type: "URL_UPDATED",
  };
  try {
    const response = await fetch(
      "https://indexing.googleapis.com/v3/urlNotifications:publish",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      },
    );
    const data = await response.json();
    if (data?.error?.status == "RESOURCE_EXHAUSTED") {
      return data?.error?.status;
    }
    if (data?.error) {
      return "HAS_ERROR";
    }
    console.log(data);
    console.log("Link Updated");
    console.log("-----------------------");
  } catch (err) {
    console.log(err);
    console.log("Error");
    console.log("-----------------------");
  }
};

module.exports = indexer;
