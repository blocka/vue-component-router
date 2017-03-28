import matchPath from './matchPath'

const RouterLink = {
  name: 'RouterLink',
  inject: ['router'],
  props: {
    to: {
      type: String,
      required: true,
    },
    activeClass: {
      type: String,
      default: 'active',
    },
  },
  methods: {
    handleClick (e) {
      e.preventDefault()

      this.router.history.push(this.to)
    },
  },
  render (h) {
    const href = this.to

    const match = matchPath(this.to, { exact: false }, this.router.location)

    return h('a', {
      class: {
        [this.activeClass]: !!match,
      },
      on: {
        click: this.handleClick,
      },
      attrs: {
        href,
      },
    }, this.$slots.default)
  },
}

export default RouterLink
