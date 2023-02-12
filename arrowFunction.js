const calcAge = birthyear => 2037 - birthyear;
const age = calcAge(1991);
console.log(age);

const yearsUntilRetirement = (birthyear, fname) => {
    const age = 2037 - birthyear;
    const retire = 65 - age;
    return `${fname} retires in ${retire} years`;
}
const age2 = yearsUntilRetirement(1991, "aditya");
console.log(age2);