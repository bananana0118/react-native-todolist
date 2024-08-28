export const getFormattedDate = (date: Date) => {

    const year = date.getFullYear(); // 년도를 가져옵니다.
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월을 가져오며, 0부터 시작하므로 +1을 합니다. 두 자리로 맞추기 위해 padStart 사용.
    const day = String(date.getDate()).padStart(2, "0"); // 일을 가져옵니다. 두 자리로 맞추기 위해 padStart 사용.

    return `${year}-${month}-${day}`; // yyyy-mm-dd 형식으로 반환합니다.
};
