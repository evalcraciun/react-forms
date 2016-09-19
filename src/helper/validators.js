export const v_required = (value) => {
  if ((value==null) || (value.length==0)) {
    return {
      text: "Field is required.",
      key: "required"
    }
  }
  return false
}

export const v_minlength = (len) => {
  return (value) => {
    if ((value==null) || (value.length<len)) {
      return {
        text: "Field should be at least " + len + " characters long.",
        key: "minlength",
        values: {
          minlength: len
        }
      }
    }
    return false
  }
}

export const v_maxlength = (len) => {
  return (value) => {
    if ((value==null) || (value.length>len)) {
      return {
        key: "maxlength",
        values: {
          maxlength: len
        }
      }
    }
    return false
  }
}

export const v_noWhitespace = (value) => {
  const re = /^\s+$/i;
  if (re.test(value)) {
    return {
      text: "only whitespace is not allowed",
      key: "whitespace"
    }
  }
  return false

}


export const v_noWrappingWhitespace = (value) => {
  const re = /^(\s+.*|\s+|.*\s+)$/i;
  if (re.test(value)) {
    return {
      text: "start or ending whitespace",
      key: "wrappingWhitespace"
    }
  }
  return false

}

export const v_isNumeric = (value) => {
  const re = /^\d*$/i;
  if (!re.test(value)) {
    return {
      key: "numeric"
    }
  }
  return false
}

export const v_isEmail = (value) => {
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!re.test(value)) {
    return {
      text: "Not a valid email address!",
      key: "email"
    }
  }
  return false
}

export const v_phone = (value) => {
  const re = /^\+\d*$/i;
  if ((value!=null) && (value.length>0) && (!re.test(value))) {
    return {
      text: "Not a valid number (e.g. +491577123456 )",
      key: "phone"
    }
  }
  return false
}

export const v_password = (value) => {
  return false
}
