// function deepClone(obj) {
//   let result;
//   if((typeof obj !== 'object' && typeof obj !== 'function') || obj === null) {
//     return obj;
//   }
//   // if(set.has(obj)) {
//   //   return obj;
//   // }
//   // set.add(obj);
//   if(Array.isArray(obj)) {
//     result = obj.map(value => deepClone(value));
//   } else if(typeof obj === 'object') {
//     result = Object.create(obj);
//     for(let temp in obj) {
//       result[temp] = deepClone(obj[temp]);
//     }
//   } else if(typeof obj === 'function'){
//     result = new Function();
//     result.const
//   }
//   return result;
// }

// function baseClone(obj) {
//   if(typeof obj === 'boolean' || typeof obj === 'number' || typeof obj === 'string' || !obj) {
//     return obj;
//   }
//   let result;
//   if(Array.isArray(obj)) {
//     result = obj.map(item => baseClone(item));
//   }  else{
//     result =  Object.create(obj._proto_) ;
//     for(let property of Object.keys(obj)) {
//       if(obj.hasOwnProperty(property)) {
//         result[property] = baseClone(obj[property]);
//       }
//     }
//     for(let key of Object.getOwnPropertySymbols(obj)) {
//       result[key] = obj[key];
//     }
//   }
//   return result;
// }






const funcTag = '[object Function]';
const arrTag = '[object Array]';
const regTag = '[object RegExp]';
const mapTag = '[object Map]';

function clone(obj, stack) {
  let result ;
  if(!isObject(obj)) {
    return obj;
  }
  let tag = getTag(obj);
  if(tag === arrTag) {
    result = obj.map(item => clone(item));
  } else {
    switch(tag) {
      case regTag: result = cloneRegExp(obj); break;
      default: let propotype = Object.getPrototypeOf(obj);
      result = propotype ? Object.create(propotype) : {};
    }
  }
  let keys = Object.keys(obj);
  for (const key of keys) {
    if (Object.hasOwnProperty.call(obj, key)) {
      // if(Object.hasOwnProperty.call(result, key) && result[key] === obj[key]) {
      //   continue;
      // }
      result[key] = clone(obj[key]);
    }
  }
  return result;
}
function getTag(object) {
  let tag = Object.prototype.toString.call(object);
  return tag;
}
function cloneRegExp(regexp) {
  const reFlags =  /\w*$/;
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
function isObject(object) {
  let type = typeof object ;
  return (type === 'object' || type === 'function') && !!object ;
}
let a = {arr: [1,2,3], obj: { copy: 'yes'}, r: /23/};
let b = clone(a);
console.log('----',  b.r.test('23'), JSON.stringify(a));


let mapTag = '[Object Map]';
let setTag = '[Object Set]';
function deepClone(value) {
  if(!isObject(value)) {
    return value;
  }
  let result;
  let tag = getTag(value);
  if(Array.isArray(value)) {
    result = Array(value.length);
    for (let index = 0; index < value.length; index++) {
      result[index] = value[index];
    }
  } else {
    switch(tag) {
      case mapTag: result = new Map();
      case setTag: result = new Set();
      default: result = Object.create(value.propotype);
    }
  }
  if(tag === mapTag) {
    value.forEach(item => {
      result.add(item);
    });
  } else if(tag === mapTag) {
    value.forEach((key, vlaue) => {
      result.set(key, value);
    })
  }
  let allKey = Object.keys(value);
  for(let key of allKey) {
    if(value.hasOwnProperty(key) && result) {

    }
  }
}
function isObject(value) {
  let type = typeof value;
  return (type === 'object' || type === 'function') && type !== null;
}
function getTag(value) {
  return Object.prototype.toString.call(value);
}
