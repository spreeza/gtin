gtin
===

GTIN (UPC, EAN, ITF, etc.) utilities.

`npm install gtin`

---

`gtin.upce.compress(barcode)`
---

Compress a UPC-A barcode to an 8-digit UPC-E barcode. Does not validate
code by check digit. Barcode must be a string.

* 12-digit UPC-A: Number system and check digits are taken into account.
* 11-digit UPC-A: Number system 0 is assumed. Check digit is taken into account.
* 10-digit UPC-A: Number system 0 is assumed. Check digit is generated.

```js
import {upce} from 'gtin'
upce.compress('1200000789')   // '01278907'
upce.compress('12000007897')  // '01278907'
upce.compress('012000007897') // '01278907'
upce.compress('012000007896') // '01278906'
upce.compress('012345678905') // null
upce.compress(123)            // Error thrown
upce.compress('123')          // Error thrown
upce.compress('abc')          // Error thrown
```

`gtin.upce.expand(barcode)`
---

Expands a UPC-E barcode to a 12-digit UPC-A barcode. Does not validate
code by check digit. Barcode must be a string.

* 8-digit UPC-E: Number system and check digits are taken into account.
* 7-digit UPC-E: Number system 0 is assumed. Check digit is taken into account.
* 6-digit UPC-E: Number system 0 is assumed. Check digit is generated.

```js
import {upce} from 'gtin'
upce.expand('127890')    // '012000007897'
upce.expand('1278907')   // '012000007897'
upce.expand('01278907')  // '012000007897'
upce.expand('01278906')  // '012000007896'
upce.expand('123412341') // Error thrown
upce.expand(123)         // Error thrown
upce.expand('123')       // Error thrown
upce.expand('abc')       // Error thrown
```