import matchPath from './matchPath'

const MatchFirst = {
  name: 'MatchFirst',
  inject: ['router'],
  render (h) {
    const vnode = this.$slots.default.find(vnode => {
      if (!vnode.componentOptions) return false

      const { path, exact } = vnode.componentOptions.propsData

      return matchPath(path, { exact }, this.router.location)
    })

    return vnode
  },
}

export default MatchFirst
