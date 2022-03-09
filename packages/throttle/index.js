
import Throttle from './src/index'

Throttle.install = (app) => {
  app.component(Throttle.name, Throttle)
}

export default Throttle