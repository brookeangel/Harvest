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

export const toggleStar = (harvst, success) => {
  let url, method;
  if (harvst.star_id) {
    url = `/api/stars/${harvst.star_id}`;
    method = 'DELETE';
  } else {
    url = '/api/stars';
    method = 'POST';
  }

  $.ajax({
    url: url,
    method,
    data: {star: {harvst_id: harvst.id}},
    dataType: 'json',
    success,
    error: e => console.log(e)
  });
};
