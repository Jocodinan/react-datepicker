export function getMonthString(date, lang){
  let months = [];

  if(lang == 'es'){
    months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  }else if(lang == 'en'){
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  }

  return months[date.getMonth()];
}

export function getDays(lang){
  let days = [];

  if(lang == 'es'){
    days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
  }else if(lang == 'en'){
    days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  }

  return days;
}