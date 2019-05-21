import matchPath from './matchPath'

const Route = {
  name: 'Route',
  inject: ['router'],
  props: {
    path: {
      type: String,
      default: '',
    },
    exact: {
      type: Boolean,
      default: false,
    },
  },
  render (h) {
    const match = matchPath(this.path, { exact: !!this.exact }, this.router.location)

    const [props, path] = match || []

    const params = { ...props, url: path, path: this.path, router: this.router }

    if (this.$scopedSlots.children) {
      return this.$scopedSlots.children(params)
    }

    if (match) {
      if (this.$scopedSlots.default) {
        const vnodes = this.$scopedSlots.default(params)

        if (!vnodes) { // likely this is because the single component returned is async
          return h('div', 'loading...')
        }

        return vnodes[0]
      }

      const $vnode = this.$slots.default[0]

      return h($vnode.componentOptions.Ctor, {
        ...$vnode.data,
        props: {
          ...($vnode.componentOptions.propsData || {}),
          ...params,
        },
      })
    }
  },
}

export default Route
