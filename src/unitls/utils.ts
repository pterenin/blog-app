export const getFormatedDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = String(today.getMonth() + 1); // Months start at 0!
    let dd = String(today.getDate());
    if (Number(dd) < 10) dd = '0' + dd;
    if (Number(mm) < 10) mm = '0' + mm;
    return dd + '/' + mm + '/' + yyyy;
}