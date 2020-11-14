import { createLogger } from 'redux-logger';

const configurationLogger = {
  duration: true,
  timestamp: true
};
export const logger = createLogger(configurationLogger);

export const isNull = ( value ) => {
  return value === null;
}

export const isUndef = ( value ) => {
  return value === undefined;
}

export const isVoidStr = ( value ) => {
  if( typeof(value) === 'string' ){
    return value.trim() === '';
  }
  return false;
}

export const isNullOrUndef = (value) => {
  return isNull(value) || isUndef(value);
}

export const iSNullOrUndefOrVoidStr = (value) => {
  return isNull(value) || isUndef(value) || isVoidStr(value);
}

export const isArray = (value) => {
  if(!isNullOrUndef(value)){
    return Array.isArray(value);
  }
  return false;
}

export const isArrayNotEmpty = (value) => {
  return isArray(value) && value.length > 0;
}