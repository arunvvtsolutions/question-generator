import { CCAvenueConstants } from '@/service/enums/texts';
import forge from 'node-forge';


let initOptions: any = {};

class Configure {
  constructor(options: any) {
    initOptions = options || {};
  }

  validate(key: any) {
    return initOptions && initOptions[key] ? true : false;
  }

  throwError(requirement: any) {
    throw new Error(`${requirement} is required to perform this action`);
  }

  async encrypt(plainText: string) {
    if (this.validate(CCAvenueConstants.WORKING_KEY) && plainText) {
      const { working_key } = initOptions;
      const m = forge.md.md5.create();
      m.update(forge.util.encodeUtf8(working_key));
      const key = m.digest().toHex();
      const iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
      const cipher = forge.cipher.createCipher('AES-CBC', forge.util.hexToBytes(key));
      cipher.start({ iv });
      cipher.update(forge.util.createBuffer(plainText, 'utf8'));
      cipher.finish();

      return cipher.output.toHex();
    } else this.throwError('Plain text or working key is not available');
  }

  decrypt(encText: any) {
    if (this.validate(CCAvenueConstants.WORKING_KEY) && encText) {
      const { working_key } = initOptions;
      const m = forge.md.md5.create();
      m.update(forge.util.encodeUtf8(working_key));
      const key = m.digest().toHex();
      const iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
      const decipher = forge.cipher.createDecipher('AES-CBC', forge.util.hexToBytes(key));
      decipher.start({ iv });
      decipher.update(forge.util.createBuffer(forge.util.hexToBytes(encText)));
      decipher.finish();
      return decipher.output.data;
    } else if (!encText) {
      this.throwError(CCAvenueConstants.ENCRYPTED_TEXT);
      return false;
    } else {
      this.throwError(CCAvenueConstants.WORKING_KEY_TXT);
      return false;
    }
  }

  redirectResponseToJson(response: any) {
    if (response) {
      const ccavResponse: any = this.decrypt(response);
      const responseArray = ccavResponse.split('&');
      const stringify = JSON.stringify(responseArray);
      const removeQ = stringify.replace(/['"]+/g, '');
      const removeS = removeQ.replace(/[[\]]/g, '');
      return removeS.split(',').reduce((o: any, pair: any) => {
        pair = pair.split('=');
        return (o[pair[0]] = pair[1]), o;
      }, {});
    } else {
      this.throwError('CCAvenue encrypted response');
    }
  }

  getEncryptedOrder(orderParams: any) {
    if (this.validate(CCAvenueConstants.MERCHANT_ID) && orderParams) {
      let data = `merchant_id=${initOptions.merchant_id}`;
      data += Object.entries(orderParams)
        .map(([key, value]) => `&${key}=${value}`)
        .join('');
      return this.encrypt(data);
    } else if (!orderParams) {
      this.throwError('Order Params');
    } else {
      this.throwError('Merchant ID');
    }
  }
}

const CCAvenue = new Configure({
  working_key: process.env.NEXT_PUBLIC_CCAVENUE_WORKING_KEY,
  merchant_id: process.env.NEXT_PUBLIC_CCAVENUE_MERCHANT_ID
});

export default CCAvenue;
