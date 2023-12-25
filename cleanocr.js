function isLetter(s) {
    return s.length === 1 && s.match(/[a-zA-Z\s]+/);
}

export const cleanData = (str) => {
    const dataMap = {};

    const nameSubstring = "Name";
    const lastNameSubstring = "Last";

    const nameStartIndex = str.search(nameSubstring);
    const lastNameEndIndex = str.search(lastNameSubstring);

    const firstName = str.substring(nameStartIndex + 5, lastNameEndIndex);
    dataMap["firstName"] = firstName;

    let lastName = "";
    const lastNameSearch = "Last name ";
    const lastNameIndex = str.search(lastNameSearch);
    for (let i = lastNameIndex + 10; i < str.length && isLetter(str[i]); i++) {
        lastName += str[i];
    }
    dataMap["lastName"] = lastName;

    const dobPattern = /\b\d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(\.|) \d{4}\b/g;
    const matchedDates = str.match(dobPattern);
    dataMap["dob"] = matchedDates[0];
    dataMap["doi"] = matchedDates[2];
    dataMap["doe"] = matchedDates[1];

    const idPattern = /\d \d{4} \d{5} \d{2}/;
    const matchedNumber = str.match(idPattern);
    dataMap['identificationNumber'] = matchedNumber[0];

    const jsonOcr = {
        identificationNumber: matchedNumber[0],
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: matchedDates[0],
        dateOfIssue: matchedDates[1],
        dateOfExpiry: matchedDates[2],
    };

    console.log(jsonOcr);
    return jsonOcr;
}

// Example Usage:
// const str = "Thai National ID Card 1 1037 02071 81 1 Identification Number Name Miss Nattarika Last name Yangsuai 25 2539 Date of Birth 25 Jun. 1996 111/17 2 24 2553 - 24 Jul. 2020 Date of Issue from 24 9.8. 2572 24 Jun. 2023 2 Date of Expiry 160 15 _160 150 40 1398-09-07241719";
// cleanData(str);
