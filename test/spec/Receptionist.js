/*

   Copyright 2016 SAP Mentors

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

*/

var TicketCodeURL = "/com/sap/sapmentors/sitreg/odatareceptionist/checkTicket.xsjs";

describe("Login RECEPTIONIST", function() {
    it("should login RECEPTIONIST and get csrfToken", function() {
        csrfToken = getCSRFtokenAndLogin("RECEPTIONIST", password);
    });
});

describe("Check provided ticket using HTTP POST", function() {
    it("should return the Event and Participant ID", function() {
        var check = {
            "SHA256HASH": SHA256HASH
        };
        var xhr = prepareRequest("POST", TicketCodeURL);
        xhr.send(JSON.stringify(check));
        expect(xhr.status).toBe(200);
        var body = xhr.responseText ? JSON.parse(xhr.responseText) : "";
        expect(body.OUTC[0].EventID).not.toBe(null);
    });
});

describe("Check provided ticket using HTTP GET", function() {
    it("should return the Event and Participant ID", function() {
        TicketCodeURL = TicketCodeURL + "?SHA256HASH=" + encodeURIComponent(SHA256HASH);
        var xhr = prepareRequest("GET", TicketCodeURL);
        xhr.send();
        expect(xhr.status).toBe(200);
        var body = xhr.responseText ? JSON.parse(xhr.responseText) : "";
        expect(body.OUTC[0].EventID).not.toBe(null);
    });
});

describe("Logout RECEPTIONIST", function() {
    it("should logout RECEPTIONIST", function() {
        logout(csrfToken);
        checkSession();
    });
});