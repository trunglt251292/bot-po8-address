import sanitizeHtml from 'sanitize-html';
import EthAddress from 'ethereum-address';

const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const stringSet = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';

module.exports = {
  standardize: (text) => {
    return text.replace(/\s+/g,' ').trim();
  },

  // eo biet dat ten tieng anh sao het @@
  xoa_dau: (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
  },

  removeSpecialCharacters: (str) => {
    return str.replace(/[^0-9a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]/gi, '');
  },

  isObjectId: (str) => {
    return str.match(/^[0-9a-fA-F]{24}$/);
  },
  buildSlug: (_this, title) => {
    try {
      title = _this.xoa_dau(title);
      title = title.replace(/[^a-zA-Z0-9\s]+/g, ' ');
      title = _this.standardize(title);
      let simpleSlug = title.split(' ').join('-').toLowerCase();
      simpleSlug = simpleSlug.replace(/\//g, '-');
      return simpleSlug;
    } catch (err) {
      console.log('err on build slug:', err);
    }
  },

  sanitizeHtml: (string) => {
    let sanitized = sanitizeHtml(string);
    return sanitized != 'undefined' ? sanitized : null;
  },

  randomString: (len) => {
    let setLen = stringSet.length,
      salt = '';
    for (let i = 0; i < len; i++) {
      let p = Math.floor(Math.random() * setLen);
      salt += stringSet[p];
    }
    return salt;
  },

  isValidETHAddress: (string) => {
    return EthAddress.isAddress(string);
  },

  isValidEmail: (email) => {
    return emailRegex.test(email);
  },
};
