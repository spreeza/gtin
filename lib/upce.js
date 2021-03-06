'use strict'

const common = require('./common')

exports.expand = function (barcode) {
  if (typeof barcode !== 'string') throw new Error(common.NONSTRING_ERR)
  if (!/^\d{6,8}$/.test(barcode)) throw new Error(common.FORMAT_ERR)
  return setCheckDigit(
    setNumberSystem(
      expandBarcode(
        barcode
      )
    )
  )
}

function expandBarcode (barcode) {
  var digits = barcode.split('')
  var numberSystem = (digits.length > 7) ? digits.shift() : ''
  var checkDigit = (digits.length > 6) ? digits.pop() : ''
  var lastDigit = +digits.pop()
  var expanded

  switch (lastDigit) {
    case 0:
    case 1:
    case 2:
      expanded = digits.slice(0, 2).join('') + lastDigit + '0000' + digits.slice(2, 5).join('')
      break
    case 3:
    case 4:
      expanded = digits.slice(0, lastDigit).join('') + '00000' + digits.slice(lastDigit, 5).join('')
      break
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      expanded = digits.join('') + '0000' + lastDigit
      break
  }

  return numberSystem + expanded + checkDigit
}

exports.compress = function (barcode) {
  if (typeof barcode !== 'string') throw new Error(common.NONSTRING_ERR)
  if (!/^\d{10,12}$/.test(barcode)) throw new Error(common.FORMAT_ERR)
  return compressBarcode(
    setCheckDigit(
      setNumberSystem(
        barcode
      )
    )
  )
}

function compressBarcode (barcode) {
  var v1 = /^(\d{3})([0-2])0{4}(\d{3})(\d{1})$/
  var v2 = /^(\d{3})([3-9])0{5}(\d{2})(\d{1})$/
  var v3 = /^(\d{5})0{5}(\d{1})(\d{1})$/
  var v4 = /^(\d{6})0{4}(\d{2})$/
  var rgx

  rgx = v1.exec(barcode)
  if (rgx) {
    return rgx[1] + rgx[3] + rgx[2] + rgx[4]
  }

  rgx = v2.exec(barcode)
  if (rgx) {
    return rgx[1] + rgx[2] + rgx[3] + '3' + rgx[4]
  }

  rgx = v3.exec(barcode)
  if (rgx) {
    return rgx[1] + rgx[2] + '4' + rgx[3]
  }

  rgx = v4.exec(barcode)
  if (rgx) {
    return rgx[1] + rgx[2]
  }

  return null
}

function setCheckDigit (barcode) {
  return (
    (barcode.length !== 12 && barcode.length !== 8)
    ? barcode + common.generateCheckDigit(barcode)
    : barcode
  )
}

function setNumberSystem (barcode) {
  return (
    (barcode.length !== 12 && barcode.length !== 8)
    ? '0' + barcode
    : barcode
  )
}
