import * as $ from "jquery";
import {
  createAccount,
  showUser,
  signUserOut,
  signUserIn,
  addCampgroundToDB,
  showAllCamps,
} from "./model";

function initListeners() {
  getInfo();

  $("#submit").on("click", () => {
    let fn = $("#fName").val();
    let ln = $("#lName").val();
    let email = $("#email").val();
    let pw = $("#password").val();

    createAccount(email, pw, fn, ln);
  });

  $("#signout").on("click", (e) => {
    signUserOut();
  });

  $("#signInBtn").on("click", (e) => {
    let email = $("#sEmail").val();
    let pw = $("#sPassword").val();
    signUserIn(email, pw);
  });
}

export function getInfo() {
  var albumURL = [
    "https://musicbrainz.org/ws/2/release-group/299a1b9f-7cdd-46da-a5ea-77571ce04009?inc=aliases%2Bartist-credits%2Breleases&fmt=json",
    "https://musicbrainz.org/ws/2/release-group/1b022e01-4da6-387b-8658-8678046e4cef?inc=aliases%2Bartist-credits%2Breleases&fmt=json",
    "https://musicbrainz.org/ws/2/release/9651aac2-4296-381f-a595-f11e3242c997?inc=aliases%2Bartist-credits%2Blabels%2Bdiscids%2Brecordings&fmt=json",
    "https://musicbrainz.org/ws/2/release-group/aa997ea0-2936-40bd-884d-3af8a0e064dc?inc=aliases%2Bartist-credits%2Breleases&fmt=json",
  ];

  $.each(albumURL, function (index, val) {
    // console.log(index, val)

    $.getJSON(albumURL[index], (data) => {
      // console.log(data);
      // console.log(`${data['artist-credit']['name']}`);

      $(".row").append(`
            <div class="album">
                <div class="cover">
                    <img src="${data.title}" width="250px" height="100%">
                </div>
                <div class="album-info">
                    <div class="title">
                        <p>${data.title}</p>
                        <p class="orange">/10</p>
                    </div>
                    <div class="artist">
                        <p>Artist</p>
                    </div>
                    <div class="title">
                        <p>Genre</p>
                        <p class="orange">${data["first-release-date"]}</p>
                    </div>
                </div>
            </div>
        `);
    }).fail((error) => {
      console.log("error", error.message);
    });
  });
}

$(document).ready(function () {
  initListeners();
});
