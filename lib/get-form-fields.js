// 'use strict'
//
// const addNestedValue = require('./add-nested-value')
//
// const getFormFields = (form) => {
//   const target = {}
//
//   const elements = form.elements || []
//   for (let i = 0; i < elements.length; i++) {
//     const e = elements[i]
//     if (!e.hasAttribute('name')) {
//       continue
//     }
//
//     let type = 'TEXT'
//     switch (e.nodeName.toUpperCase()) {
//       case 'SELECT':
//         type = e.hasAttribute('multiple') ? 'MULTIPLE' : type
//         break
//       case 'INPUT':
//         type = e.getAttribute('type').toUpperCase()
//         break
//     }
//
//     const name = e.getAttribute('name')
//
//     if (type === 'MULTIPLE') {
//       for (let i = 0; i < e.length; i++) {
//         if (e[i].selected) {
//           addNestedValue(target, name, e[i].value)
//         }
//       }
//     } else if ((type !== 'RADIO' && type !== 'CHECKBOX') || e.checked) {
//       addNestedValue(target, name, e.value)
//     }
//   }
//
//   return target
// }
//
// module.exports = getFormFields

'use strict'

const addFormField = function addFormField (target, names, value) {
  const name = names.shift()
  const next = names[0]
  if (next === '') { // name is an array
    target[name] = target[name] || []
    target[name].push(value)
  } else if (next) { // name is a parent key
    target[name] = target[name] || {}
    addFormField(target[name], names, value)
  } else { // name is the key for value
    target[name] = value
  }

  return target
}

const getFormFields = (form) => {
  const target = {}

  const elements = form.elements || []
  for (let i = 0; i < elements.length; i++) {
    const e = elements[i]
    if (!e.hasAttribute('name')) {
      continue
    }

    let type = 'TEXT'
    switch (e.nodeName.toUpperCase()) {
      case 'SELECT':
        type = e.hasAttribute('multiple') ? 'MULTIPLE' : type
        break
      case 'INPUT':
        type = e.getAttribute('type').toUpperCase()
        break
    }

    const names = e.getAttribute('name').split('[')
      .map((k) => k.replace(/]$/, ''))

    if (type === 'MULTIPLE') {
      for (let i = 0; i < e.length; i++) {
        if (e[i].selected) {
          addFormField(target, names.slice(), e[i].value)
        }
      }
    } else if ((type !== 'RADIO' && type !== 'CHECKBOX') || e.checked) {
      addFormField(target, names, e.value)
    }
  }

  return target
}

module.exports = getFormFields
