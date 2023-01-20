export const obscureEmail = (email, _splitLength) => {
    const [name, domain] = email.split('@');
    let splitLength = _splitLength || 2;
    return `${name.slice(0, splitLength)}${new Array(name.length - splitLength - 1).join('*')}@${domain}`;
};

export const obscurePhone = (
    extension,
    phoneNumber,
    _splitLength
) => {
    let number = String(phoneNumber);
    let splitLength = _splitLength || 6;

    return `${extension} ${new Array(splitLength).join('*')}${number.slice(splitLength - 1, number.length)}`
};