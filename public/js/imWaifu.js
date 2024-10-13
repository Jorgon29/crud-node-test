export async function fetchWaifu(tag){
    const baseUrl = 'https://api.waifu.im/search';
    try {
      let params = {
        included_tags: tag
      };
      let queryParams = new URLSearchParams();
      for (const key in params) {
        if (Array.isArray(params[key])) {
          params[key].forEach(value => {
          queryParams.append(key, value);
          });
        } else {
          queryParams.set(key, params[key]);
        }
      }
      axios({
        method: 'get',
        url: `${baseUrl}?${queryParams.toString()}`,
        responseType: 'stream'
      }).then(function (response) {
      })
    } catch (error) {
      console.log(error);
    }
  }

export default fetchWaifu;