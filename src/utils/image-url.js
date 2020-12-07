import config from '../../config';
const NODE_ENV=process.env.NODE_ENV;

function imageUrl (image) {
  if (NODE_ENV === 'development') {
    return config.dev.publicPath + 'static/static-images/' + image;
  } else {
    return config.build.publicPath + 'static/static-images/' + image;
  }
}

export default imageUrl;
