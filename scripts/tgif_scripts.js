runFunctionsForPage()

function runFunctionsForPage() {
    if //attendance_house 
    (window.location.href.endsWith('attendance_house.html')) {

        document.getElementById("chamber-glance-house").innerHTML =
            tabulateChamberGlance(houseData);

        document.getElementById("most-engaged-house").innerHTML =
            tabulateMostEngaged(houseData);

        document.getElementById("least-engaged-house").innerHTML =
            tabulateLeastEngaged(houseData);
    } else if //attendance_senate.html
    (window.location.href.endsWith('attendance_senate.html')) {
        document.getElementById("chamber-glance-senate").innerHTML =
            tabulateChamberGlance(senateData);

        document.getElementById("most-engaged-senate").innerHTML =
            tabulateMostEngaged(senateData);

        document.getElementById("least-engaged-senate").innerHTML =
            tabulateLeastEngaged(senateData);
    } else if
    //loyalty_house.html
    (window.location.href.endsWith('loyalty_house.html')) {
        document.getElementById("chamber-glance-house").innerHTML =
            tabulateChamberGlance(houseData);

        document.getElementById("most-loyal-house").innerHTML =
            tabulateMostLoyal(houseData);

        document.getElementById("least-loyal-house").innerHTML =
            tabulateLeastLoyal(houseData);
    } else if
    //loyalty_senate.html
    (window.location.href.endsWith('loyalty_senate.html')) {
        document.getElementById("chamber-glance-senate").innerHTML =
            tabulateChamberGlance(senateData);

        document.getElementById("most-loyal-senate").innerHTML =
            tabulateMostLoyal(senateData);

        document.getElementById("least-loyal-senate").innerHTML =
            tabulateLeastLoyal(senateData);
    } else if
    //house_data.html
    (window.location.href.endsWith('house_data.html')) {
        document.getElementById("chamber-data-house").innerHTML =
            tabulateChamberData(houseData);
        tableFilter('chamber-data-house');
    } else if
    //senate_data.html
    (window.location.href.endsWith('senate_data.html')) {
        document.getElementById("chamber-data-senate").innerHTML =
            tabulateChamberData(senateData);
        tableFilter('chamber-data-senate');
    }
}

//checkboxes
function tableFilter(tableID) {
    let table = document.getElementById(tableID);
    let tRows = table.getElementsByTagName('tr');
    let rowParty;
    console.log(tRows);
    let demCheckbox = document.getElementById('democrat-checkbox');
    let repCheckbox = document.getElementById('republican-checkbox');
    let indCheckbox = document.getElementById('independent-checkbox');
    let checkboxes = [demCheckbox, repCheckbox, indCheckbox];
    let filterFor;
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            filterFor = [];
            if (demCheckbox.checked) {
                filterFor.push("D");
            }
            if (repCheckbox.checked) {
                filterFor.push("R");
            }
            if (indCheckbox.checked) {
                filterFor.push("I");
            }
            console.log(filterFor);

            if (demCheckbox.checked === false && repCheckbox.checked === false && indCheckbox.checked === false) {
                for (let i = 1; i < tRows.length; i++) {
                    tRows[i].style.display = "";
                }
            } else {

                for (let i = 1; i < tRows.length; i++) {
                    rowParty = tRows[i].getElementsByTagName("td")[1].getAttribute('value')
                    if (filterFor.includes(rowParty)) {
                        tRows[i].style.display = "";
                    } else {
                        tRows[i].style.display = "none";
                    }

                }
            }
        })
    })
}

//make at a glance tables
function tabulateChamberGlance(chamberData) {
    chamberStatistics = makeStatisticsObject(chamberData)
    chamberName = chamberData.results[0].chamber;
    if (chamberName === "House") {
        chamberName = "House of Representatives"
    }
    congressNumber = addOrdinalSuffix(chamberData.results[0].congress);

    chamberMembers = chamberData.results[0].members;


    let tableContents = 
        "<caption style='caption-side: top;'> The " + congressNumber + " " + chamberName + " at a Glance</caption>" +
        "<thead>" +
        "<tr>" +
        "<th>Party</th>" +
        "<th class='text-center'>Number of Members</th>" +
        "<th class='text-center'>Party Loyalty</th>" +
        "<tr>" +
        "</thead>" +
        "<tbody>" +

        "<tr>" +
        "<td>" + chamberStatistics.parties.demParty.name + "</td>" +
        "<td class='text-center'>" + chamberStatistics.parties.demParty.numOfMembers + "</td>" +
        "<td class='text-center'>" + Math.round(chamberStatistics.parties.demParty.partyLoyalty || 0) + "%</td>" +
        "</tr>" +

        "<tr>" +
        "<td>" + chamberStatistics.parties.repParty.name + "</td>" +
        "<td class='text-center'>" + chamberStatistics.parties.repParty.numOfMembers + "</td>" +
        "<td class='text-center'>" + Math.round(chamberStatistics.parties.repParty.partyLoyalty || 0) + "%</td>" +
        "</tr>" +

        "<tr>" +
        "<td>" + chamberStatistics.parties.indParty.name + "</td>" +
        "<td class='text-center'>" + chamberStatistics.parties.indParty.numOfMembers + "</td>" +
        "<td class='text-center'>" + Math.round(chamberStatistics.parties.indParty.partyLoyalty || 0) + "%</td>" +
        "</tr>" +

        "<tr>" +
        "<td>Total</td>" +
        "<td class='text-center'>" + chamberStatistics.totalMembers + "</td>" +
        "<td class='text-center'>" + Math.round(chamberStatistics.averageLoyalty) + "%</td>" +
        "</tr>" +

        "</tbody>";
    return tableContents;
}

//make loyalty tables
function tabulateMostLoyal(chamberData) {
    chamberStatistics = makeStatisticsObject(chamberData);
    let tableContents = "<caption style='caption-side: top;'> Most Loyal </caption>" +
        "<thead>" +
        "<tr>" +
        "<th>Name</th>" +
        "<th class='text-center'>Number of Party Votes</th>" +
        "<th class='text-center'>Party Loyalty</th>" +
        "<tr>" +
        "</thead>" +
        "<tbody>";
    for (let i = 0; i < chamberStatistics.mostLoyal.length; i++) {
        if (chamberStatistics.mostLoyal[i].middle_name === null) {
            fullName = chamberStatistics.mostLoyal[i].first_name + " " +
                chamberStatistics.mostLoyal[i].last_name; //for members with no middle name
        } else {
            fullName = chamberStatistics.mostLoyal[i].first_name + " " + chamberStatistics.mostLoyal[i].middle_name + " " +
                chamberStatistics.mostLoyal[i].last_name; //for members with a middle name
        }
        tableContents +=
            "<tr>" +
            "<td>" + fullName + "</td>" +
            "<td class='text-center'>" + Math.round(chamberStatistics.mostLoyal[i].total_votes * chamberStatistics.mostLoyal[i].votes_with_party_pct / 100) + "</td>" +
            "<td class='text-center'>" + chamberStatistics.mostLoyal[i].votes_with_party_pct + "%</td>" +
            "</tr>";
    }
    tableContents += "</tbody>";
    return tableContents;

}

function tabulateLeastLoyal(chamberData) {
    chamberStatistics = makeStatisticsObject(chamberData);
    let tableContents = "<caption style='caption-side: top;'> Least Loyal </caption>" +
        "<thead>" +
        "<tr>" +
        "<th>Name</th>" +
        "<th class='text-center'>Number of Party Votes</th>" +
        "<th class='text-center'>Party Loyalty</th>" +
        "<tr>" +
        "</thead>" +
        "<tbody>";
    for (let i = 0; i < chamberStatistics.leastLoyal.length; i++) {
        if (chamberStatistics.leastLoyal[i].middle_name === null) {
            fullName = chamberStatistics.leastLoyal[i].first_name + " " +
                chamberStatistics.leastLoyal[i].last_name; //for members with no middle name
        } else {
            fullName = chamberStatistics.leastLoyal[i].first_name + " " + chamberStatistics.leastLoyal[i].middle_name + " " +
                chamberStatistics.leastLoyal[i].last_name; //for members with a middle name
        }
        tableContents +=
            "<tr>" +
            "<td>" + fullName + "</td>" +
            "<td class='text-center'>" + Math.round(chamberStatistics.leastLoyal[i].total_votes * chamberStatistics.leastLoyal[i].votes_with_party_pct / 100) + "</td>" +
            "<td class='text-center'>" + chamberStatistics.leastLoyal[i].votes_with_party_pct + "%</td>" +
            "</tr>";
    }
    tableContents += "</tbody>";
    return tableContents;

}

//make attendance tables
function tabulateMostEngaged(chamberData) {
    chamberStatistics = makeStatisticsObject(chamberData);
    let tableContents = "<caption style='caption-side: top;'> Most Engaged </caption>" +
        "<thead>" +
        "<tr>" +
        "<th>Name</th>" +
        "<th class='text-center'>Number of Votes Missed</th>" +
        "<th class='text-center'>Percent of Votes Missed</th>" +
        "<tr>" +
        "</thead>" +
        "<tbody>";
    for (let i = 0; i < chamberStatistics.bestAttendance.length; i++) {
        if (chamberStatistics.bestAttendance[i].middle_name === null) {
            fullName = chamberStatistics.bestAttendance[i].first_name + " " +
                chamberStatistics.bestAttendance[i].last_name; //for members with no middle name
        } else {
            fullName = chamberStatistics.bestAttendance[i].first_name + " " + chamberStatistics.bestAttendance[i].middle_name + " " +
                chamberStatistics.bestAttendance[i].last_name; //for members with a middle name
        }
        tableContents +=
            "<tr>" +
            "<td>" + fullName + "</td>" +
            "<td class='text-center'>" + chamberStatistics.bestAttendance[i].missed_votes + "</td>" +
            "<td class='text-center'>" + chamberStatistics.bestAttendance[i].missed_votes_pct + "%</td>" +
            "</tr>";
    }
    tableContents += "</tbody>";
    return tableContents;

}

function tabulateLeastEngaged(chamberData) {
    chamberStatistics = makeStatisticsObject(chamberData);
    let tableContents = "<caption style='caption-side: top;'> Least Engaged </caption>" +
        "<thead>" +
        "<tr>" +
        "<th>Name</th>" +
        "<th class='text-center'>Number of Votes Missed</th>" +
        "<th class='text-center'>Percent of Votes Missed</th>" +
        "<tr>" +
        "</thead>" +
        "<tbody>";
    for (let i = 0; i < chamberStatistics.worstAttendance.length; i++) {
        if (chamberStatistics.worstAttendance[i].middle_name === null) {
            fullName = chamberStatistics.worstAttendance[i].first_name + " " +
                chamberStatistics.worstAttendance[i].last_name; //for members with no middle name
        } else {
            fullName = chamberStatistics.worstAttendance[i].first_name + " " + chamberStatistics.worstAttendance[i].middle_name + " " +
                chamberStatistics.worstAttendance[i].last_name; //for members with a middle name
        }
        tableContents +=
            "<tr>" +
            "<td>" + fullName + "</td>" +
            "<td class='text-center'>" + chamberStatistics.worstAttendance[i].missed_votes + "</td>" +
            "<td class='text-center'>" + chamberStatistics.worstAttendance[i].missed_votes_pct + "%</td>" +
            "</tr>";
    }
    tableContents += "</tbody>";
    return tableContents;
}

//this function will create the Statistics object and fill it with the relavent chamber data
function makeStatisticsObject(chamberData) {
    const statistics = {
        parties: {
            demParty: {
                name: 'Democrats',
                members: [],
                numOfMembers: 0,
                partyLoyalty: 0,
                partyAttendance: 0,
            },
            repParty: {
                name: 'Republicans',
                members: [],
                numOfMembers: 0,
                partyLoyalty: 0,
                partyAttendance: 0,
            },
            indParty: {
                name: 'Independents',
                members: [],
                numOfMembers: 0,
                partyLoyalty: 0,
                partyAttendance: 0,
            },
        },
        totalMembers: 0,

        bestAttendance: 0,

        worstAttendance: 0,

        averageAttendance: 0,

        mostLoyal: 0,

        leastLoyal: 0,

        averageLoyalty: 0,

    };

    chamberData.results[0].members.forEach(function (member) { // fill party members arrays
        if (member.party == "D") {
            statistics.parties.demParty.members.push(member);
        } else if (member.party == "R") {
            statistics.parties.repParty.members.push(member);
        } else if (member.party == "I") {
            statistics.parties.indParty.members.push(member);
        } else {
            console.log("Someone has no party!");
        }
    });

    // count total members
    statistics.totalMembers =
        statistics.parties.demParty.members.length +
        statistics.parties.repParty.members.length +
        statistics.parties.indParty.members.length

    statistics.parties.demParty.numOfMembers = statistics.parties.demParty.members.length; // calculate party lengths
    statistics.parties.repParty.numOfMembers = statistics.parties.repParty.members.length;
    statistics.parties.indParty.numOfMembers = statistics.parties.indParty.members.length;

    //calculate party loyalties
    //All
    for (let i = 0; i < chamberData.results[0].members.length; i++) {
        statistics.averageLoyalty += chamberData.results[0].members[i].votes_with_party_pct;
    }
    statistics.averageLoyalty /= chamberData.results[0].members.length;
    //Dems
    for (let i = 0; i < statistics.parties.demParty.members.length; i++) {
        statistics.parties.demParty.partyLoyalty += statistics.parties.demParty.members[i].votes_with_party_pct;
    }
    statistics.parties.demParty.partyLoyalty /= statistics.parties.demParty.members.length;

    //Reps
    for (let i = 0; i < statistics.parties.repParty.members.length; i++) {
        statistics.parties.repParty.partyLoyalty += statistics.parties.repParty.members[i].votes_with_party_pct;
    }
    statistics.parties.repParty.partyLoyalty /= statistics.parties.repParty.members.length;

    //Inds
    for (let i = 0; i < statistics.parties.indParty.members.length; i++) {
        statistics.parties.indParty.partyLoyalty += statistics.parties.indParty.members[i].votes_with_party_pct;
    }
    statistics.parties.indParty.partyLoyalty /= statistics.parties.indParty.members.length;




    //calculate party attendance 
    //All
    for (let i = 0; i < chamberData.results[0].members.length; i++) {
        statistics.averageAttendance += chamberData.results[0].members[i].missed_votes_pct;
    }
    statistics.averageAttendance /= chamberData.results[0].members.length;
    statistics.averageAttendance = 100 - statistics.averageAttendance;


    //DEMS

    for (let i = 0; i < statistics.parties.demParty.members.length; i++) {
        statistics.parties.demParty.partyAttendance += statistics.parties.demParty.members[i].missed_votes_pct;
    }
    statistics.parties.demParty.partyAttendance /= statistics.parties.demParty.members.length;
    statistics.parties.demParty.partyAttendance = 100 - statistics.parties.demParty.partyAttendance;

    //REPS

    for (let i = 0; i < statistics.parties.repParty.members.length; i++) {
        statistics.parties.repParty.partyAttendance += statistics.parties.repParty.members[i].missed_votes_pct;
    }
    statistics.parties.repParty.partyAttendance /= statistics.parties.repParty.members.length;
    statistics.parties.repParty.partyAttendance = 100 - statistics.parties.repParty.partyAttendance;

    //INDS

    for (let i = 0; i < statistics.parties.indParty.members.length; i++) {
        statistics.parties.indParty.partyAttendance += statistics.parties.indParty.members[i].missed_votes_pct;
    }
    statistics.parties.indParty.partyAttendance /= statistics.parties.indParty.members.length;
    statistics.parties.indParty.partyAttendance = 100 - statistics.parties.indParty.partyAttendance;



    //Overall Attendance & Loyalty
    //Best 10% (including all ties)
    function findTop10Pct(chamberMembers, statistic) {
        let statList = [];
        for (let i = 0; i < chamberMembers.length; i++) {
            statList.push(chamberMembers[i][statistic]);
        }
        statList.sort(function (a, b) {
            return a - b
        });
        let lowestTop = statList[statList.length - Math.round(statList.length / 10)]; //bottom of the top 10%
        let top10Pct = [];
        top10Pct = chamberMembers.filter(function (member) {
            return member[statistic] >= lowestTop
        });
        top10Pct.sort((a, b) => (a[statistic] < b[statistic]) ? 1 : -1);
        return top10Pct;

    }
    // worst 10%, (including all ties)
    function findBot10Pct(chamberMembers, statistic) {
        let statList = [];
        for (let i = 0; i < chamberMembers.length; i++) {
            statList.push(chamberMembers[i][statistic]);
        }
        statList.sort(function (a, b) {
            return a - b
        });
        let highestBot = statList[Math.round(statList.length / 10) - 1]; //top of the bottom 10%
        let bottom10Pct = [];
        bottom10Pct = chamberMembers.filter(function (member) {
            return member[statistic] <= highestBot
        });
        bottom10Pct.sort((a, b) => (a[statistic] > b[statistic]) ? 1 : -1);
        return bottom10Pct;

    }
    //fill best/worst 10% stats
    statistics.bestAttendance = findBot10Pct(chamberData.results[0].members, 'missed_votes_pct');
    statistics.worstAttendance = findTop10Pct(chamberData.results[0].members, 'missed_votes_pct');
    statistics.leastLoyal = findBot10Pct(chamberData.results[0].members, 'votes_with_party_pct');
    statistics.mostLoyal = findTop10Pct(chamberData.results[0].members, 'votes_with_party_pct');
    return statistics;
}

//function for adding Ordinal Suffixes (1st 2nd 3rd etc)
function addOrdinalSuffix(num) {
    num += "";
    let numEnd = "";
    if (num.length == 1) {
        numEnd += num[num.length - 1];
    } else {
        numEnd += num[num.length - 2] + num[num.length - 1];
    }
    if ((numEnd == "1") || (numEnd == "21") || (numEnd == "31") || (numEnd == "41") || (numEnd == "51") || (numEnd == "61") || (numEnd == "71") || (numEnd == "81") || (numEnd == "91") || (numEnd == "01")) {
        num += "st";
    } else if ((numEnd == "2") || (numEnd == "22") || (numEnd == "32") || (numEnd == "42") || (numEnd == "52") || (numEnd == "62") || (numEnd == "72") || (numEnd == "82") || (numEnd == "92") || (numEnd == "02")) {
        num += "nd";
    } else if ((numEnd == "3") || (numEnd == "23") || (numEnd == "33") || (numEnd == "43") || (numEnd == "53") || (numEnd == "63") || (numEnd == "73") || (numEnd == "83") || (numEnd == "93") || (numEnd == "03")) {
        num += "rd";
    } else num += "th";
    return num;
}

//function to tabulate a Chamber of Congress
function tabulateChamberData(chamberData) {
    let fullName;
    chamberName = chamberData.results[0].chamber;
    if (chamberName === "House") {
        chamberName = "House of Representatives";
    }
    congressNumber = addOrdinalSuffix(chamberData.results[0].congress);

    chamberMembers = chamberData.results[0].members; //dig down to get members

    let tableContents = "<caption style='caption-side: top;'>" + congressNumber + " " + chamberName + " of the United States of America</caption>" +
        "<thead>" +
        "<tr>" +
        "<th>Name</th>" +
        "<th class='text-center'>Party</th>" +
        "<th class='text-center'>State</th>" +
        "<th class='text-center'>Years In Office</th>" +
        "<th class='text-center'>Votes With Party</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>"

    for (let i = 0; i < chamberMembers.length; i++) {
        if (chamberMembers[i].middle_name === null) {
            fullName = chamberMembers[i].first_name + " " +
                chamberMembers[i].last_name; //for members with no middle name
        } else {
            fullName = chamberMembers[i].first_name + " " + chamberMembers[i].middle_name + " " +
                chamberMembers[i].last_name; //for members with a middle name
        }
        tableContents +=
            "<tr>" +
            "<td> <a href='" + chamberMembers[i].url + "'>" + fullName + "</a></td>" +
            "<td class='text-center' value=" + chamberMembers[i].party + ">" + chamberMembers[i].party + "</td>" +
            "<td class='text-center'>" + chamberMembers[i].state + "</td>" +
            "<td class='text-center'>" + chamberMembers[i].seniority + "</td>" +
            "<td class='text-center'>" + chamberMembers[i].votes_with_party_pct + "%</td>" +
            "</tr>"
    }
    tableContents += "</tbody>"
    return tableContents
}