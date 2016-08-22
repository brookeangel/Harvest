export const fetchHarvsts = (params = {}, success, error) => {
  $.ajax({
    url: '/api/harvsts',
    method: 'GET',
    data: params,
    dataType: 'json',
    success,
    error
  });
};

export const createHarvst = (harvst, success, error) => {
  $.ajax({
    url: '/api/harvsts',
    method: 'POST',
    data: {harvst: harvst},
    dataType: 'json',
    success,
    error
  });
};
