const comparators = {
  conditions: [
      '<',
      '>',
      '==',
      '===',
      '<=',
      '>=',
      function ilike(initial, test) { return initial.toLowerCase().includes(test.toLowerCase()) },
      function like(initial, test) { return initial.includes(test) },
  ],
  buildConditional(initial, value, condition) {
    const func = this.conditions.filter(item => typeof item === 'function' && item.name === condition)[0] || null;
       if (func) return func(initial, value)
       if (this.conditions.includes(condition))
           return eval(`'${initial}' ${condition} '${value}'`)
    }
  
}

class BaseSearch {
  constructor(model) {
    this.model = model;
    this._model = model;
  }
  resetModel() {
    this.model = this._model;
  }
  matchAnyOf(value, filters) {
    for (const field of filters) {
        try {
           const results = this.model.filter(item => item[field].toLowerCase().includes(value.toLowerCase()))
       if (results.length > 0) {
         this.model = results
         break;
       }
        } catch (error) {
          console.log('error', error)
        }
     }
    return this;
  }

  matchAllWithValue(fields) {
    for(let [key,value] of Object.entries(fields)) {
      this.model = this.model.filter(item => item[key] === value);
    }
    return this;
  }
  where(field, value, condition = '==') {
    this.model = this.model.filter(val =>  comparators.buildConditional(val[field], value, condition))
    return this;
  }
}

const users = [
  {
    "balance": "$3,946.45",
    "picture": "http://placehold.it/32x32",
    "age": 23,
    "name": "Leo Ramsey",
    "gender": "male",
    "company": "NIMON",
    "email": "birdramsey@nimon.com"
  },
  {
    "balance": "$3,946.45",
    "picture": "http://placehold.it/32x32",
    "age": 30,
    "name": "Leo Ramsey",
    "gender": "adasdsad",
    "company": "NIMON",
    "email": "birdramsey@nimon.com"
  },
  {
    "balance": "$2,499.49",
    "picture": "http://placehold.it/32x32",
    "age": 31,
    "name": "Lillian Burgess",
    "gender": "female",
    "company": "LUXURIA",
    "email": "lillianburgess@luxuria.com"
  },
  {
    "balance": "$2,820.18",
    "picture": "http://placehold.it/32x32",
    "age": 34,
    "name": "Kristie Cole",
    "gender": "female",
    "company": "QUADEEBO",
    "email": "kristiecole@quadeebo.com"
  },
  {
    "balance": "$3,277.32",
    "picture": "http://placehold.it/32x32",
    "age": 30,
    "name": "Leonor Cross",
    "gender": "female",
    "company": "GRONK",
    "email": "leonorcross@gronk.com"
  },
  {
    "balance": "$1,972.47",
    "picture": "http://placehold.it/32x32",
    "age": 28,
    "name": "Leo Mccall",
    "gender": "male",
    "company": "ULTRIMAX",
    "email": "marshmccall@ultrimax.com"
  }
];
const search = new BaseSearch(users)
  .matchAnyOf('Leo', ['name'])
  .where('email', 'Birdramsey', 'ilike')
  .where('age', 30, '>=')
  .model;

console.log('search', search);