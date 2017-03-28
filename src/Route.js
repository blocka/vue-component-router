import { injectProps } from './utils'
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

    const params = { ...props, url: path, path: this.path }

    if (this.$scopedSlots.children) {
      return this.$scopedSlots.children(params)
    }

    if (match) {
      if (this.$scopedSlots.default) {
        return this.$scopedSlots.default(params)[0]
      }

      injectProps(this.$slots.default[0], params)

      return this.$slots.default[0]
    }
  },
}

export default Route
