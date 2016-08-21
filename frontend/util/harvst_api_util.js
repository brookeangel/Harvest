export const fetchHarvsts = (params, success, error) => {
  $.ajax({
    url: '/api/harvsts',
    method: 'GET',
    data: params,
    dataType: 'json',
    success,
    error
  });
};
