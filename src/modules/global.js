export const hash = (range) => {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let hash = "";
    let count = 0;
    while(count < range) {
        hash += letters.charAt(Math.floor(Math.random() * letters.length))
        count++;
    }
    return hash;
}