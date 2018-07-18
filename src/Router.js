import createHistory from 'history/createBrowserHistory'

const history = createHistory()

const Router = {
  name: 'Router',
  props: {
    history: {
      type: Object,
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
  },
  provide () {
    return {
      router: {
        location: this.location,
        history: this.history,
      },
    }
  },
  render (h) {
    return this.$slots.default[0]
  },
}

const HistoryRouter = {
  name: 'HistoryRouter',
  data () {
    return {
      history,
      location: history.location,
    }
  },
  created () {
    const onLocationChange = location => {
      this.$emit('locationChanged', location)
      Object.assign(this.location, location)
    }

    this.history.listen(onLocationChange)
  },
  render (h) {
    return h(Router, {
      props: {
        history: this.history,
        location: this.location,
      },
    }, this.$slots.default)
  },
}

const withRouter = function (Component) {
  const options = Component.options || Component
  const inject = options.inject || []

  inject.push('router')

  options.inject = inject

  return Component
}

export { HistoryRouter, Router, withRouter }
