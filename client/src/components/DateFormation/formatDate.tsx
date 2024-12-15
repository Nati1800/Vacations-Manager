

  export function formatDate(date: string){
    const parsedDate = new Date(date); 
    const day = parsedDate.getDate();
    const month = parsedDate.getMonth() + 1; 
    const year = parsedDate.getFullYear();

    return `${day}.${month}.${year}`;
  }

  export function formatDateForInput(date: string): string {
    const parsedDate = new Date(date); 
    const year = parsedDate.getFullYear();
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0'); 
    const day = parsedDate.getDate().toString().padStart(2, '0'); 
  
    return `${year}-${month}-${day}`; 
  }
  