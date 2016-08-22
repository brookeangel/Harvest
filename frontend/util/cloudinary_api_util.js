import request from 'superagent';

export const uploadImage = (img, success) => {
  let upload = request.post("https://api.cloudinary.com/v1_1/harvst/image/upload")
                      .field('upload_preset', 'bmx9ikkh')
                      .field('file', img);

  upload.end((err, response) => {
    if (err) {
      console.error(err);
    }

    if (response.body.secure_url !== '') {
      success(response.body.secure_url);
    }
  });
};
