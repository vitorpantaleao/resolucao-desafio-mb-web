export function onInputPhone(phone) {
    phone = phone.replace(/[^0-9]/g, '')
  
    if (phone.length === 10) {
        phone = phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    } else if (phone.length === 11) {
        phone = phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
  
    return phone
}

export function onInputDoc(doc, type) {
    doc = doc.replace(/[^0-9.]/g, '')
  
    if (type === 'fisica') {
        doc = doc.replace(/\./g, '').substr(0, 11)
        doc = doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
    } else {
        doc = doc.replace(/\./g, '').substr(0, 14)
        doc = doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
    }
  
    return doc
}
  