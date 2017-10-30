class Base64Fetch {
  constructor(url) {
    this.url = url;
  }
  fetch(url = '') {
    let _url = this.url || url;
    return this._fetch(_url, false);
  }
  fetchAsData(url = '') {
    let _url = this.url || url;
    return this._fetch(_url, true);
  }
  _fetch(url, keepAsData = true) {
    if (!url) {
      throw new Error('no url is provided');
    }
    return new Promise((resolve, reject) => {
      // console.log('thisurl', this.url)
      fetch(url, { mode: 'no-cors' }).then(function(response) {
          if (response.ok) {
            return response.blob();
          }
          throw new Error('bad response');
        }).then(function(myBlob) {

          var reader = new window.FileReader();
          reader.readAsDataURL(myBlob);
          reader.onloadend = function() {
            var base64data = reader.result;

            if (!keepAsData) {
              let trim = base64data.split(',', 2);
              if (trim && trim[1]) {
                resolve(trim[1]);
              }
            } else {
              resolve(base64data);
            }
          }

        }).catch(reject);
    });
  }
}

