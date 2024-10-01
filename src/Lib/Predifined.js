export function formatDate(dateString) {
    const parsedDate = new Date(dateString);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const setDate = parsedDate.toLocaleDateString('en-GB', options);
    console.log(setDate) 
    return setDate
}

export function formatFormikDate(dateString) {
    const date = new Date(dateString);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

export function oneMonthBefore(){
    const oneMonthBefore = new Date();
  oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1); // Subtract 1 month

  const yearBefore = oneMonthBefore.getFullYear();
  const monthBefore = String(oneMonthBefore.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are 0-indexed
  const dayBefore = String(oneMonthBefore.getDate()).padStart(2, '0');

  const oneMonthBeforeFormatted = `${yearBefore}-${monthBefore}-${dayBefore}`;

  return  oneMonthBeforeFormatted 
}

export function todayDate() {
    const today = new Date();
    
    const yearToday = today.getFullYear();
    const monthToday = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are 0-indexed
    const dayToday = String(today.getDate()).padStart(2, '0');
  
    const todayFormatted = `${yearToday}-${monthToday}-${dayToday}`;
  
    return todayFormatted;
  }
  