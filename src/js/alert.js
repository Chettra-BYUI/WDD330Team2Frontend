import { getData } from "./productData.mjs";

export default class Alert {
  // async getData() {
  //   try {
  //     const response = await fetch("../json/alert.json");
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     throw new Error("Couldn't fetch alert data");
  //   }
  // }

  generateAlerts(alertData) {
    const sectionElement = document.createElement("section");
    sectionElement.classList.add("alert-list");

    const alertParagrpahList = alertData.map(
      ({ message, background, color }) => {
        const paragraphHtmlString = `<p style="color: ${color}; background-color: ${background};">${message}</p>`;

        return paragraphHtmlString;
      }
    );

    sectionElement.insertAdjacentHTML(
      "afterbegin",
      alertParagrpahList.join("")
    );
    return sectionElement;
  }

  async renderAlert() {
    const alertData = await getData("alerts");

    if (alertData) {
      const alertSection = this.generateAlerts(alertData);
      document.querySelector("main").prepend(alertSection);
    }
  }
}
