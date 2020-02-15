
class BaseCar {

  constructor() {
    this.baseCar = {
      wheels: 4,
      doors: 5,
      engine: 'diesel'
    }
  }

  addRadio() {
    this.baseCar.radio = true
    return this;
  }
  addGps() {
    this.baseCar.gps = true
    return this;
  }
  withWheels(num_of_wheels) {
    this.baseCar.wheels = num_of_wheels;
    return this;
  }
  withColor(color) {
    this.baseCar.color = color
    return this;
  }

  build() {
    return this.baseCar
  }
}


const customCar = new BaseCar()
  .addRadio()
  .addGps()
  .withColor('dark blue')
  .build();

console.log('my car: ', customCar);