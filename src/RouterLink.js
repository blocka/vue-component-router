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
    tag: {
      type: String,
      default: 'a',
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

    const linkProps = {
      on: {
        click: this.handleClick,
      },
      attrs: {
        href,
      },
    }

    return h(this.tag, {
      class: {
        [this.activeClass]: !!match,
      },
      ...(
        this.tag === 'a'
          ? linkProps
          : {}
      ),
    }, this.tag === 'a'
      ? this.$slots.default
      : [h('a', linkProps, this.$slots.default)]
    )
  },
}

const withHandleClick = function (tagOrComponent, to, activeClass) {
  return {
    name: 'withHandleClick',
    inject: ['router'],
    methods: {
      handleClick (e) {
        e.preventDefault()

        this.router.history.push(to)
      },
    },
    render (createElement) {
      return createElement(tagOrComponent, {
        class: {
          [activeClass]: !!matchPath(to, { exact: false }, this.router.location),
        },
        on: {
          click: this.handleClick,
        },
      },
      this.$slots.default)
    },
  }
}

export default RouterLink
export { withHandleClick }
