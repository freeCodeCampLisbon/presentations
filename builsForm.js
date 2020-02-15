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



class BaseForm{
  formularioBase(form) {
    const formBase = "<form id='formbase'>" + "<input id='firstname'/>" + "<input id='lastname' />";
    form = form+formBase;
    return form;
  }
  addLogin(form) {
    const mailPass = "<input id='email'/>" + "<input id='pass' />";
    form = form+mailPass;
    return form;
  }

  endFormulario(form) {
    const endform = "</form>";
    form = form+endform;
    return form;
  }

}


const formularioComplexo = new BaseForm().formularioBase().addPassword({ placeholder: 'asdasd' }).addEmail().endForm();


<form>
  <input type="password" />
  <input type="email" />
</form>

console.log('form', formularioComplexo);