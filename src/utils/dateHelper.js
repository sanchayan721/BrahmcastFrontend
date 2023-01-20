export const DATE_FORMAT = 'D MMMM, YYYY';

/* Minimum Age Requirement in Years */
const minAgeRequirement = 5;

/* Maximum Age Bar in Years */
const maximumAgeRequirement = 110; // years

export const minimumAgeBar = () => {
    let date = new Date();
    return date.setFullYear(date.getFullYear() - minAgeRequirement);
}

export const maximumAgeBar = () => {
    let date = new Date();
    return date.setFullYear(date.getFullYear() - maximumAgeRequirement);
}